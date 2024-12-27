import { baseUrl } from "./baseUrl.js";

const quizForm = document.getElementById("quizForm");
const container = document.getElementById("container");

quizForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const question = {
    title: document.getElementById("title").value,
    optionA: document.getElementById("optionA").value,
    optionB: document.getElementById("optionB").value,
    optionC: document.getElementById("optionC").value,
    optionD: document.getElementById("optionD").value,
    correctOption: document.getElementById("correctOption").value,
    reviewStatus: false,
  };
  await fetch(baseUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(question),
  });
  alert("Question Created");
  fetchQuestions();
});

async function fetchQuestions() {
  const res = await fetch(baseUrl);
  if (!res.ok) {
    console.error("Failed to fetch questions.");
    return;
  }
  const questions = await res.json();
  renderQuestions(questions);
}

function renderQuestions(questions) {
  container.innerHTML = "";
  questions.forEach((q) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.border = q.reviewStatus ? "2px solid violet" : "2px solid blue";
    card.style.width="20%";
    card.style.margin= "0 auto"

    card.innerHTML = `
      <h3>${q.title}</h3>
      <p>A: ${q.optionA}</p>
      <p>B: ${q.optionB}</p>
      <p>C: ${q.optionC}</p>
      <p>D: ${q.optionD}</p>
    `;

    const reviewButton = document.createElement("button");
    reviewButton.textContent = "Review";
    reviewButton.addEventListener("click", () => reviewQuestion(q.id));

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteQuestion(q.id));

    card.appendChild(reviewButton);
    card.appendChild(deleteButton);
    container.appendChild(card);
  });
}

async function reviewQuestion(id) {
  const confirmReview = confirm("Are you sure to review the question?");
  if (confirmReview) {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reviewStatus: true }),
    });
    if (!response.ok) {
      alert("Failed to review question.");
      return;
    }
    fetchQuestions();
  }
}

async function deleteQuestion(id) {
  const confirmDelete = confirm("Are you sure to delete?");
  if (confirmDelete) {
    const response = await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
    if (!response.ok) {
      alert("Failed to delete question.");
      return;
    }
    fetchQuestions();
  }
}

fetchQuestions();
