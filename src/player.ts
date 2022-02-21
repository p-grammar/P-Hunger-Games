
export module Player {

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

    export class Player {

        district: number;

        /* input settings */
        name: string;
        age: number;
        height: number;
        weight: number;
        gender: number;
        eyesight: number;

        strength: number;
        speed: number;
        intelligence: number;
        constitution: number;
        charisma: number;

        target: Array<number>;

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

        //pathFind(destX, destY) {
       //     return this.finder.findPath(destX, destY, this.location.x, this.location.y, window.worldGrid);
       // }
    }

}
