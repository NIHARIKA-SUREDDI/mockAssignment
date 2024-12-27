

const form =document.getElementById("form");
form.addEventListener("submit",function(event){
    event.preventDefault();

    const emailInput = document.getElementById("email").value.trim();
    const passwordInput = document.getElementById("password").value.trim();


    const validEmail = "empher@gmail.com";
    const validPassword = "empher@123";
    

    
    if (emailInput === validEmail && passwordInput === validPassword) {
      
        alert("Login Success, you are redirecting to quiz page.");
        window.location.href = "quiz.html"; 
    } else {
     alert("Invalid credentials. Please try again.");
    }


});
