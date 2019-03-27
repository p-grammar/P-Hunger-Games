var body;

var header;
var headerText;
var content;

var settingsSuper;
var formMakerSettings;
var characterSettings;

/*IMPORTANT*/
var __charactersDatasheet;

var __worldDatasheet;
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

const EVENT_OPTIONS = [
    "Nothing",
    "Rain",
    "Drought",
    "Snow",
    "Restock",
    "Squirrel Attack",
    "Land Mines",
    "Wildfires",
    "Fog",
    "Beast Attack",
    "Earthquake",
    "Nuclear Blast"
]

const BIOME_LIST = [
    "Ocean",
    "Beach",
    "Plains",
    "Forest",
    "Mountains",
    "Desert"
]

const MAX_DISTRICTS = 20;
const MAX_PER_DISTRICT = 5;
const MIN_WORLD_SIZE = 10;
const MAX_WORLD_SIZE = 30;

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

settingsSuper = document.createElement("div");
settingsSuper.className = "settingsSuper";
content.appendChild(settingsSuper);

formMakerSettings = document.createElement("div");
formMakerSettings.className = "settings formMakerSettings";
formMakerSettings.style.gridTemplateColumns = "minmax(min-content, max-content) min-content minmax(min-content, max-content) min-content max-content";
formMakerSettings.style.gridTemplateRows = "min-content";
settingsSuper.appendChild(formMakerSettings);

characterSettings = document.createElement("div");
characterSettings.className = "settings characterSettings";
settingsSuper.appendChild(characterSettings);

/*
 * put stuff in top holder
 */

var text = document.createElement("p");
text.innerText = "Number of Districts";
formMakerSettings.appendChild(text);

var numberDistrictsInput = document.createElement("input");
numberDistrictsInput.type = "number";
numberDistrictsInput.value = "2";
numberDistrictsInput.min = 1;
numberDistrictsInput.max = MAX_DISTRICTS;
formMakerSettings.appendChild(numberDistrictsInput);

var text2 = document.createElement("p");
text2.innerText = "Tributes per District";
formMakerSettings.appendChild(text2);

var perDistrictsInput = document.createElement("input");
perDistrictsInput.type = "number";
perDistrictsInput.value = "2";
perDistrictsInput.min = 1;
perDistrictsInput.max = MAX_PER_DISTRICT;
formMakerSettings.appendChild(perDistrictsInput);

var makeFormButton = document.createElement("button");
makeFormButton.innerText = "Make Form";
makeFormButton.type = "button";
makeFormButton.onclick = makeForm;
formMakerSettings.appendChild(makeFormButton);

/*
 * world holder
 */
var worldSettings = document.createElement("div");
worldSettings.className = "settings worldSettings";
settingsSuper.appendChild(worldSettings);

var worldSettingsGrid = document.createElement("div");
worldSettingsGrid.className = "worldSettingsGrid";
worldSettings.appendChild(worldSettingsGrid);

function createWorldSetting(name) {
    let worldInputHolder = document.createElement("div");
    worldInputHolder.className = "worldInputHolder";
    worldSettingsGrid.appendChild(worldInputHolder);

    let text = document.createElement("p");
    text.textContent = name;
    worldInputHolder.appendChild(text);

    let input = document.createElement("input");
    input.type = "number";
    input.value = MIN_WORLD_SIZE;
    input.min = MIN_WORLD_SIZE;
    input.max = MAX_WORLD_SIZE;
    worldInputHolder.appendChild(input);
}

