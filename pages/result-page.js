export class ResultPage extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("result-page-template");
    const logoPlaceHolder = document.getElementById("logo-placeholder");

    const clonedFragment = template.content.cloneNode(true);
    this.classList.add("main-container");

    const headerLogo = document.createElement("quiz-header-logo");
    headerLogo.dataset.variant = this.dataset.id;

    logoPlaceHolder.innerHTML = "";
    logoPlaceHolder.appendChild(headerLogo);
    this.appendChild(clonedFragment);

    const totalScore = this.querySelector("#result-score-total");
    const score = this.querySelector("#result-score");
    const cardVariant = this.querySelectorAll("quiz-header-logo");

    totalScore.textContent = this.dataset.totalScore ?? 0;
    score.textContent = this.dataset.score ?? 0;
    cardVariant.forEach((card) => {
      card.dataset.variant = this.dataset.id;
    });
  }
}
