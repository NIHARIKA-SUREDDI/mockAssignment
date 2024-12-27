const navbar=()=>{
    let card=`<div id='nav-container'>
    <a href="index.html"></a>
    <a href="index1.html">Home</a>
    <a href="quiz.html">Quiz</a>
    <a href="questions.html">Questions</a>
    <div>`;
    document.getElementById("nav").innerHTML=card;
    document.getElementById("home-link").addEventListener("click", () => {
        loadHomePage();


});
};

navbar();