document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;

    if(email === "admin@admin.com" && mobile === "1234567890") {
        window.location.href = "admin.html";
    }else {
        document.getElementById("login-error").innerHTML = "Invalid credentials";
    }

});
