export class QuizHeaderLogo extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("quiz-header-logo");
    const clonedFragment = template.content.cloneNode(true);

    this.appendChild(clonedFragment);
    this.querySelector(".quiz-header-logo__label").textContent =
      this.getLabel();
  }

  getLabel() {
    switch (this.dataset.variant) {
      case "css":
        return "CSS";
      case "html":
        return "HTML";
      case "javascript":
        return "JavaScript";
      case "accessibility":
        return "Accessibility";
    }

    return "";
  }
}
