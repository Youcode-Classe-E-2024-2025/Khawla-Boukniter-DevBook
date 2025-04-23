const modal = document.getElementById('bookModal');
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');

openModalBtn.onclick = () => modal.style.display = 'block';
closeModalBtn.onclick = () => modal.style.display = 'none';

window.onclick = (e) => {
    if (e.target == modal) modal.style.display = 'none';
};
