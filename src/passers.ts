import { World } from "./world";
import { Event } from "./event";
import { Player } from "./player";

export module Passers {

    const PASS_AGE_NAMES = [
        "child",
        "teen",
        "young adult",
        "adult",
        "senior",
        "ancient"
    ]
    const PASS_AGE_VALUES = [
        [8, 13],
        [14, 19],
        [20, 29],
        [30, 49],
        [50, 90],
        [91, 130]
    ];

    const PASS_HEIGHT_NAMES = [
        "dwarf",
        "short",
        "medium",
        "tall",
        "giant"
    ]
    const PASS_HEIGHT_VALUES = [
        [145, 155],
        [155, 165],
        [165, 175],
        [175, 185],
        [185, 195]
    ]

    const PASS_WEIGHT_NAMES = [
        "feather",
        "light",
        "medium",
        "heavy",
        "massive"
    ]
    const PASS_WEIGHT_VALUES = [
        [20, 40],
        [40, 60],
        [60, 80],
        [80, 100],
        [100, 120]
    ]

    const PASS_EYESIGHT_NAMES = [
        "poor",
        "average",
        "good",
        "excellent"
    ]
    const PASS_EYESIGHT_VALUES = [
        [0, 5],
        [5, 10],
        [10, 15],
        [15, 20]
    ]

    export class PlayerPass {
        name: string;
        age: number;
        height: number;
        weight: number;
        gender: number;
        eyesight: number;

        constructor() {
            this.name;
            this.age;
            this.height;
            this.weight;
            this.gender;
            this.eyesight;
        }
    }

    function createPlayer(pp: PlayerPass): Player.Player {
        return new Player.Player();
    }

    export class WorldPassInfo {
        worldSize: number;
        biomeList: Array<Array<World.Biome>>;
        worldBorderSpeed: number;
        cornucopiaQuality: number;
        seaLevel: number;
        sponsors: boolean;
        events: Array<Event.Event>;

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

}