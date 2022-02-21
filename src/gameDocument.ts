import { Document } from "./document";

export module GameDocument {

    class Base {
        static gameContent: HTMLDivElement;

        static leftSide: HTMLDivElement;
        static divider: HTMLDivElement;
        static rightSide: HTMLDivElement;
        static rightSideScroller: HTMLDivElement;
    }

    var leftPx: number;
    var dragging: boolean;

    export function createGameDocument() {

        dragging = false;

        Base.gameContent = Document.createDiv(content, "gameContent");
        Base.gameContent.style.gridTemplateColumns = "500px 10px 1fr"

        Base.leftSide = Document.createDiv(Base.gameContent, "leftSide");

        Base.divider = Document.createDiv(Base.gameContent, "divider");

        Base.divider.onmousedown = () => dragging = true;
        Base.gameContent.onmouseup = () => dragging = false;
        Base.gameContent.onmousemove = (event) => {
            if(dragging) {
                leftPx = event.clientX;
                reposition();
            }
        }

        Base.rightSide = Document.createDiv(Base.gameContent, "rightSide");

        Base.rightSide = Document.createDiv(Base.rightSide, "rightSideScroller");

        app.view.className = "gameMap";
        leftSide.appendChild(app.view);

        window.onresize = () => {
            reposition();
        }
    }

    function reposition() {
        if(leftPx > Base.leftSide.clientHeight) {
            leftPx = Base.leftSide.clientHeight;
        }

        let remaining = content.clientWidth - Base.divider.clientWidth - leftPx;
        if(remaining < 230) {
            remaining = 230;
            leftPx = content.clientWidth - Base.divider.clientWidth - 230;
        }

        Base.gameContent.style.gridTemplateColumns = (leftPx - 5) + "px " + Base.divider.clientWidth + "px 1fr";
    }

    /* pass in the array of images used */
    /* and then of course what the message says */
    export function createGameMessage(images, text) {
        let message = document.createElement("div");
        message.className = "gameMessage";
        Base.rightSideScroller.appendChild(message);

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

}
