document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener('click', () => {
        const quantityElement = button.nextElementSibling;
        let quantity = parseInt(quantityElement.textContent, 10);
        if (!isNaN(quantity)) {
            quantity++;
            quantityElement.textContent = quantity;
            updateTotal();
        }
    });
});

document.querySelectorAll('.subtract-btn').forEach(button => {
    button.addEventListener('click', () => {
        const quantityElement = button.previousElementSibling;
        let quantity = parseInt(quantityElement.textContent, 10);
        if (!isNaN(quantity) && quantity > 0) {
            quantity--;
            quantityElement.textContent = quantity;
            updateTotal();
        }
    });
});

document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', () => {
        const productElement = button.closest('.product');
        if (productElement) {
            productElement.remove();
            updateTotal();
        }
    });
});

document.querySelectorAll('.favorite-btn').forEach(button => {
    button.addEventListener('click', () => {
        button.classList.toggle('favorited');
        // Exemple de gestion des favoris avec localStorage
        const productId = button.dataset.productId; // Supposons que chaque bouton a un attribut data-product-id
        let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        if (button.classList.contains('favorited')) {
            favorites.push(productId);
        } else {
            favorites = favorites.filter(id => id !== productId);
        }
        localStorage.setItem('favorites', JSON.stringify(favorites));
    });
});

function updateTotal() {
    let total = 0;
    document.querySelectorAll('.product').forEach(product => {
        const price = parseFloat(product.querySelector('.price').textContent.replace('$', ''));
        const quantity = parseInt(product.querySelector('.quantity').textContent, 10);
        if (!isNaN(price) && !isNaN(quantity)) {
            total += price * quantity;
        }
    });
    document.getElementById('total').textContent = total.toFixed(2);
}
