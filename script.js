// Array to hold cart items
let cart = [];

// Get DOM elements for cart updates
const cartButton = document.getElementById("cartButton");
const cartItemsDiv = document.getElementById("cartItems");
const totalAmountDiv = document.getElementById("totalAmount");

// Function to update the cart and display cart items
function updateCart() {
    // Update cart button text (show number of items in the cart)
    cartButton.textContent = `🛒 Cart (${cart.length})`;

    // Clear previous cart display
    cartItemsDiv.innerHTML = "";

    // Calculate total price and display cart items
    let total = 0;
    cart.forEach((item, index) => {
        const cartItemDiv = document.createElement("div");
        cartItemDiv.classList.add("cart-item");
        cartItemDiv.innerHTML = `
            <p>${item.name} - $${item.price} x ${item.quantity}</p>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsDiv.appendChild(cartItemDiv);
        total += item.price * item.quantity;
    });

    // Update total amount
    totalAmountDiv.textContent = `Total: $${total}`;
}

// Add a product to the cart
function addToCart(product) {
    // Check if the product is already in the cart
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        // Increase quantity if the product is already in the cart
        existingProduct.quantity++;
    } else {
        // Otherwise, add the product with quantity 1
        cart.push({ ...product, quantity: 1 });
    }

    // Update the cart UI
    updateCart();
}

// Remove a product from the cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove the item at the specified index
    updateCart(); // Update the UI
}

// Event listener for adding products to the cart
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        const product = {
            id: e.target.getAttribute("data-id"),
            name: e.target.getAttribute("data-name"),
            price: parseFloat(e.target.getAttribute("data-price")),
        };
        addToCart(product);
    });
});
