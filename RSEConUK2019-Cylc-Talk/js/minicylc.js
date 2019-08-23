/* ----------------------------------------------------------------------------
 * THIS FILE IS PART OF THE CYLC SUITE ENGINE.
 * Copyright (C) 2008-2019 NIWA & British Crown (Met Office) & Contributors.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * ------------------------------------------------------------------------- */

/*eslint no-console: off*/

// Default Cylc colour theme.
var minicylc_default_theme = {
    'waiting_fill': 'none',
    'waiting_stroke': '#88c6ff',
    'running_fill': '#00c410',
    'running_stroke': 'black',
    'succeed_fill': '#ada5a5',
    'succeed_stroke': 'black'
}

// Demo colour theme for demmonstrating workflow logic.
var minicylc_demo_theme = {
    'running_fill': '#aabbff',
    'running_stroke': 'black',
    'succeed_fill': '#ada5a5',
    'succeed_stroke': 'black',
}


class MiniCylc {
    /**
     * Class for animating SVG graphs.
     *
     * Attributes:
     *   - nodes: A dictionary of task names against a list of SVG nodes.
     *   - edges: A dictionary of task edges against a list SVG nodes.
     *   - dependencies: A dictionary of task names against a list of
     *     conditional expressions.
     */

    constructor(div) {
        /**
         * Initiate the object.
         * @param div The <div> element containing the SVG.
         * */

        this.held = false;

        // Obtain nodes and edges from svg.
        //var svg = ($(div).find('object:first')[0]).contentDocument;
        var svg = div.getSVGDocument();
        this.svg = $(svg).find('svg:first')[0];
        this._find_svg_elements(svg);

        // Parse dependencies.
        var deps = this._get_dependencies_from_graph(div);
        this._construct_dependency_map(deps);

        // Process colour theme.
        this.setup_colours($(div).data('theme'));

        // should we zoom/pan on the active graph?
        if ($(div).data('focus') === true) {
            this.focus = true;
        } else {
            this.focus = false;
        }

        // what likelyhood should a task have of succeeding per main loop iter
        var randomFactor = $(div).data('randomFactor');
        if (randomFactor) {
            this.randomFactor = randomFactor;
        } else {
            this.randomFactor = 1
        }

        var mainLoopStep = $(div).data('mainLoopStep');
        if (mainLoopStep) {
            this.mainLoopStep = mainLoopStep;
        } else {
            this.mainLoopStep = 3000;
        }

        var width = 1000;
        var height = 1000;
    }

    setup_colours(theme) {
        /**
         * Set the colour theme.
         * @param theme The name of a colour theme as a string.
         */
        if (!theme || theme == 'default') {
            this.theme = minicylc_default_theme;
        } else if (theme == 'demo') {
            this.theme = minicylc_demo_theme;
        } else {
            console.log('Warning: Invalid theme detected "' + theme +
                        '", defaulting to black.');
            this.theme = {};
        }
    }

    _find_svg_elements(svg) {
        /**
         * Associate task/dependency names with SVG nodes.
         *
         * Associations stored as dictionaries this.nodes and this.edges.
         * @param svg The <svg> element containing the workflow.
         */
        var nodes = {};
        var edges = {};
        $(svg).find('.graph g').each(function() {
            var node = $(this)[0];
            var node_class = $(node).attr('class');
            if (node_class == 'node') {
                nodes[node.textContent.split('\n')[0]] = node;
            } else if (node_class == 'edge') {
                edges[node.textContent.split('\n')[0]] = node;
            }
        });
        this.nodes = nodes;
        this.edges = edges;
    }

    _get_dependencies_from_graph(div) {
        /**
         * Extract, parse and return a list of dependencies.
         * @param div The minicylc <div> element.
         * @return A list of [left, right] lists e.g. ['a & b', 'c'].
         */
        var deps = [];
        var ind = 0;
        var parts;
        for (let dep of $(div).data('dependencies').split('//')) {
            parts = dep.split('=>');
            if (parts.length == 0) {
                continue;  // Graph line does not contain a dependency => skip.
            }
            for(ind = 0; ind < parts.length-1; ind++) {
                deps.push([parts[ind], parts[ind + 1]]);  // [left, right].
            }
        }

        return deps;
    }

