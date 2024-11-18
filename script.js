document.addEventListener('DOMContentLoaded', function () {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const username = document.getElementById('username').value.trim();
            if (username) {
                localStorage.setItem('loggedIn', 'true');  // Use 'true' as string
                localStorage.setItem('username', username);
                alert(`Welcome, ${username}! You are now logged in.`);
                window.location.href = 'index.html'; // Redirect to home page
            } else {
                alert('Please enter a valid username.');
            }
        });
    }

    // Handle comment or review actions
    const reviewForms = document.querySelectorAll('.comment-form, #add-review-form');
    reviewForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            if (!isLoggedIn) {
                e.preventDefault();
                alert('You must log in to perform this action.');
                window.location.href = 'login.html'; // Redirect to login page
            }
        });
    });

    // Greet the logged-in user (if applicable)
    const username = localStorage.getItem('username');
    if (isLoggedIn && username) {
        const navbar = document.querySelector('.navbar-nav');
        const userGreeting = document.createElement('li');
        userGreeting.className = 'nav-item';
        userGreeting.innerHTML = `<a class="nav-link disabled">Hello, ${username}</a>`;
        navbar.appendChild(userGreeting);

        // Add a logout button
        const logoutButton = document.createElement('li');
        logoutButton.className = 'nav-item';
        logoutButton.innerHTML = `<a class="nav-link text-danger" id="logoutButton" href="#">Logout</a>`;
        navbar.appendChild(logoutButton);

        // Handle logout
        logoutButton.addEventListener('click', function (e) {
            e.preventDefault();
            localStorage.removeItem('loggedIn');
            localStorage.removeItem('username');
            alert('You have successfully logged out.');
            window.location.href = 'index.html'; // Redirect to home page
        });
    }

    // Enable/Disable review submission based on login status
    const reviewSubmitButton = document.getElementById('submitReview');
    if (reviewSubmitButton) {
        if (!isLoggedIn) {
            reviewSubmitButton.disabled = true; // Disable the submit button if not logged in
            document.getElementById('reviewLoginMessage').style.display = 'block'; // Show login message
        } else {
            reviewSubmitButton.disabled = false; // Enable the submit button if logged in
            document.getElementById('reviewLoginMessage').style.display = 'none'; // Hide login message
        }
    }
});
