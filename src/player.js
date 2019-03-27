/* eslint-disable no-unused-vars */

const NUM_SKILLS = 10;

const CAMOUFLAGE = 0;
const RANGED_COMBAT = 1;
const CLOSE_COMBAT = 2;
const TRAP_MAKING = 3;
const CLIMBING = 4;
const FISHING = 5;
const HUNTING = 6;
const GATHERING = 7;
const FIRE_MAKING = 8;
const EXPLOSIVE_HANDLING = 9;

class Player {
    constructor() {
        this.district = 0;

        this.health = 10;
        this.location = {x: 0, y: 0};
        this.thirst = 0;
        this.hunger = 0;
        this.temperature = 75.0;
        this.happiness = 7;
        this.killCount = 0;
        this.fame = 0;
        this.visibility = 10;

        // Stats
        this.strength = 5;
        this.speed = 1;
        this.intelligence = 5;
        this.constitution = 5;
        this.charisma = 5;

        // Characteristics
        this.name = "";
        this.age = 20;
        this.height = 5.5;
        this.weightness = 130;
        this.gender = "?";
        this.eyesight = [20, 20];

        // Skills
        this.skills = new Array(NUM_SKILLS);
        this.image = new Image(64, 64);

        this.items = [];

        this.icon = document.createElement("img");
        this.icon.className = "player";
        this.icon.src = "images/sans.png";

        this.eventQueue = [];
        this.finder = new PF.AStarFinder();
        this.target = [];
    }

    step() {
       // this.location.x += Math.random() * this.speed;
       // this.location.y += Math.random() * this.speed;

        if (this.target.length === 0) {
            //this.target = this.pathFind(getRandomInt(0, MAP_SIZE * 2), getRandomInt(0, MAP_SIZE * 2));
        }
        else {
            //let nextNode = this.target.pop();
            //this.location = { x: nextNode[0], y: nextNode[1] };
        }   
    }

    pathFind(destX, destY) {
        //console.log(this.location)
        return this.finder.findPath(destX, destY, this.location.x, this.location.y, window.worldGrid);
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}