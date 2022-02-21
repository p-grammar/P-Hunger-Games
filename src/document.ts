
export module Document {

    export function createDiv(parent: Element, className: string): HTMLDivElement {
        let div = document.createElement("div");
        div.className = className;
        parent.appendChild(div);
        return div
    }

    export function createFileInput(parent: Element, className: string, id: string, callback: (this: HTMLInputElement, ev: Event) => any) {
        let input = document.createElement("input");
        input.type = "file";
        input.id = id;
        input.className = className;
        input.addEventListener("change", callback);
        parent.appendChild(input);
    }

    export function createTextInput(parent: Element, className: string, callback: (this: GlobalEventHandlers, ev: Event) => any) {
        let input = document.createElement("input");
        input.className = className;
        input.oninput = callback;
        parent.appendChild(input);
    }

    export function setText(div: Element, text: string) {
        div.textContent = text;
    }

    export function setValue(input: HTMLInputElement, value: string) {
        input.value = value;
    }

}
