document.addEventListener('DOMContentLoaded', () => {
    // Student Login Logic
    const studentLoginForm = document.getElementById('studentLoginForm');
    if (studentLoginForm) {
        studentLoginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = document.getElementById('studentEmail').value;
            const password = document.getElementById('studentPassword').value;

            if (email === 'student@example.com' && password === 'student123') {
                // Redirect to index.html after successful student login
                window.location.href = 'index.html';
            } else {
                const errorMessage = document.getElementById('error-message');
                errorMessage.textContent = 'Invalid student email or password.';
            }
        });
    }

    // Teacher Login Logic
    const teacherLoginForm = document.getElementById('teacherLoginForm');
    if (teacherLoginForm) {
        teacherLoginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = document.getElementById('teacherEmail').value;
            const password = document.getElementById('teacherPassword').value;

            if (email === 'teacher@example.com' && password === 'teacher123') {
                // Redirect to index.html after successful teacher login
                window.location.href = 'index.html';
            } else {
                const errorMessage = document.getElementById('error-message');
                errorMessage.textContent = 'Invalid teacher email or password.';
            }
        });
    }

    // Admin Login Logic
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = document.getElementById('adminEmail').value;
            const password = document.getElementById('adminPassword').value;

            if (email === 'admin@example.com' && password === 'admin123') {
                // Redirect to index.html after successful admin login
                window.location.href = 'index.html';
            } else {
                const errorMessage = document.getElementById('error-message');
                errorMessage.textContent = 'Invalid admin email or password.';
            }
        });
    }
});
