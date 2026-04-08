export class LanguageLogo extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const template = document.getElementById("language-logo");
    const clonedFragment = template.content.cloneNode(true);
    this.appendChild(clonedFragment);
  }
}
