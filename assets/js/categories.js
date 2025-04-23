document.addEventListener("DOMContentLoaded", () => {
    fetch('/categories')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('categoryList');
            container.innerHTML = '';

            data.forEach(category => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <div class="card-body">
                        <h4 class="card-title">${category.name}</h4>
                        <p class="card-text">${category.description}</p>
                    </div>
                `;
                container.appendChild(card);
            });
        })
        .catch(err => console.error(err));
});