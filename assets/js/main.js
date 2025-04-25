document.addEventListener('DOMContentLoaded', () => {
    const authButtons = document.getElementById('authButtons');
    const isLoggedIn = localStorage.getItem('user');

    if (authButtons) {
        if (isLoggedIn) {
            authButtons.innerHTML = `
                <button id="logoutBtn">Se déconnecter</button>
            `;

            document.getElementById('logoutBtn').addEventListener('click', () => {
                localStorage.removeItem('user');
                window.location.href = '/auth/login';
            });
        } else {
            authButtons.innerHTML = `
                <button><a href="/auth/login">Se connecter</a></button>
                <button><a href="/auth/signup">S'inscrire</a></button>
            `;
        }
    }
});