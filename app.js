import { router } from "./services/router.js";

import { QuizHeaderLogo } from "./components/quiz-header-logo.js";

window.app = {
  router,
};

window.addEventListener("DOMContentLoaded", () => {
  customElements.define("quiz-header-logo", QuizHeaderLogo);
  router.init();
});
