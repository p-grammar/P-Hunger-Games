const MAX_DISTRICTS = 20;
const MAX_PER_DISTRICT = 5;

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
topHolder.style.gridTemplateColumns = "minmax(min-content, max-content) min-content minmax(min-content, max-content) min-content max-content";
topHolder.style.gridTemplateRows = "min-content";
superHolder.appendChild(topHolder);

districtsHolder = document.createElement("form");
districtsHolder.className = "subHolder";
superHolder.appendChild(districtsHolder);

/*
 * put stuff in top holder
 */

var text = document.createElement("p");
text.innerText = "Number of Districts";
topHolder.appendChild(text);

var numberDistrictsInput = document.createElement("input");
numberDistrictsInput.type = "number";
numberDistrictsInput.min = 1;
numberDistrictsInput.max = MAX_DISTRICTS;
topHolder.appendChild(numberDistrictsInput);

var text2 = document.createElement("p");
text2.innerText = "Tributes per District";
topHolder.appendChild(text2);

var perDistrictsInput = document.createElement("input");
perDistrictsInput.type = "number";
perDistrictsInput.min = 1;
perDistrictsInput.max = MAX_PER_DISTRICT;
topHolder.appendChild(perDistrictsInput);

var makeFormButton = document.createElement("button");
makeFormButton.innerText = "Make Form";
makeFormButton.type = "button";
makeFormButton.onclick = makeForm;
topHolder.appendChild(makeFormButton);

/*

*/

function makeForm() {
    var districts = numberDistrictsInput.value;
    var per = perDistrictsInput.value;

    if(districts < 1) {
        districts = 1;
    } else if(districts > MAX_DISTRICTS) {
        districts = MAX_DISTRICTS;
    }

    if(per < 1) {
        per = 1;
    } else if(per > MAX_PER_DISTRICT) {
        per = MAX_PER_DISTRICT;
    }

    while (districtsHolder.hasChildNodes()) {
        districtsHolder.removeChild(districtsHolder.lastChild);
    }

    console.log(districts + " " + per);
    for(var i = 0; i < districts; ++i) {

        var districtInputContainer = document.createElement("form");
        districtInputContainer.className = "districtHolder"
        districtsHolder.appendChild(districtInputContainer);
        var districtText = document.createElement("p");
        districtText.innerText = "District " + (i + 1);
        districtInputContainer.appendChild(districtText); 

        for(var j = 0; j < per; ++j) {

            var nameInput = document.createElement("input");
            districtInputContainer.appendChild(nameInput);

        }
    }
}