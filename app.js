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
  const input = document.querySelector("#theme-switch input");
  const htmlRoot = document.querySelector("html");

  if (!input) return;

  const toggleTheme = (isDark) => {
    if (isDark) htmlRoot.classList.add("dark");
    else htmlRoot.classList.remove("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  input.addEventListener("input", (e) => {
    const isChecked = e.target.checked;
    toggleTheme(isChecked);
  });

  const theme = localStorage.getItem("theme");
  const isDark = theme == "dark";
  input.checked = isDark;
  toggleTheme(isDark);
}

window.addEventListener("DOMContentLoaded", () => {
  registerComponents();
  router.init();
  handleThemeToggle();
});
