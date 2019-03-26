const MAX_DISTRICTS = 20;
const MAX_PER_DISTRICT = 5;

var body;

var header;
var headerText;
var content;

var superHolder;
var topHolder;
var districtsHolder;

/*IMPORTANT */
var __charactersDatasheet;
//

class characterPassInfo {
    constructor() {
        this.aliveImage;
        this.deadImage;
        this.params;
    }
}

const passInfoIndices = {
    NAME: 0,
    AGE: 1,
    EYESIGHT: 2,
    WEIGHT: 3,
    HEIGHT: 4,
    GENDER: 5,
}


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

    __charactersDatasheet = [];

    //
    //delete the form before creating a new one
    //
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

            var uploadID = "U"+i+j;
            var labelID = "L"+i+j;
            var deadUploadID = "DU"+i+j;
            var deadLabelID = "DL"+i+j;

            var selfIndex = i * per + j;

            __charactersDatasheet.push(new characterPassInfo());
            __charactersDatasheet[selfIndex].params = [];

            var characterHolder = document.createElement("div");
            characterHolder.className = "characterHolder";
            districtInputContainer.appendChild(characterHolder);

            // make character upload picture button
            var uploadButton = document.createElement("input");
            uploadButton.type = "file";
            uploadButton.selfIndex = selfIndex;
            uploadButton.labelID = labelID;
            uploadButton.id = uploadID;
            uploadButton.className = "characterImage";
            uploadButton.addEventListener("change", function() {
                doWithImage(this, (ret) => {
                    __charactersDatasheet[this.selfIndex].aliveImage = ret;
                    document.getElementById(this.labelID).lastChild.src = ret;

                    __charactersDatasheet[this.selfIndex].params.forEach((p) => {
                            console.log(p);
                    });

                });
            });
            districtsHolder.appendChild(uploadButton);
            //label
            var label = document.createElement("label");
            label.htmlFor = (uploadID);
            label.id = (labelID);
            characterHolder.appendChild(label);
            //then img
            var actualImg = document.createElement("img");
            actualImg.className = "characterDisplay";
            actualImg.src = "images/plus.svg";
            label.appendChild(actualImg);

            // then for dead character
            var deadUploadButton = document.createElement("input");
            deadUploadButton.type = "file";
            deadUploadButton.selfIndex = selfIndex;
            deadUploadButton.labelID = deadLabelID;
            deadUploadButton.id = deadUploadID;
            deadUploadButton.className = "characterImage";
            deadUploadButton.addEventListener("change", function() {
                doWithImage(this, (ret) => {
                    __charactersDatasheet[this.selfIndex].deadImage = ret;
                    document.getElementById(this.labelID).lastChild.src = ret;
                });
            });
            districtsHolder.appendChild(deadUploadButton);
            //label
            var deadLabel = document.createElement("label");
            deadLabel.htmlFor = (deadUploadID);
            deadLabel.id = (deadLabelID);
            characterHolder.appendChild(deadLabel);
            //then img
            var actualDeadImg = document.createElement("img");
            actualDeadImg.className = "characterDisplay";
            actualDeadImg.src = "images/plus.svg";
            deadLabel.appendChild(actualDeadImg);

            var grid = document.createElement("div");
            grid.className = "characterInputGrid";
            characterHolder.appendChild(grid);

            createPlayerInput(grid, "Name", 0, selfIndex);
            createPlayerDropdown(grid, "Age", 1, selfIndex, "Child", "Teen", "Young Adult", "Adult", "Senior", "Ancient");
            createPlayerDropdown(grid, "EyeSight", 2, selfIndex, "Good", "Fair", "Poor");
            createPlayerDropdown(grid, "Weight", 3, selfIndex, "Light", "Medium", "Heavy");
            createPlayerDropdown(grid, "Height", 4, selfIndex, "Short", "Average", "Tall");
            createPlayerDropdown(grid, "Gender", 5, selfIndex, "M", "F", "?");
        }
    }
}

function createPlayerInput(grid, label, inputIndex, selfIndex) {
    __charactersDatasheet[selfIndex].params.push(0);
    var inputHolder = document.createElement("div");
    inputHolder.className = "characterInput";
    grid.appendChild(inputHolder);

    var characterText = document.createElement("p");
    characterText.innerText = label
    inputHolder.appendChild(characterText);

    var characterInput = document.createElement("input");
    characterInput.selfIndex = selfIndex;
    characterInput.inputIndex = inputIndex;
    characterInput.oninput = () => {
        __charactersDatasheet[selfIndex].params[inputIndex] = characterInput.value;
    }
    inputHolder.appendChild(characterInput);
}

function createPlayerDropdown(grid, label, inputIndex, selfIndex, ...options) {
    __charactersDatasheet[selfIndex].params.push(0);
    var inputHolder = document.createElement("div");
    inputHolder.className = "characterInput";
    grid.appendChild(inputHolder);

    var characterText = document.createElement("p");
    characterText.innerText = label
    inputHolder.appendChild(characterText);

    var characterDropdown = document.createElement("div");
    characterDropdown.className = "characterDropdown";
    inputHolder.appendChild(characterDropdown);

    var characterDropdownText = document.createElement("p");
    characterDropdown.appendChild(characterDropdownText);

    var dropDownHolder = document.createElement("div");
    dropDownHolder.className = "characterDropdownContainer";
    characterDropdown.appendChild(dropDownHolder);

    options.forEach(function(o, i) {
        let op = document.createElement("div");
        op.innerText = o;
        op.optionIndex = i;
        op.onmousedown = () => {
            console.log(op.optionIndex);
            characterDropdownText.textContent = op.innerText;
            __charactersDatasheet[selfIndex].params[inputIndex] = op.optionIndex;
        };
        dropDownHolder.appendChild(op);
    });

}

function doWithImage(event, load) {
    var file = event.files[0];
    var reader = new FileReader();

    reader.onload = async function(e) {
        load(e.target.result);
    }
    
    reader.readAsDataURL(file);
}

function readData(file) {
    var ret;
    reader.onload = function(e) {
        ret = e.target.result;
        return ret;
    };
    reader.readAsDataURL(file);
}

function keek() {
    alert("keek");
}