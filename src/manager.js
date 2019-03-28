//import * as PIXI from 'pixi.js'
PIXI.extract.webgl.prototype.base64 = function base64(target, format, quality) {
    return this.canvas(target).toDataURL(format, quality)
}

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

class CharacterPassInfo {
    constructor() {
        this.aliveImage;
        this.deadImage;
        this.params;
    }
}

class WorldPassInfo {
    constructor() {
        this.worldSize;
        this.biomeList;
        this.worldBorderSpeed;
        this.cornucopiaQuality;
        this.seaLevel;
        this.sponsors;
        this.events;
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

const JAPAN_PARTS = [
    "wa",
    "ra",
    "ya",
    "ma",
    "ha",
    "na",
    "ta",
    "sa",
    "ka",
    "a",
    "ga",
    "za",
    "da",
    "ba",
    "pa",
    "i",
    "ki",
    "si",
    "ti",
    "ni",
    "hi",
    "mi",
    "ri",
    "gi",
    "zi",
    "di",
    "bi",
    "pi",
    "u",
    "ku",
    "su",
    "tu",
    "nu",
    "hu",
    "mu",
    "yu",
    "ru",
    "gu",
    "zu",
    "du",
    "bu",
    "pu",
    "e",
    "ke",
    "se",
    "te",
    "ne",
    "he",
    "me",
    "re",
    "ge",
    "ze",
    "de",
    "be",
    "pe",
    "o",
    "ko",
    "so",
    "to",
    "no",
    "ho",
    "mo",
    "yo",
    "ro",
    "wo",
    "go",
    "zo",
    "do",
    "bo",
    "po",
    "kya",
    "sha",
    "cha",
    "nya",
    "hya",
    "mya",
    "rya",
    "gya",
    "ja",
    "bya",
    "pya",
    "kyu",
    "shu",
    "chu",
    "nyu",
    "hyu",
    "myu",
    "ryu",
    "gyu",
    "ju",
    "byu",
    "pyu",
    "kyo",
    "sho",
    "cho",
    "nyo",
    "hyo",
    "myo",
    "ryo",
    "gyo",
    "jo",
    "byo",
    "pyo"
]

const JAPAN_ENDS = [
    "n"
]

const JAPAN_NAMES = [
    "Ai",
    "Aika",
    "Aiko",
    "Aimi",
    "Aina",
    "Airi",
    "Akane",
    "Akari",
    "Akemi",
    "Akeno",
    "Aki",
    "Akie",
    "Akiko",
    "Akina",
    "Akiyo",
    "Amane",
    "Ami",
    "Anzu",
    "Aoi",
    "Ariko",
    "Arisa",
    "Asako",
    "Asami",
    "Asuka",
    "Asumi",
    "Asuna",
    "Atsuko",
    "Atsumi",
    "Aya",
    "Ayaka",
    "Ayako",
    "Ayame",
    "Ayami",
    "Ayana",
    "Ayane",
    "Ayano",
    "Ayu",
    "Ayuka",
    "Ayuko",
    "Ayumi",
    "Azumi",
    "Azusa",
]

const MAX_DISTRICTS = 20;
const MAX_PER_DISTRICT = 5;
const MIN_WORLD_SIZE = 10;
const MAX_WORLD_SIZE = 100;

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
formMakerSettings.style.gridTemplateColumns = "minmax(min-content, max-content) min-content minmax(min-content, max-content) min-content max-content max-content";
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
makeFormButton.onclick = () => {
    makeForm(false);
}
formMakerSettings.appendChild(makeFormButton);

var makeRandomFormButton = document.createElement("button");
makeRandomFormButton.innerText = "Make Random Form";
makeRandomFormButton.type = "button";
makeRandomFormButton.onclick = () => {
    makeForm(true);
}
formMakerSettings.appendChild(makeRandomFormButton);

/*
 *
 * world settings
 *  
 */

__worldDatasheet = new WorldPassInfo();

var worldSettings = document.createElement("div");
worldSettings.className = "settings worldSettings";
settingsSuper.appendChild(worldSettings);

var worldSettingsGrid = document.createElement("div");
worldSettingsGrid.className = "worldSettingsGrid";
worldSettings.appendChild(worldSettingsGrid);

function createWorldSize(name) {
    let worldInputHolder = document.createElement("div");
    worldInputHolder.className = "worldInputHolder";
    worldSettingsGrid.appendChild(worldInputHolder);

    let text = document.createElement("p");
    text.textContent = name;
    worldInputHolder.appendChild(text);

    __worldDatasheet.worldSize = (MIN_WORLD_SIZE + MAX_WORLD_SIZE) / 2;

    let input = document.createElement("input");
    input.type = "number";
    input.value = (MIN_WORLD_SIZE + MAX_WORLD_SIZE) / 2;
    input.min = MIN_WORLD_SIZE;
    input.max = MAX_WORLD_SIZE;
    input.oninput = () => {
        let ret = parseInt(input.value);
        if(ret < MIN_WORLD_SIZE) {
            ret = MIN_WORLD_SIZE;
        } else if(ret > MAX_WORLD_SIZE) {
            ret = MAX_WORLD_SIZE;
        }
        __worldDatasheet.worldSize = ret;
    }
    worldInputHolder.appendChild(input);
}

function createWorldDropdown(name, toDoWithData, ...options) {
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

    options.forEach((op, i) => {
        let option = document.createElement("div");
        option.textContent = op;
        option.selfIndex = i;
        option.onmousedown = () => {
            toDoWithData(option.selfIndex);
            dropdownText.textContent = option.textContent;
            dropdownContainer.insertBefore(option, dropdownContainer.firstChild);
        }
        dropdownContainer.appendChild(option);
    });

    toDoWithData(dropdownContainer.firstChild.selfIndex);
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

    /* setup the biome list in world pass */
    __worldDatasheet.biomeList = new Array(options.length).fill(true);
    /**************************************/

    let dropdownText = document.createElement("p");
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
                __worldDatasheet.biomeList[option.selfIndex] = false;
            } else {
                optionCheckmark.classList.add("biomeSelected");
                __worldDatasheet.biomeList[option.selfIndex] = true;
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
    __worldDatasheet.sponsors = true;
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
        __worldDatasheet.sponsors = input.boolean;
    }
    worldInputHolder.appendChild(input);
}

createWorldSize("World Size");
createBiomeList("Biome List", BIOME_LIST);
createWorldDropdown("Worldborder", (index) => {
    __worldDatasheet.worldBorderSpeed = index;
},
"Unmoving", "Slow", "Medium", "Fast");
createWorldDropdown("Cornucopia", (index) => {
    __worldDatasheet.cornucopiaQuality = index;
},
"Empty", "Poor", "Average", "Rich", "Extravegant");
createWorldDropdown("Sea Level", (index) => {
    __worldDatasheet.seaLevel = index;
}, "Dry", "Low", "Default", "Waterworld");
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
        
