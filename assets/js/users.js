document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })
            .then(res => {
                if (!res.ok) throw new Error("iditenfiants incorrects");
                return res.json();
            })
            .then(user => {
                localStorage.setItem('user', JSON.stringify(user));
                window.location.href = '/';
            })
            .catch(err => {
                alert(err.message);
                console.error(err);
            });
    });
});