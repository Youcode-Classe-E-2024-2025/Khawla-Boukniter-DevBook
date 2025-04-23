document.addEventListener("DOMContentLoaded", () => {
    fetch('/emprunts')
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
        .then(data => {
            const container = document.getElementById('empruntTableBody');
            container.innerHTML = '';

            data.forEach(emprunt => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${emprunt.titre}</td>
                    <td>${new Date(emprunt.date_emprunt).toLocaleDateString()}</td>
                    <td>${new Date(emprunt.date_limit).toLocaleDateString()}</td>
                    <td>${emprunt.date_retour ? new Date(emprunt.date_retour).toLocaleDateString() : '—'}</td>
                    <td>${emprunt.read_status || 'À lire'}</td>
                    <td class="admin-only">${emprunt.username || ''}</td>
                    <td class="regular-only">
                        ${emprunt.date_retour ? '' : '<button class="return-btn">Retourner</button>'}
                    </td>
                `;
                container.appendChild(tr);
            });
        })
        .catch(err => console.error(err));
});