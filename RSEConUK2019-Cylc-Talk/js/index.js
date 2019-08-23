function addClassNameListener(elem, classname, onAdd, onRemove) {
    var isActive;
    elem = $(elem);
    window.setInterval( function() {   
        if (elem.hasClass(classname)) {
            if (isActive === true) {
                // pass
            } else if (isActive === false) {
                onAdd();
                isActive = true;
            } else {
                onAdd();
                isActive = true;
            }
        } else {
            if (isActive === false) {
                // pass
            } else if (isActive === true) {
                onRemove();
                isActive = false;
            } else {
                onRemove();
                isActive = false;
            }
        }
    }, 50);
}
