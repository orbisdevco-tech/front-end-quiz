import { router } from "./services/router.js";

import { QuizHeaderLogo } from "./components/quiz-header-logo.js";
import { LanguageLogo } from "./components/language-logo.js";

window.app = {
  router,
};

function registerComponents() {
  customElements.define("language-logo", LanguageLogo);
  customElements.define("quiz-header-logo", QuizHeaderLogo);
}

window.addEventListener("DOMContentLoaded", () => {
  registerComponents();
  router.init();
});