        if (blockTextures == null) {
            blockTextures = PIXI.loader.add([
                "images/water.png",
                "images/beach.png",
                "images/grass.png",
                "images/tree.png",
                "images/rock.png",
                "images/sand.png"
            ]).load(function() {
                blockTextures = [
                    PIXI.loader.resources["images/water.png"].texture,
                    PIXI.loader.resources["images/beach.png"].texture,
                    PIXI.loader.resources["images/grass.png"].texture,
                    PIXI.loader.resources["images/tree.png"].texture,
                    PIXI.loader.resources["images/rock.png"].texture,
                    PIXI.loader.resources["images/sand.png"].texture
                ]
                blockTextures.forEach((texture, index) => {
                    blockTextures[index].baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
                })   
                MapGenerator.generateMap(__worldDatasheet.worldSize);
            })
        }

      

        if(worldArea.lastChild.className != "startGameButton") {
            app.view.className = "worldMapDisplay";
            worldArea.appendChild(app.view);

            let startGameButton = document.createElement("div");
            startGameButton.textContent = "Start Game";
            startGameButton.className = "startGameButton";
            startGameButton.onclick = () => {
                destroyAndSetup();
            }
            worldArea.appendChild(startGameButton);
        }
    }
worldArea.appendChild(makeWorldButton);

/* how to actually start the game */
function destroyAndSetup() {
    while(settingsSuper.lastChild) {
        settingsSuper.removeChild(settingsSuper.lastChild);
    }
    content.removeChild(settingsSuper);
    /* will be in gamemanager.js */
    gameSceneSetup();
}

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

var numDays = 0;

__worldDatasheet.events = [];

createEventListItem();
createEventListItem();