function createWorldDropdown(name, ...options) {
    let worldInputHolder = document.createElement("div");
    worldInputHolder.className = "worldInputHolder";
    worldSettingsGrid.appendChild(worldInputHolder);

    let text = document.createElement("p");
    text.textContent = name;
    worldInputHolder.appendChild(text);

    let dropdown = document.createElement("div");
    dropdown.className = "eventDropdown";
        dropdown.onmousedown = () => {
            if(dropdown.classList.contains("dropdownCooldown")) {
                dropdown.classList.remove("dropdownCooldown");
            } else {
                dropdown.classList.add("dropdownCooldown");
            }
        }
        dropdown.onmouseleave = () => {
            dropdown.classList.remove("dropdownCooldown");
        }
    worldInputHolder.appendChild(dropdown);

    let dropdownText = document.createElement("p");
    dropdownText.textContent = options[0];
    dropdown.appendChild(dropdownText);

    let dropdownContainer = document.createElement("div");
    dropdownContainer.className = "eventDropdownContainer";
    dropdown.appendChild(dropdownContainer);

    options.forEach((op) => {
        let option = document.createElement("div");
        option.textContent = op;
        option.onmousedown = () => {
            dropdownText.textContent = option.textContent;
            dropdownContainer.insertBefore(option, dropdownContainer.firstChild);
        }
        dropdownContainer.appendChild(option);
    });
}

function createBiomeList(name, options) {
    let worldInputHolder = document.createElement("div");
    worldInputHolder.className = "worldInputHolder";
    worldSettingsGrid.appendChild(worldInputHolder);

    let text = document.createElement("p");
    text.textContent = name;
    worldInputHolder.appendChild(text);

    let dropdown = document.createElement("div");
    dropdown.className = "eventDropdown";
    worldInputHolder.appendChild(dropdown);

    /* the text has all the information about biomes in it */
    let dropdownText = document.createElement("p");
    dropdownText.biomeList = new Array(options.length).fill(true);
    dropdownText.textContent = "...";
    dropdown.appendChild(dropdownText);

    let dropdownContainer = document.createElement("div");
    dropdownContainer.classList = "eventDropdownContainer biomeList";
    dropdown.appendChild(dropdownContainer);

    options.forEach((op, i) => {
        let option = document.createElement("div");
        option.selfIndex = i;
        option.textContent = op;

        let optionCheckmark = document.createElement("div");
        optionCheckmark.className = "biomeCheckmark";
        optionCheckmark.classList.add("biomeSelected");
        option.appendChild(optionCheckmark);

        option.onmousedown = () => {
            if(optionCheckmark.classList.contains("biomeSelected")) {
                optionCheckmark.classList.remove("biomeSelected");
                dropdownText.biomeList[option.selfIndex] = false;
            } else {
                optionCheckmark.classList.add("biomeSelected");
                dropdownText.biomeList[option.selfIndex] = true;
            }
        }
        dropdownContainer.appendChild(option);

    });
}

function createSponsors(name, ...options) {
    let worldInputHolder = document.createElement("div");
    worldInputHolder.className = "worldInputHolder";
    worldSettingsGrid.appendChild(worldInputHolder);

    let text = document.createElement("p");
    text.textContent = name;
    worldInputHolder.appendChild(text);

    let input = document.createElement("div");
    input.options = options;
    input.boolean = true;
    input.textContent = options[0];
    input.className = "sponsors";
    input.onclick = () => {
        if(input.textContent === input.options[0]) {
            input.textContent = input.options[1];
            input.boolean = false;
        } else {
            input.textContent = input.options[0];
            input.boolean = true;
        }
    }
    worldInputHolder.appendChild(input);
}

createWorldSetting("World Size");
createBiomeList("Biome List", BIOME_LIST);
createWorldDropdown("Worldborder", "Unmoving", "Slow", "Medium", "Fast");
createWorldDropdown("Cornucopia", "Empty", "Poor", "Average", "Rich", "Extravegant");
createWorldDropdown("Sea Level", "Dry", "Low", "Default", "Waterworld");
createSponsors("Sponsors", "On", "Off");

var worldEventHolder = document.createElement("div");
worldEventHolder.className = "worldEventHolder";
worldSettingsGrid.appendChild(worldEventHolder);

let dayLabel = document.createElement("p");
dayLabel.textContent = "Day";
worldEventHolder.appendChild(dayLabel);

let eventLabel = document.createElement("p");
eventLabel.textContent = "Event";
worldEventHolder.appendChild(eventLabel);

var eventRandomButton = document.createElement("div");
eventRandomButton.className = "eventRandomButton";
worldEventHolder.appendChild(eventRandomButton);

let dieImage = document.createElement("img");
dieImage.src = "images/die.svg"
eventRandomButton.appendChild(dieImage);

