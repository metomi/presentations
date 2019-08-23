.PHONY: all

dot_jinja2_files=$(patsubst %.dot-jinja2,%.dot,$(wildcard *.dot-jinja2))
dot_files=$(patsubst %.dot,%.svg,$(wildcard *.dot))

all: $(dot_files) $(dot_jinja2_files)

%.dot: %.dot-jinja2
	jinja2 $< > $@

%.svg: %.dot
	dot \
		-Tsvg $< \
		-o $@

clean:
	find -name '*.svg' -delete
