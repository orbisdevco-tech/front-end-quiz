export class HomePage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("home-page-template");
    const clonedFragment = template.content.cloneNode(true);
    this.classList.add("main-container");
    this.appendChild(clonedFragment);
  }
}
