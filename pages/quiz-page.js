import { quizzesData } from "../lib/data.js";

export class QuizPage extends HTMLElement {
  constructor() {
    super();

    this.state = new Proxy(
      {
        currentQuestion: 0,
      },
      {
        set(target, prop, value) {
          target[prop] = value;
          window.dispatchEvent(new Event("quizpagestatechange"));
          return true;
        },
      },
    );
  }

  connectedCallback() {
    const template = document.getElementById("quiz-page-template");
    const logoPlaceHolder = document.getElementById("logo-placeholder");
    const clonedFragment = template.content.cloneNode(true);

    logoPlaceHolder.innerHTML = "";
    const headerLogo = document.createElement("quiz-header-logo");
    headerLogo.dataset.variant = this.dataset.id;

    this.classList.add("main-container");

    logoPlaceHolder.appendChild(headerLogo);
    this.appendChild(clonedFragment);

    this.submitButton = this.querySelector('button[type="submit"]');
    this.submitButton.disabled = true;

    this.render();
    this.handleListeners();
    window.addEventListener("quizpagestatechange", () => this.onStateChange());
  }

  async render() {
    const quizzes = quizzesData.quizzes.find((ele) => {
      return ele.title.toLocaleLowerCase() === this.dataset.id;
    });
    this.questions = quizzes.questions;
    this.renderQuestion(this.questions[this.state.currentQuestion]);
    this.onStateChange();
  }

  renderQuestion(question) {
    this.querySelector(".quiz-question__text").textContent = question.question;
    const fieldset = this.querySelector("fieldset");
    fieldset.innerHTML = null;

    for (const option of question.options) {
      fieldset.appendChild(this.createOption(option));
    }

    this.submitButton.textContent = "Submit Answer";
    this.submitButton.disabled = true;
    fieldset.addEventListener("change", (e) => {
      this.submitButton.disabled = !e.target.checked;
    });
  }

  createOption(option) {
    const template = this.querySelector("#quiz-answer-template");
    const node = template.content.cloneNode(true);
    node.querySelector(".option-card__text").textContent = option;
    node.querySelector("input").value = option;
    return node;
  }

  handleAnswerSubmit(e) {
    e.preventDefault();

    const currentQuestion = this.questions[this.state.currentQuestion];
    if (currentQuestion.score === undefined) {
      const { answer } = Object.fromEntries(new FormData(e.target));
      const options = this.querySelectorAll(".option-card");

      for (let option of options) {
        const optionValue = option.querySelector("input").value;
        if (
          (optionValue === answer && answer === currentQuestion.answer) ||
          optionValue === currentQuestion.answer
        )
          option.dataset.status = "correct";
        if (optionValue === answer && answer !== currentQuestion.answer)
          option.dataset.status = "incorrect";
      }

      // announce score
      this.querySelectorAll("fieldset input").forEach(
        (ele) => (ele.disabled = true),
      );

      this.querySelector('button[type="submit"]').textContent =
        this.state.currentQuestion + 1 === this.questions.length
          ? "Submit Quiz"
          : "Next Question";

      this.questions[this.state.currentQuestion].score = Number(
        answer === currentQuestion.answer ? 1 : 0,
      );

      this.querySelector(".option-card__result p").textContent = "Correct";

      return;
    }

    if (this.state.currentQuestion + 1 === this.questions.length) {
      window.app.router.go("/result", {
        callback: (node) => {
          node.dataset.id = this.dataset.id;
          node.dataset.totalScore = this.questions.length;
          node.dataset.score = this.questions.reduce(
            (acc, curr) => acc + curr.score,
            0,
          );
        },
      });
      return;
    }

    this.state.currentQuestion += 1;
    this.renderQuestion(this.questions[this.state.currentQuestion]);
  }

  handleListeners = () => {
    this.querySelector("form").addEventListener(
      "submit",
      this.handleAnswerSubmit.bind(this),
    );
  };

  onStateChange() {
    const currentQuestion = this.state.currentQuestion + 1;
    const totalQuestions = this.questions.length;

    const progress = this.querySelector("progress");
    progress.value = currentQuestion;
    progress.max = totalQuestions;
    this.querySelector(".quiz-question__label").textContent =
      `Question ${currentQuestion} of ${totalQuestions}`;
  }
}
