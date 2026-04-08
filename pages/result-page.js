export class ResultPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("result-page-template");

    const clonedFragment = template.content.cloneNode(true);
    this.classList.add("main-container");

    const headerLogo = document.createElement("quiz-header-logo");
    const logoPlaceHolder = document.getElementById("logo-placeholder");
    headerLogo.dataset.variant = this.dataset.id;
    logoPlaceHolder.appendChild(headerLogo);

    this.appendChild(clonedFragment);
  }
}
