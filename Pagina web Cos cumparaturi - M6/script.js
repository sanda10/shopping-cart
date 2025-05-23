document.addEventListener('DOMContentLoaded', function() {
    const addProductForm = document.getElementById('addProductForm');
    const cartItems = document.getElementById('cartItems');
    const cartItemTemplate = document.getElementById('cartItemTemplate');

    // Încarcă produsele din Local Storage la deschiderea paginii
    loadCartFromLocalStorage();

    addProductForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const productName = document.getElementById('productName').value.trim();
        const productQuantity = parseInt(document.getElementById('productQuantity').value, 10);

        // Validare formular
        if (productName === '') {
            alert('Numele produsului nu poate fi gol');
            return;
        }
        if (isNaN(productQuantity) || productQuantity <= 0) {
            alert('Cantitatea produsului trebuie să fie un număr pozitiv');
            return;
        }

        addProductToCart(productName, productQuantity);
        addProductForm.reset();
    });

    function addProductToCart(name, quantity) {
        const template = cartItemTemplate.content.cloneNode(true);
        const productElement = template.querySelector('.product');
        productElement.querySelector('.productName').textContent = name;
        const quantityInput = productElement.querySelector('.productQuantity');
        quantityInput.value = quantity;
        quantityInput.addEventListener('change', updateProduct);
        productElement.querySelector('.updateProduct').addEventListener('click', updateProduct);
        productElement.querySelector('.removeProduct').addEventListener('click', removeProduct);
        cartItems.appendChild(productElement);
        saveCartToLocalStorage();
    }

    function updateProduct(event) {
        const productElement = event.target.closest('.product');
        const newQuantity = productElement.querySelector('.productQuantity').value;
        // Aici poți adăuga logica pentru a actualiza cantitatea produsului în coș
        alert(`Cantitatea produsului a fost actualizată la ${newQuantity}`);
        saveCartToLocalStorage();
    }

    function removeProduct(event) {
        const productElement = event.target.closest('.product');
        productElement.remove();
        // Aici poți adăuga logica pentru a elimina produsul din coș
        alert('Produsul a fost șters din coș');
        saveCartToLocalStorage();
    }

    function saveCartToLocalStorage() {
        const products = [];
        document.querySelectorAll('.product').forEach(productElement => {
            const name = productElement.querySelector('.productName').textContent;
            const quantity = productElement.querySelector('.productQuantity').value;
            products.push({ name, quantity });
        });
        localStorage.setItem('cart', JSON.stringify(products));
    }

    function loadCartFromLocalStorage() {
        const products = JSON.parse(localStorage.getItem('cart')) || [];
        products.forEach(product => {
            addProductToCart(product.name, product.quantity);
        });
    }
});
