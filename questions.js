const API_URL = "https://scythe-gold-bellflower.glitch.me/questions";
async function fetchReviewedQuestions() {
    const res = await fetch(API_URL);
    const questions = await res.json();
    const reviewedQuestions = questions.filter((q) => q.reviewStatus);
    renderQuestions(reviewedQuestions);
}

function renderQuestions(questions) {
    const container = document.getElementById("reviewedQuestionsContainer");
    container.innerHTML = "";
    questions.forEach((q) => {
        const card = document.createElement("div");
        card.className = "card";
        card.style.border = "2px solid violet";
        card.innerHTML = `
            <h3>${q.title}</h3>
            <p>A: ${q.optionA}</p>
            <p>B: ${q.optionB}</p>
            <p>C: ${q.optionC}</p>
            <p>D: ${q.optionD}</p>
        `;
        container.appendChild(card);
    });
}

fetchReviewedQuestions();