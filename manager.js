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
    let districts = numberDistrictsInput.value;
    let per = perDistrictsInput.value;

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

    for(let i = 0; i < districts; ++i) {

        let districtInputContainer = document.createElement("div");
        districtInputContainer.className = "districtHolder"
        districtsHolder.appendChild(districtInputContainer);
        let districtText = document.createElement("p");
        districtText.innerText = "District " + (i + 1);
        districtInputContainer.appendChild(districtText); 

        for(let j = 0; j < per; ++j) {

            let characterHolder = document.createElement("div");
            characterHolder.className = "characterHolder";
            districtInputContainer.appendChild(characterHolder);

            let uploadButton = document.createElement("input");
            uploadButton.type = "file";
            uploadButton.id = (i+""+j);
            uploadButton.className = "characterImage";
            uploadButton.addEventListener("change", doWithImage);
            districtsHolder.appendChild(uploadButton);

            let label = document.createElement("label");
            label.htmlFor = (i+""+j);
            label.id = (i+""+j+"L");
            characterHolder.appendChild(label);

            let actualImg = document.createElement("img");
            actualImg.className = "characterDisplay";
            actualImg.src = "images/plus.svg";
            label.appendChild(actualImg);

            let grid = document.createElement("div");
            grid.className = "characterInputGrid";
            characterHolder.appendChild(grid);

            createPlayerInput(grid, "Name");
            createPlayerDropdown(grid, "Age", "Child", "Teen", "Young Adult", "Adult", "Senior", "Ancient");
            createPlayerDropdown(grid, "EyeSight", "Good", "Fair", "Poor");
            createPlayerDropdown(grid, "Weight", "Light", "medium", "Heavy");
            createPlayerDropdown(grid, "Height", "Short", "Average", "Tall");
            createPlayerDropdown(grid, "Gender", "M", "F", "?");
        }
    }
}

function createPlayerInput(grid, label) {
    let inputHolder = document.createElement("div");
        inputHolder.className = "characterInput";
        grid.appendChild(inputHolder);

        let characterText = document.createElement("p");
        characterText.innerText = label
        inputHolder.appendChild(characterText);

        let characterInput = document.createElement("input");
        inputHolder.appendChild(characterInput);
}

function createPlayerDropdown(grid, label, ...options) {
    let inputHolder = document.createElement("div");
        inputHolder.className = "characterInput";
        grid.appendChild(inputHolder);

        let characterText = document.createElement("p");
        characterText.innerText = label
        inputHolder.appendChild(characterText);

        let characterDropdown = document.createElement("div");
        characterDropdown.className = "characterDropdown";
        inputHolder.appendChild(characterDropdown);

        let characterDropdownText = document.createElement("p");
        characterDropdown.appendChild(characterDropdownText);

        let dropDownHolder = document.createElement("div");
        dropDownHolder.className = "characterDropdownContainer";
        characterDropdown.appendChild(dropDownHolder);

        options.forEach(function(o) {
            op = document.createElement("div");
            op.innerText = o;
            op.onmousedown = () => {
                characterDropdownText.textContent = o
            };
            dropDownHolder.appendChild(op);
        });

}

function doWithImage(e) {
    let file = this.files[0];
    let findMe = this.id + "L";
    let reader = new FileReader();

    reader.onload = function (e) {
        console.log(findMe + " | " + document.getElementById(findMe));
        document.getElementById(findMe).lastChild.src = e.target.result;//.style.background = "blue";//e.target.result;
    };

    reader.readAsDataURL(file);
}

function keek() {
    alert("keek");
}