var eventList = document.createElement("div");
eventList.className = "worldEventList";
worldEventHolder.appendChild(eventList);

var worldArea = document.createElement("div");
worldArea.className = "worldArea";
worldSettingsGrid.appendChild(worldArea);

var makeWorldButton = document.createElement("button");
makeWorldButton.className = "makeWorldButton";
makeWorldButton.innerText = "Make World";
    makeWorldButton.onclick = () => {
        MapGenerator.generateMap(30);

        if(worldArea.lastChild.className != "startGameButton") {
            app.view.className = "worldMapDisplay";
            worldArea.appendChild(app.view);

            let startGameButton = document.createElement("div");
            startGameButton.textContent = "Start Game";
            startGameButton.className = "startGameButton";
            worldArea.appendChild(startGameButton);
        }
    }
worldArea.appendChild(makeWorldButton);

/* this is the list item with the plus button to add */
var listItem = document.createElement("div");
listItem.className = "worldEventListItem";
eventList.appendChild(listItem);

var addButton = document.createElement("div");
addButton.classList = "dayButton dayAddButton";
addButton.onclick = () => {
    createEventListItem();
}
listItem.appendChild(addButton);

var addButtonImg = document.createElement("img");
addButtonImg.src = "images/plus.svg";
addButton.appendChild(addButtonImg);

var numEvents = 0;

createEventListItem();
createEventListItem();

function createEventListItem() {
    if(numEvents < 10) {
        let newListItem = document.createElement("div");
        newListItem.className = "worldEventListItem";
        eventList.insertBefore(newListItem, listItem);

        /* add a day number to the day button */
        /* +1 for 1 index on displayyyyyyyyyyyyy */
        var addButton = document.createElement("div");
        addButton.selfIndex = numEvents;
        addButton.classList = "dayButton";
        addButton.textContent = (numEvents + 1);
        addButton.onclick = () => {
            removeEventListItem(addButton.selfIndex);
        }
        newListItem.appendChild(addButton);

        let eventHolder = document.createElement("div");
        eventHolder.className = "eventHolder";
        eventHolder.numEvents = 0;
        newListItem.appendChild(eventHolder);

        function addEvent() {
            if(eventHolder.numEvents < 3) {
                ++eventHolder.numEvents;
                eventHolder.style.gridTemplateColumns = "repeat(" + eventHolder.numEvents + ",1fr)";

                let eventDropdown = document.createElement("div");
                eventDropdown.className = "eventDropdown";
                    eventDropdown.onmousedown = () => {
                        if( eventDropdown.classList.contains("dropdownCooldown")) {
                            eventDropdown.classList.remove("dropdownCooldown");
                        } else {
                            eventDropdown.classList.add("dropdownCooldown");
                        }
                    }
                    eventDropdown.onmouseleave = () => {
                        eventDropdown.classList.remove("dropdownCooldown");
                    }
                eventHolder.appendChild(eventDropdown);

                let dropdownText = document.createElement("p");
                dropdownText.textContent = EVENT_OPTIONS[0];
                dropdownText.eventValue = 0;
                eventDropdown.appendChild(dropdownText);

                let dropdownContainer = document.createElement("div");
                dropdownContainer.className = "eventDropdownContainer";
                eventDropdown.appendChild(dropdownContainer);

                EVENT_OPTIONS.forEach((op, i) => {
                    createDropdownOption(op, i);
                });

                function createDropdownOption(string, index) {
                    let dropdownOption = document.createElement("div");
                    dropdownOption.textContent = string;
                    dropdownOption.selfIndex = index;
                    dropdownOption.onmousedown = () => {
                        selectDropdownOption(dropdownText, dropdownOption);
                    }
                    dropdownContainer.appendChild(dropdownOption);
                }
            } else {
                alert("Only 3 events per day");
            }
        }

        function removeEvent() {
            if(eventHolder.numEvents > 1) {
                --eventHolder.numEvents
                eventHolder.style.gridTemplateColumns = "repeat(" + eventHolder.numEvents + ",1fr)";
                eventHolder.removeChild(eventHolder.lastChild);
            }
        }

        addEvent();

        let eventButtonHolder = document.createElement("div");
        eventButtonHolder.className = "eventButtonHolder";
        newListItem.appendChild(eventButtonHolder);

        let eventRemoveButton = document.createElement("div");
        eventRemoveButton.className = "eventRemoveButton";
        eventRemoveButton.onclick = () => {
            removeEvent();
        }
        eventButtonHolder.appendChild(eventRemoveButton);

        let eventAddButton = document.createElement("div");
        eventAddButton.className = "eventAddButton";
        eventAddButton.onclick = () => {
            addEvent();
        }
        eventButtonHolder.appendChild(eventAddButton);

        ++numEvents;
    } else {
        alert("you can only have 10 event days");
    }
}

