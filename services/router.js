import { HomePage } from "../pages/home-page.js";
import { QuizPage } from "../pages/quiz-page.js";
import { ResultPage } from "../pages/result-page.js";

export const router = {
  root: null,
  init: () => {
    customElements.define("home-page", HomePage);
    customElements.define("quiz-page", QuizPage);
    customElements.define("result-page", ResultPage);

    router.setup();

    router.go(window.location.pathname);

    window.addEventListener("popstate", (e) => {
      router.go(e.state?.url || window.location.pathname, {
        pushHistory: false,
      });
    });
  },
  setup: () => {
    router.root = document.querySelector("main");
    const links = Array.from(document.querySelectorAll("a"));
    const handleLinkClick = (e) => {
      e.preventDefault();
      router.go(e.target.href);
    };

    links.forEach((link) => link.addEventListener("click", handleLinkClick));
  },
  go: (url, options = {}) => {
    const defaultOptions = {
      pushHistory: true,
      callback: () => {},
    };

    const { pushHistory, callback } = {
      ...defaultOptions,
      ...options,
    };

    router.root.innerHTML = "";

    if (pushHistory) {
      window.history.replaceState({ url }, "", url);
    }

    let pageNode = null;
    switch (url) {
      case "/":
        document.body.dataset.page = "home";
        pageNode = document.createElement("home-page");
        break;
      case "/result":
        pageNode = document.createElement("result-page");
        break;
      default:
        document.body.dataset.page = "quiz";
        const quizId = url.substring(url.lastIndexOf("/") + 1);
        pageNode = document.createElement("quiz-page");
        pageNode.dataset.id = quizId;
    }

    if (callback) callback(pageNode);

    if (pageNode) {
      router.root.appendChild(pageNode);
      router.setup();
    }
  },
};
