export class BackgroundIllustration extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const element = document.createElement("div");
    element.setAttribute("aria-hidden", "true");
    element.setAttribute("role", "presentation");
    element.classList.add("bg-illustration");
    this.appendChild(element);
  }
}
