var body;

var header;
var headerText;
var content;

var superHolder;
var topHolder;
var districtsHolder;

body = document.body;

header = document.createElement("div");
header.className = "header";
body.appendChild(header);

headerText = document.createElement("p");
headerText.innerText = "P Hunger Games"
header.appendChild(headerText);

content = document.createElement("div");
content.className = "content";
body.appendChild(content);

superHolder = document.createElement("div");
superHolder.className = "superHolder";
content.appendChild(superHolder);

topHolder = document.createElement("form");
topHolder.className = "subHolder";
superHolder.appendChild(topHolder);

districtsHolder = document.createElement("form");
districtsHolder.className = "subHolder";
superHolder.appendChild(districtsHolder);

for(var i = 0; i < 5; ++i) {
    var inp = document.createElement("input");
    inp.innerHTML = "clayton is gay";
    topHolder.appendChild(inp);
}

for(var i = 0; i < 13; ++i) {
    districtsHolder.appendChild(document.createElement("input"));
}