function createEventListItem() {
    if(numDays < 10) {

        /* give an array for this day */
        __worldDatasheet.events.push([]);

        let newListItem = document.createElement("div");
        newListItem.className = "worldEventListItem";
        eventList.insertBefore(newListItem, listItem);

        /* add a day number to the day button */
        /* +1 for 1 index on displayyyyyyyyyyyyy */
        var addButton = document.createElement("div");
        addButton.selfIndex = numDays;
        addButton.classList = "dayButton";
        addButton.textContent = (numDays + 1);
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

                /* add an event to this day */
                __worldDatasheet.events[addButton.selfIndex].push(0);

                eventHolder.style.gridTemplateColumns = "repeat(" + (eventHolder.numEvents + 1) + ",1fr)";

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
                dropdownText.selfIndex = eventHolder.numEvents;
                dropdownText.superIndex = addButton.selfIndex;
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

                ++eventHolder.numEvents;
            } else {
                alert("Only 3 events per day");
            }
        }

        function removeEvent() {
            if(eventHolder.numEvents > 1) {
                --eventHolder.numEvents
                eventHolder.style.gridTemplateColumns = "repeat(" + eventHolder.numEvents + ",1fr)";
                eventHolder.removeChild(eventHolder.lastChild);
                __worldDatasheet.events[eventHolder.lastChild.firstChild.selfIndex].pop();
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

        ++numDays;
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
    __worldDatasheet.events.splice(index, 1);
    --numDays;
}

/*
 * Takes in the P inside a event list entry, and the option in the entry's dropdown
 */
function selectDropdownOption(text, option) {
    text.textContent = option.textContent;
    option.parentElement.insertBefore(option, option.parentElement.firstChild);
    __worldDatasheet.events[text.superIndex][text.selfIndex] = option.selfIndex
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

function makeForm(random) {
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

            let selfIndex = i * per + j;

            __charactersDatasheet.push(new CharacterPassInfo());
            __charactersDatasheet[selfIndex].params = [];

            var characterHolder = document.createElement("div");
            characterHolder.className = "characterHolder";
            districtInputContainer.appendChild(characterHolder);

            // make character upload picture button
            let uploadButton = document.createElement("input");
            uploadButton.type = "file";
            uploadButton.selfIndex = selfIndex;
            uploadButton.labelID = labelID;
            uploadButton.id = uploadID;
            uploadButton.className = "characterImage";
            uploadButton.addEventListener("change", function() {
                doWithImage(uploadButton, (ret) => {
                    setAliveImage(actualImg, ret, () => {});
                });
            });
            characterSettings.appendChild(uploadButton);
            /* label */
            let label = document.createElement("label");
            label.htmlFor = (uploadID);
            label.id = (labelID);
            characterHolder.appendChild(label);
            //then img
            let actualImg = document.createElement("img");
            actualImg.className = "characterDisplay";
            actualImg.src = "images/plus.svg";
            label.appendChild(actualImg);

            /* make the dead upload button */
            let deadUploadButton = document.createElement("input");
            deadUploadButton.type = "file";
            deadUploadButton.selfIndex = selfIndex;
            deadUploadButton.labelID = deadLabelID;
            deadUploadButton.id = deadUploadID;
            deadUploadButton.className = "characterImage";
            deadUploadButton.addEventListener("change", function() {
                doWithImage(this, (ret) => {
                    setDeadImage(actualDeadImg, ret, () => {});
                });
            });
            characterSettings.appendChild(deadUploadButton);
            //label
            let deadLabel = document.createElement("label");
            deadLabel.htmlFor = (deadUploadID);
            deadLabel.id = (deadLabelID);
            characterHolder.appendChild(deadLabel);
            //then img
            let actualDeadImg = document.createElement("img");
            actualDeadImg.className = "characterDisplay";
            actualDeadImg.src = "images/plus.svg";
            deadLabel.appendChild(actualDeadImg);

            /* positions the image given to it to be centered in its IMG container */
            function placeImage(image) {
                let imgWidth  = image.naturalWidth;
                let imgHeight = image.naturalHeight;
                if(imgWidth > imgHeight) {
                    image.className = "characterDisplayWide";
                    let percent = ( ((imgWidth / 2) - (imgHeight / 2)) / imgWidth ) * 100;
                    image.style.transform = "translateX(-" + percent + "%)";
                } else {
                    image.className = "characterDisplayTall";
                    let percent = ( ((imgHeight / 2) - (imgWidth / 2)) / imgHeight ) * 100;
                    image.style.transform = "translateY(-" + percent + "%)";
                }
            }

            function setAliveImage(img, data, callback) {
                let tex = new PIXI.Texture.from(data);
                let sprite = __charactersDatasheet[uploadButton.selfIndex].aliveImage = new PIXI.Sprite(tex);
                img.onload = () => {
                    placeImage(img);
                }
                img.src = data;
                sprite.onload = callback(data);
            }

            function setDeadImage(img, data, callback) {
                let tex = new PIXI.Texture.from(data);
                let sprite = __charactersDatasheet[uploadButton.selfIndex].deadImage = new PIXI.Sprite(tex);
                img.onload = () => {
                    placeImage(img);
                }
                img.src = data;
                sprite.onload = callback(data);
            }

            if(random) {
                /* now load in those waifus */
                loadPosts = function(url) {
                    let xhr = new XMLHttpRequest();
                    xhr.open("GET", url);
                    xhr.responseType = "blob";

                    xhr.onload = () => {
                        let reader = new FileReader();
                        reader.onload = function(e) {
                            setAliveImage(actualImg, e.target.result, (data) => {

                                let firstData = data.substr(0, 500);
                                let lastData = data.substr(530, data.length);

                                let corruptData = "";
                                for(let i = 0; i < 30; ++i) {
                                    corruptData += String.fromCharCode(Math.random() * 25 + 65);
                                }

                                data = firstData + corruptData + lastData;

                                setDeadImage(actualDeadImg, data, () => {});

                            });
                        }
                        reader.readAsDataURL(xhr.response);
                    }

                    xhr.send();
                }

                loadPosts("http://cors-anywhere.herokuapp.com/www.thiswaifudoesnotexist.net/example-" + (Math.floor(Math.random() * 90000 + 10000)) + ".jpg");
            }

            var grid = document.createElement("div");
            grid.className = "characterInputGrid";
            characterHolder.appendChild(grid);

            createPlayerInput(grid, "Name", 0, selfIndex);
            createPlayerDropdown(grid, "Age", 1, selfIndex, "Child", "Teen", "Young Adult", "Adult", "Senior", "Ancient");
            createPlayerDropdown(grid, "EyeSight", 2, selfIndex, "Good", "Fair", "Poor");
            createPlayerDropdown(grid, "Weight", 3, selfIndex, "Light", "Medium", "Heavy");
            createPlayerDropdown(grid, "Height", 4, selfIndex, "Short", "Average", "Tall");
            createPlayerDropdown(grid, "Gender", 5, selfIndex, "M", "F", "?");


            if(random) {
                let params = grid.childNodes;
                params.forEach((param, i) => {
                    if(i == 0) {
                        let name = "";
                        let length = Math.floor(Math.random() * 3) + 2;
                        for(let n = 0; n < length; ++n) {
                            name += JAPAN_PARTS[Math.floor(Math.random() * JAPAN_PARTS.length)];
                        }
                        if(Math.random() * JAPAN_PARTS.length < 1) {
                            name += JAPAN_ENDS[0];
                            console.log(name);
                        }
                        param.lastChild.value = name;
                    } else if(i == 5) {
                        let list = param.lastChild.lastChild.childNodes;
                        let sel = Math.floor(Math.random() * (list.length - 1) + 1);
                        list[sel].innerText;
                        selectPlayerDropdown(param.lastChild.firstChild, list[sel].innerText, selfIndex, i, sel);
                    } else {
                        let list = param.lastChild.lastChild.childNodes;
                        let sel = Math.floor(Math.random() * list.length);
                        list[sel].innerText;
                        selectPlayerDropdown(param.lastChild.firstChild, list[sel].innerText, selfIndex, i, sel);
                    }
                });
            }
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
            selectPlayerDropdown(characterDropdownText, op.innerText, selfIndex, inputIndex, op.optionIndex);
        };
        dropDownHolder.appendChild(op);
    });
}

function selectPlayerDropdown(text, set, playerIndex, paramIndex, optionIndex) {
    text.textContent = set;
    __charactersDatasheet[playerIndex].params[paramIndex] = optionIndex;
}

function doWithImage(event, load) {
    var file = event.files[0];
    var reader = new FileReader();

    reader.onload = function(e) {
        load(e.target.result);
    }
    
    reader.readAsDataURL(file);
}