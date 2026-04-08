export class QuizPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("quiz-page-template");
    const logoPlaceHolder = document.getElementById("logo-placeholder");
    const clonedFragment = template.content.cloneNode(true);

    logoPlaceHolder.innerHTML = "";
    const headerLogo = document.createElement("quiz-header-logo");
    headerLogo.dataset.variant = this.dataset.id;

    this.classList.add("main-container");

    logoPlaceHolder.appendChild(headerLogo);
    this.appendChild(clonedFragment);
  }
}