    _construct_dependency_map(deps) {
        /**
         * Associate tasks with conditional expressions.
         *
         * Associations stored as a dictionary - this.dependencies.
         * @param deps A list of dependencies in the form [[left, right], ...].
         */
        var condition;
        var conditional_regex = /[()&]/;
        var conditional_regex2 = /([()&|])/;
        var conditional_chars = ['(', ')', '|', '&'];
        this.dependencies = {};
        for (let dep of deps) {
            // Build a javascript parsable conditional statement.
            condition = [];
            for (let left of dep[0].split(conditional_regex2)) {
                left = left.trim();
                if (left) {
                    if (!conditional_chars.includes(left)) {
                        // All dependencies are :succeed by default,
                        // dependencies are checked using
                        // this.succeed.has(task).
                        condition.push('this.succeed.has("' + left + '")');
                    } else {
                        // conditional character.
                        condition.push(left);
                    }
                }
            }
            condition = condition.join(' ');

            // Associate conditional statements with tasks.
            for (let right of dep[1].split(conditional_regex)) {
                right = right.trim();
                if (!this.dependencies[right]) {
                    this.dependencies[right] = [];
                }
                this.dependencies[right].push(condition);
            }
        }
    }

    evaluate_dependencies(task) {
        /**
         * Check if a task's dependencies are satisfied.
         * @param task The name of the task to evaluate.
         * @return true if satisfied else false.
         */
        var deps = this.dependencies[task];
        if (!deps) {
            return true;
        }
        for (let dep of deps) {
            if (eval(dep) == 0) {
                return false;
            }
        }
        return true;
    }

    _style_node(node, fill, stroke) {
        /**
         * Style a graphviz node.
         * @param fill The fill colour for SVG e.g. 'none', '#aabbcc', 'black'.
         * @param stroke The stroke colour for SVG.
         */
        if (!fill) {
            fill = 'none';  // Default to an unfilled node.
        }
        if (!stroke) {
            stroke = 'black';  // Default to a black border.
        }
        // Style nodes.
        $($(this.nodes[node]).find('ellipse:first')).attr({
            'fill': fill,
            'stroke': stroke
        });
    }

    _style() {
        /**
         * Refresh the style of graph nodes based on their state.
         */
        for (let task of this.waiting) {
            this._style_node(task,
                             this.theme['waiting_fill'],
                             this.theme['waiting_stroke']);
        }
        for (let task of this.running) {
            this._style_node(task,
                             this.theme['running_fill'],
                             this.theme['running_stroke']);
        }
        for (let task of this.succeed) {
            this._style_node(task,
                             this.theme['succeed_fill'],
                             this.theme['succeed_stroke']);
        }
    }

    _init() {
        /**
         * Initiate the simulation / animation.
         */
        this.waiting = new Set();
        this.running = new Set();
        this.succeed = new Set();
        for (let task in this.nodes) {
            this.waiting.add(task);
        }
        this._style();
    }

    _advance() {
        /*
         * To be called with each main loop.
         * @return true if the task pool has changed else false.
         */
        var changed = false;
        for (let task of this.running) {
            changed = true;
            if (Math.random() < this.randomFactor) {
                this.running.delete(task);
                this.succeed.add(task);
            }
        }
        for (let task of this.waiting) {
            if (this.evaluate_dependencies(task)) {
                this.waiting.delete(task);
                this.running.add(task);
                changed = true;
            }
        }
        return changed;
    }

