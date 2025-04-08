// Ensure Firebase is loaded
document.addEventListener("DOMContentLoaded", function () {
    // Firebase Configuration
    // Change this according to your own api key and etc.
    const firebaseConfig = {
        apiKey: "AIzaSyCH3WhU8sZXerI0zz_Q2_dHQp4XFFAStpQ",
        authDomain: "gdsc-project-xu.firebaseapp.com",
        projectId: "gdsc-project-xu",
        storageBucket: "gdsc-project-xu.appspot.com",
        messagingSenderId: "603170953076",
        appId: "1:603170953076:web:9d8f560213101fd1373e21",
        measurementId: "G-HW4MXCHMLT"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();

    // Login Function
    document.querySelector("#login-button")?.addEventListener("click", (e) => {
        e.preventDefault();

        const email = document.querySelector("#email").value;
        const password = document.querySelector("#password").value;
        const messageElement = document.querySelector("#login-message");

        if (!email || !password) {
            messageElement.textContent = "Please fill in both fields.";
            return;
        }

        auth.signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                if (user.emailVerified) {
                    console.log("User logged in:", user.email);
                    window.location.href = "dashboard.html";
                } else {
                    auth.signOut();
                    messageElement.textContent = "Please verify your email before logging in.";
                }
            })
            .catch((error) => {
                console.error("Login Error:", error.message);
                messageElement.textContent = error.message;
            });
    });

    // Signup Function
    document.querySelector("#signup-button")?.addEventListener("click", (e) => {
        e.preventDefault();

        const email = document.querySelector("#signup-email").value;
        const password = document.querySelector("#signup-password").value;
        const confirmPassword = document.querySelector("#signup-confirm-password").value;
        const messageElement = document.querySelector("#signup-message");

        if (!email || !password || !confirmPassword) {
            messageElement.textContent = "Please fill in all fields.";
            return;
        }

        if (password !== confirmPassword) {
            messageElement.textContent = "Passwords do not match!";
            return;
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User signed up:", user.email);

                // ✅ Send email verification
                user.sendEmailVerification()
                    .then(() => {
                        messageElement.textContent = "Verification email sent. Please check your inbox.";
                        // Optional: redirect to login page after short delay
                        setTimeout(() => {
                            window.location.href = "login.html";
                        }, 3000);
                    })
                    .catch((error) => {
                        console.error("Error sending verification email:", error.message);
                        messageElement.textContent = "Error sending verification email.";
                    });
            })
            .catch((error) => {
                console.error("Signup Error:", error.message);
                messageElement.textContent = error.message;
            });
    });
});
