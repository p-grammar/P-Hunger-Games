
var gameContent;

var leftSide;
var divider;
var rightSide;

var leftPx;
var dragging;

function gameSceneSetup() {

    gameContent = document.createElement("div");
    gameContent.className = "gameContent";
    gameContent.style.gridTemplateColumns = "500px 10px 1fr"
    content.appendChild(gameContent);

    leftSide = document.createElement("div");
    leftSide.className = "leftSide";
    gameContent.appendChild(leftSide);

    dragging = false;

    divider = document.createElement("div");
    divider.className = "divider";
    divider.onmousedown = () => {
        dragging = true;
    }
    gameContent.onmousemove = (event) => {
        if(dragging) {
            leftPx = event.clientX;
            gameContent.style.gridTemplateColumns = (leftPx - 5) + "px 10px 1fr";
        }
    }
    gameContent.onmouseup = () => {
        dragging = false;
    }
    gameContent.appendChild(divider);

    rightSide = document.createElement("div");
    rightSide.className = "rightSide";
    gameContent.appendChild(rightSide);

    app.view.className = "gameMap";
    leftSide.appendChild(app.view);
}