    _main_loop(itt) {
        /*
         * The main loop - runs the simulation and handles restyling of nodes.
         * Note function calls itself recursively.
         */
        var exit = false;

        // Action.
        if (!this.held) {
            if (this._advance()) {  // Advance the task pool.
                // If anything has changed restyle.
                this._style();
                if (this.focus) {
                    this._focus();
                }
            } else {
                // If nothing has changed...
                if (this.waiting.size == 0 && this.running.size == 0) {
                    // The simulation has ended, reset and restart.
                    this._init();
                } else {
                    // The suite is stalled
                    // log a console message and stop.
                    exit = true;
                    console.log(
                        'Suite stalled :(',
                        this.waiting,
                        this.running,
                        this.succeed,
                    );
                }
            }
        }

        // Callback.
        if (!exit) {
            var self_ref = this;
            setTimeout(function(){
               self_ref._main_loop(itt + 1);
            }, this.mainLoopStep);
        }
    }

    _getActiveBBox(taskStates) {
        let left = null, right = null, ttop = null, bottom = null;
        let bbox;

        if (! taskStates) {
            taskStates = [this.succeed];
        }

        // get bbox of nodes
        for (let taskSet of taskStates) {
            for (let node of taskSet) {
                // getTransformToElement

                // use the ellipse dimensions
                let ellipse = $($(this.nodes[node]).find('ellipse:first')[0]);
                let cx = parseFloat(ellipse.attr('cx'))
                let cy = parseFloat(ellipse.attr('cy'))
                let rx = parseFloat(ellipse.attr('rx'))
                let ry = parseFloat(ellipse.attr('ry'))
                bbox = {
                    'left': cx - rx,
                    'right': cx + rx,
                    'top': cy - ry,
                    'bottom': cy + ry
                }

                if (left === null || bbox.left < left) {
                    left = bbox.left
                }
                if (ttop === null || bbox.top < top) {
                    ttop = bbox.top
                }
                if (right === null || bbox.right > right) {
                    right = bbox.right
                }
                if (bottom === null || bbox.bottom > bottom) {
                    bottom = bbox.bottom
                }
            }
        }

        return [left, right, ttop, bottom];
    }

    _setViewBox(x, y, w, h) {
            $(this.svg).attr(
                'viewBox',
                `${x} ${y}, ${w}, ${h}`
            )
    }

    _translate(tx, ty, tw, th) {
        var [
            vx, vy, vw, vh
        ] = $(this.svg).attr('viewBox').split(' ').map(parseFloat)

        // number of animation steps
        var steps = 100;
        // how far through the requsted transition should we go (2 => 1/2)
        var completionFactor = 2;

        var dx, dy, dw, dh, dt;
        dx = (tx - vx) / steps;
        dy = (ty - vy) / steps;
        dw = (tw - vw) / steps;
        dh = (th - vh) / steps;
        dt = this.mainLoopStep / steps

        var t = -dt;
        for (let i=0; i<steps/completionFactor; i++) {
            vx += dx
            vy += dy
            vw += dw
            vh += dh
            t += dt * completionFactor

            setTimeout(
                this._setViewBox.bind(this, vx, vy, vw, vh),
                t
            );
        }
    }

    _focus(scaleFactor) {
        if (! scaleFactor) {
            scaleFactor = 2.5
        }

        // get transform of containing graph
        var transform = $($(this.svg).find('#graph0')[0]).attr('transform')
        var [xtran, ytran] = transform
            .match(/translate\(([^\)]+)\)/)[1]
                .split(' ')
                    .map(parseFloat)
        var [xscale, yscale] = transform
            .match(/scale\(([^\)]+)\)/)[1]
                .split(' ')
                    .map(parseFloat)

        let [left, right, ttop, bottom] = this._getActiveBBox(
            [this.running]
        );

        // apply transformation to coordinates
        left = xtran + (left * xscale);
        right = xtran + (right * xscale);
        ttop = ytran + (ttop * yscale);
        bottom = ytran + (bottom * yscale);
        var width = right - left;
        var height = bottom - ttop;

        // scale out view
        left = left - (width / scaleFactor);
        ttop = ttop - (height / scaleFactor);
        width = scaleFactor * width;
        height = scaleFactor * height;

        // focus on this bbox
        this._translate(left, ttop, width, height);
    }

    run() {
        /*
         * Run this simulation.
         */
        this._init();
        this._main_loop(0);
    }

    hold() {
        this.held = true;
    }

    release() {
        this.held = false;
    }

}
