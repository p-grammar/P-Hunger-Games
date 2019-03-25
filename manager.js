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
topHolder.className = "topHolder";
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
numberDistrictsInput.value = "2";
numberDistrictsInput.min = 1;
numberDistrictsInput.max = MAX_DISTRICTS;
topHolder.appendChild(numberDistrictsInput);

var text2 = document.createElement("p");
text2.innerText = "Tributes per District";
topHolder.appendChild(text2);

var perDistrictsInput = document.createElement("input");
perDistrictsInput.type = "number";
perDistrictsInput.value = "2";
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

        var districtInputContainer = document.createElement("div");
        districtInputContainer.className = "districtHolder"
        districtsHolder.appendChild(districtInputContainer);
        var districtText = document.createElement("p");
        districtText.innerText = "District " + (i + 1);
        districtInputContainer.appendChild(districtText); 

        for(var j = 0; j < per; ++j) {

            var characterHolder = document.createElement("div");
            characterHolder.className = "characterHolder";
            districtInputContainer.appendChild(characterHolder);

            var image = document.createElement("input");
            image.type = "file";
            image.id = (i+""+j);
            image.className = "characterImage";
            image.addEventListener("change", doWithImage);
            districtsHolder.appendChild(image);

            var label = document.createElement("label");
            label.htmlFor = (i+""+j);
            label.id = (i+""+j+"L");
            characterHolder.appendChild(label);

            var actualImg = document.createElement("img");
            actualImg.className = "characterDisplay";
            label.appendChild(actualImg);

            var grid = document.createElement("div");
            grid.className = "characterInputGrid";
            characterHolder.appendChild(grid);

            for(var k = 0; k < 6; ++k) {
                var inputHolder = document.createElement("div");
                inputHolder.className = "characterInput";
                grid.appendChild(inputHolder);

                var characterText = document.createElement("p");
                characterText.innerText = "test P"
                inputHolder.appendChild(characterText);

                var characterInput = document.createElement("input");
                inputHolder.appendChild(characterInput);
            }

        }
    }
}

function doWithImage(e) {
    var file = this.files[0];
    var findMe = this.id + "L";
    var reader = new FileReader();

    reader.onload = function (e) {
        console.log(findMe + " | " + document.getElementById(findMe));
        document.getElementById(findMe).lastChild.src = e.target.result;//.style.background = "blue";//e.target.result;
    };

    reader.readAsDataURL(file);
}

function keek() {
    alert("keek");
}