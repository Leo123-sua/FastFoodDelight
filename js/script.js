document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartElement = document.getElementById('cart');
    const purchaseButton = document.getElementById('purchase-btn');

    // Actualizar el carrito en la página
    function updateCart() {
        if (!cartElement) return;

        if (cart.length === 0) {
            cartElement.innerHTML = '<p>Tu carrito está vacío.</p>';
            if (purchaseButton) purchaseButton.style.display = 'none';
            return;
        }

        const cartItems = cart.map((item) => `
            <div class="cart-item d-flex justify-content-between align-items-center">
                <strong>${item.name}</strong> - $${item.price.toFixed(2)} x ${item.quantity}
                <button class="btn btn-sm btn-danger remove-item" data-name="${item.name}">Eliminar</button>
                <span><strong>Total:</strong> $${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('');

        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

        cartElement.innerHTML = `
            ${cartItems}
            <hr>
            <h4 class="text-end">Total: $${total.toFixed(2)}</h4>
        `;

        if (purchaseButton) purchaseButton.style.display = 'block';
    }

    // Agregar producto al carrito
    document.body.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const name = event.target.getAttribute('data-name');
            const price = parseFloat(event.target.getAttribute('data-price'));

            const existingItem = cart.find((item) => item.name === name);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
            alert(`${name} añadido al carrito.`);
        }
    });

    // Eliminar producto del carrito
    document.body.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item')) {
            const name = event.target.getAttribute('data-name');
            cart = cart.filter((item) => item.name !== name);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        }
    });

    // Confirmar compra
    if (purchaseButton) {
        purchaseButton.addEventListener('click', () => {
            if (cart.length === 0) {
                alert('El carrito está vacío.');
                return;
            }
            alert('¡Gracias por tu compra!');
            cart = [];
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCart();
        });
    }

    // Inicializar el carrito al cargar la página
    updateCart();
});
