export class QuizHeaderLogo extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("quiz-header-logo");
    const clonedFragment = template.content.cloneNode(true);
    this.appendChild(clonedFragment);
    this.render();
  }

  render() {
    const label = this.querySelector(".quiz-header-logo__label");
    const logo = this.querySelector("language-logo");

    if (label && logo) {
      label.textContent = this.getLabel();
      logo.dataset.variant = this.dataset.variant;
    }
  }

  static get observedAttributes() {
    return ["data-variant"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "data-variant" && oldValue !== newValue) {
      this.render();
    }
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
