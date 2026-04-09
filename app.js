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

function handleThemeToggle() {
  const themeSwitch = document.getElementById("theme-switch");
  const htmlRoot = document.querySelector("html");

  const theme = localStorage.getItem("theme");
  htmlRoot.classList.add(theme);

  if (!themeSwitch) return;
  themeSwitch.addEventListener("click", () => {
    localStorage.setItem(
      "theme",
      htmlRoot.classList.contains("dark") ? "light" : "dark",
    );
    htmlRoot.classList.toggle("dark");
  });
}

window.addEventListener("DOMContentLoaded", () => {
  registerComponents();
  router.init();
  handleThemeToggle();
});
