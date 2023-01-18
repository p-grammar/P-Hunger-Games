
var gameContent;

var leftSide;
var divider;
var rightSide;
var rightSideScroller;

var leftPx;
var rightPx;
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
            reposition();
        }
    }
    gameContent.onmouseup = () => {
        dragging = false;
    }
    gameContent.appendChild(divider);

    rightSide = document.createElement("div");
    rightSide.className = "rightSide";
    gameContent.appendChild(rightSide);

    rightSideScroller = document.createElement("div");
    rightSideScroller.className = "rightSideScroller";
    rightSide.appendChild(rightSideScroller);

    app.view.className = "gameMap";
    leftSide.appendChild(app.view);

    window.onresize = () => {
        reposition();
    }

    content.style.overflowY = "hidden";
}

function reposition() {
    if(leftPx > leftSide.clientHeight) {
        leftPx = leftSide.clientHeight;
    }
    let remaining = content.clientWidth - divider.clientWidth - leftPx;
    if(remaining < 230) {
        remaining = 230;
        leftPx = content.clientWidth - divider.clientWidth - 230;
    }
    gameContent.style.gridTemplateColumns = (leftPx - 5) + "px " + divider.clientWidth + "px 1fr";
}

/* pass in the array of images used */
/* and then of course what the message says */
function createGameMessage(images, text) {
    let message = document.createElement("div");
    message.className = "gameMessage";
    rightSideScroller.appendChild(message);

    let imageHolder = document.createElement("div");
    imageHolder.className = "messageImageHolder";
    imageHolder.style.gridTemplateColumns = "repeat(" + images.length + ",1fr)"
    message.appendChild(imageHolder);

    images.forEach((image) => {
        let holder = document.createElement("div");
        holder.className = "messageImage";
        imageHolder.appendChild(holder);

        let actualImg = document.createElement("img");
        actualImg.src = image;
        holder.appendChild(actualImg);
    });

    let messageText = document.createElement("p");
    messageText.className = "messageText";
    messageText.textContent = text;
    message.appendChild(messageText);
}