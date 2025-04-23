document.addEventListener("DOMContentLoaded", () => {
    fetch('/books')
        .then(response => response.json())
        .then(data => {
            const container = document.querySelector('.container');
            container.innerHTML = '';

            data.forEach(book => {
                const card = document.createElement('div');

                card.className = 'card';
                card.innerHTML = `
                <div class="card-body">
                    <h4 class="card-title">${book.titre}</h4>
                    <p class="card-text">${book.description}</p>
                </div>
                <div class="card-footer">
                    <i class="fa-solid fa-circle fa-2xs" style="color: ${book.dispo_status === 'disponible' ? '#05ff09' : '#a1a1a1'};"></i>
                    <span>${book.dispo_status}</span>
                </div> 
            `;
                container.appendChild(card);
            });
        })
        .catch(err => console.error(err));

})