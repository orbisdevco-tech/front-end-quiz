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
      const url = e.state?.url || window.location.pathname;
      router.go(url, {
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
    links.forEach((link) => {
      link.onclick = handleLinkClick;
    });
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

    if (pushHistory && window.location.pathname !== url) {
      window.history.pushState({ url }, "", url);
    }

    let pageNode = null;
    const normalizedPath = isValidUrl(url) ? new URL(url).pathname : url;

    switch (normalizedPath) {
      case "/":
        document.body.dataset.page = "home";
        pageNode = document.createElement("home-page");
        break;
      case "/result":
        pageNode = document.createElement("result-page");
        break;
      default:
        if (
          typeof normalizedPath === "string" &&
          normalizedPath.startsWith("/quiz")
        ) {
          document.body.dataset.page = "quiz";
          const quizId = url.substring(url.lastIndexOf("/") + 1);
          pageNode = document.createElement("quiz-page");
          pageNode.dataset.id = quizId;
        }
    }

    if (callback) callback(pageNode);

    if (pageNode) {
      router.root.appendChild(pageNode);
      window.scrollTo(0, 0);
      router.setup();
    } else {
      router.go("/");
    }
  },
};

function isValidUrl(url) {
  try {
    new URL(url);
  } catch {
    return false;
  }
  return true;
}
