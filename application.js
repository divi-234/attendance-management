document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent form submission

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // For this example, let's assume a simple condition to simulate login
        if (email === 'logavya2004@gmail.com' && password === 'sablal123') {
            // Redirect to index.html after successful login
            window.location.href = 'index.html';
        } else {
            // Show an error message if login is incorrect
            const errorMessage = document.getElementById('error-message');
            errorMessage.textContent = 'Invalid email or password. Please try again.';
        }
    });
});
