
export module Game {

    const DAY_STAGE_MORNING = 0;
    const DAY_STAGE_DAY = 1;
    const DAY_STAGE_DUSK = 2;
    const DAY_STAGE_NIGHT = 3;

    var roundCount
    var dayStage

    export function doRound() {

        ++roundCount;
    }

}