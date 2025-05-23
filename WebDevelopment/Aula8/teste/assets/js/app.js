const validCredentials = {
    username: "admin",
    password: "123456"
};

function login() {
    document.getElementById("formLogin").addEventListener("submit", function (event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (username === validCredentials.username && password === validCredentials.password) {
            alert("Login successful!");
            window.open("./assets/pages/main.html", "_self");
        } else {
            alert("Invalid username or password.");
        }
    })
}