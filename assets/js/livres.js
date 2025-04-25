document.addEventListener("DOMContentLoaded", () => {
    fetch('/books')
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
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

    const main = document.querySelector('main');
    const filterContainer = document.createElement('div');
    filterContainer.innerHTML = `
        <label for="categoryFilter" style="font-weight: bold; margin-right: 8px;">Filtrer par catégorie :</label>
        <select id="categoryFilter">
            <option value="">Toutes les catégories</option>
        </select>
    `;
    filterContainer.style = 'margin:20px'
    main.insertBefore(filterContainer, document.querySelector('.container'));

    const select = filterContainer.querySelector('#categoryFilter');

    fetch('/categories')
        .then(res => res.json())
        .then(categories => {
            console.log("Catégories reçues :", categories);
            categories.forEach(cat => {
                const option = document.createElement('option');
                option.value = cat.id;
                option.textContent = cat.name;
                select.appendChild(option);
            });

            const categorySelect = document.getElementById('categorySelect');

            if (categorySelect) {
                categories.forEach(cat => {
                    const option = document.createElement('option');
                    option.value = cat.id;
                    option.textContent = cat.name;
                    categorySelect.appendChild(option);
                });
            }
        });

    function afficherLivres(livres) {
        const container = document.querySelector('.container');
        container.innerHTML = '';
        livres.forEach(book => {
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
    }

    fetch('/books')
        .then(res => res.json())
        .then(afficherLivres);

    select.addEventListener('change', () => {
        const categoryId = select.value;
        console.log("Catégorie sélectionnée :", categoryId);
        const url = categoryId ? `/books/category/${categoryId}` : '/books';

        fetch(url)
            .then(res => res.json())
            .then(afficherLivres);
    });

    const form = document.querySelector('#bookModal form');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const titre = document.querySelector('input[name="titre"]').value.trim();
        const description = document.querySelector('input[name="description"]').value.trim();
        const auteur = document.querySelector('input[name="auteur"]').value.trim();
        const category_id = document.querySelector('#categorySelect').value;

        if (!titre || !description || !auteur || !category_id) {
            alert('tous les champs sont obligatoires');
            return;
        }

        fetch('/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ titre, description, auteur, category_id })
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => {
                        throw new Error(text);
                    });
                }
                return response.text();
            })
            .then(msg => {
                alert('livre ajouté');
                form.reset();

                const modal = document.getElementById('bookModal');
                if (modal && modal.hidePopover) modal.hidePopover();

                fetch('/books')
                    .then(res => res.json())
                    .then(afficherLivres);
            })
            .catch(err => {
                alert(err.message);
                console.error(err);

            });
    });
})