function removeEventListItem(index) {
    eventList.removeChild(eventList.childNodes[index]);
    for(let i = index; i < eventList.childElementCount - 1; ++i) {
        --eventList.childNodes[i].firstChild.selfIndex;
        --eventList.childNodes[i].firstChild.innerText;
    }
    --numEvents;
}

/*
 * Takes in the P inside a event list entry, and the option in the entry's dropdown
 */
function selectDropdownOption(text, option) {
    text.textContent = option.textContent;
    text.eventValue = option.selfIndex;
    option.parentElement.insertBefore(option, option.parentElement.firstChild);
}

eventRandomButton.onclick = () => {
    eventList.childNodes.forEach((item, i) => {
        /* second child of the list item is the event holder */
        if(item.childNodes[1] !== undefined) {
            let eventList = item.childNodes[1].childNodes;
            eventList.forEach((event) => {
                optionList = event.lastChild.childNodes;
                let select = optionList[Math.floor(Math.random() * optionList.length)];
                selectDropdownOption(event.firstChild, select);
            });
        }
    });
}
//^^^^^

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
    while (characterSettings.hasChildNodes()) {
        characterSettings.removeChild(characterSettings.lastChild);
    }

    for(let i = 0; i < districts; ++i) {

        var districtInputContainer = document.createElement("div");
        districtInputContainer.className = "districtHolder"
        characterSettings.appendChild(districtInputContainer);
        var districtText = document.createElement("p");
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
                    let tempImg = document.getElementById(this.labelID).lastChild;
                    __charactersDatasheet[this.selfIndex].aliveImage = ret;
        
                    tempImg.onload = () => {
                        let imgWidth  = tempImg.naturalWidth;
                        let imgHeight = tempImg.naturalHeight;
                        console.log(imgWidth + " " + imgHeight)
                        if(imgWidth > imgHeight) {
                            tempImg.className = "characterDisplayWide";
                            let percent = ( ((imgWidth / 2) - (imgHeight / 2)) / imgWidth ) * 100;
                            tempImg.style.transform = "translateX(-" + percent + "%)";
                        } else {
                            tempImg.className = "characterDisplayTall";
                            let percent = ( ((imgHeight / 2) - (imgWidth / 2)) / imgHeight ) * 100;
                            tempImg.style.transform = "translateY(-" + percent + "%)";
                        }
                    }

                    tempImg.src = ret;
                });
            });
            characterSettings.appendChild(uploadButton);
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
                    let tempImg = document.getElementById(this.labelID).lastChild;
                    __charactersDatasheet[this.selfIndex].deadImage = ret;
        
                    tempImg.onload = () => {
                        let imgWidth  = tempImg.naturalWidth;
                        let imgHeight = tempImg.naturalHeight;
                        console.log(imgWidth + " " + imgHeight);
                        if(imgWidth > imgHeight) {
                            tempImg.className = "characterDisplayWide";
                            let percent = ( ((imgWidth / 2) - (imgHeight / 2)) / imgWidth ) * 100;
                            tempImg.style.transform = "translateX(-" + percent + "%)";
                        } else {
                            tempImg.className = "characterDisplayTall";
                            let percent = ( ((imgHeight / 2) - (imgWidth / 2)) / imgHeight ) * 100;
                            tempImg.style.transform = "translateY(-" + percent + "%)";
                        }
                    }

                    tempImg.src = ret;
                });
            });
            characterSettings.appendChild(deadUploadButton);
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