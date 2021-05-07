//Make the DIV element draggagle:
dragElement(document.getElementById("mydiv"));

var root = document.querySelector(":root");

let elements = {}

function changeContainerSize() {
    let width = document.getElementById("container-width")
    let height = document.getElementById("container-height")
    let container = document.getElementById("container")
    container.style.width = width.value
    container.style.height = height.value
}

function changedSettings() {
    let elementSelect = document.getElementById("elementSelect")
    let element = document.getElementById(elementSelect.value)
    let styleElement = elements[elementSelect.value]
    if (styleElement) {
        styleElement.setFromControls()
        setDivProperties(element, styleElement)
    } else {
        console.log("No Element!")
    }
}

function outputSettings() {
    console.log("==================================================================")
    console.log(JSON.stringify(elements))
    console.log("==================================================================")
}

function newElement() {
    let name = "element-" + Object.keys(elements).length;
    let widthName = "--" + name + "width"
    root.style.setProperty(widthName, '25%');
    // customVars.push({name, widthName})
    var div = document.createElement("div");
    div.id = name;
    div.style.position = 'absolute';
    
    document.getElementById("container").appendChild(div);
    let elementSelect = document.getElementById("elementSelect")
    var option = document.createElement("option");
    option.text = name;
    elementSelect.add(option);
    elementSelect.value = option.text;
    let newElement = new StyleElement(name)
    newElement.setFromControls();
    elements[name] = newElement
    changedSettings()
}

function setDivProperties(currentDiv, styleElement) {
    currentDiv.style.background = styleElement.bgColor
    currentDiv.style.top = styleElement.topSlide
    currentDiv.style.left = styleElement.leftSlide
    currentDiv.style.width = styleElement.widthSlide
    currentDiv.style.height = styleElement.heightSlide
    currentDiv.style.mixBlendMode = styleElement.mixBlendMode;
    currentDiv.style.borderRadius = styleElement.radiusSlide;
    currentDiv.style.borderWidth = styleElement.bWidthSlide;
    currentDiv.style.borderStyle = styleElement.bStyle;
    currentDiv.style.borderColor = styleElement.bColorColor;
}

function handleClick(cb) {
    root.style.setProperty('--showOverlay', cb.checked ? '25%' : '0%');    
}

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        //console.log("Styles: " + JSON.stringify(getComputedStyle(root)))
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

function setColor() {
    let colorEntry = document.getElementById("bgcolor")
    let colorSelector = document.getElementById("color")
    colorSelector.value = colorEntry.value
}

class StyleElement {
    constructor(id) {
        this.id = id
    }

    setXFromControls(topSlide, leftSlide, widthSlide, heightSlide, mixBlendMode,
        radius, bwidth, radiusSlide, bWidthSlide, bStyle, bColor, bColorColor, bgColor) {
            this.topSlide = topSlide
            this.leftSlide = leftSlide
            this.widthSlide = widthSlide
            this.heightSlide = heightSlide
            this.mixBlendMode = mixBlendMode
            this.radius = radius
            this.bwidth = bwidth
            this.radiusSlide = radiusSlide
            this.bWidthSlide = bWidthSlide
            this.bStyle = bStyle
            this.bColor = bColor
            this.bColorColor = bColorColor
            this.bgColor = bgColor
    }
    setFromControls() {
        this.topSlide = document.getElementById("top-slide").value + "px"
        this.leftSlide = document.getElementById("left-slide").value + "px"
        this.widthSlide = document.getElementById("width-slide").value + "px"
        this.heightSlide = document.getElementById("height-slide").value + "px"
        this.mixBlendMode = document.getElementById("mbm").value
        this.radius = document.getElementById("b-radius").value + "%"
        this.bwidth = document.getElementById("b-width").value + "px"
        this.radiusSlide = document.getElementById("radius-slide").value + "%"
        this.bWidthSlide = document.getElementById("border-width-slide").value + "px"
        this.bStyle = document.getElementById("border-style").value
        this.bColor = document.getElementById("border-color").value
        this.bColorColor = document.getElementById("border-color-color").value
        this.bgColor = document.getElementById("color").value
    }
}

