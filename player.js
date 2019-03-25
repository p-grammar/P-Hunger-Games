
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

class Player
{
    constructor()
    {
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
        this.speed = 5;
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

        this.icon = document.createElement("img");
        this.icon.className = "player";
        this.icon.src = "images/sans.png";
    }
}