let cart = {
  Tomatoes: 0,
  Potatoes: 0,
  Carrots: 0
};

function updateCartDisplay() {
  let totalCount = 0;
  const products = document.querySelectorAll('.product');
  
  products.forEach(product => {
    const name = product.dataset.name;
    const countSpan = product.querySelector('.item-count');
    countSpan.textContent = cart[name];
    totalCount += cart[name];
  });

  document.getElementById('cart-count').textContent = totalCount;
}

document.querySelectorAll('.increase').forEach(button => {
  button.addEventListener('click', () => {
    const product = button.closest('.product');
    const name = product.dataset.name;
    cart[name]++;
    updateCartDisplay();
  });
});

document.querySelectorAll('.decrease').forEach(button => {
  button.addEventListener('click', () => {
    const product = button.closest('.product');
    const name = product.dataset.name;
    if (cart[name] > 0) {
      cart[name]--;
      updateCartDisplay();
    }
  });
});

function updateCartModal() {
  const cartItemsList = document.getElementById('cart-items');
  const totalItemsDisplay = document.getElementById('total-items');

  cartItemsList.innerHTML = '';
  let totalItems = 0;
  let subtotal = 0;

  document.querySelectorAll('.product').forEach(product => {
    const name = product.dataset.name;
    const price = parseFloat(product.dataset.price);
    const quantity = cart[name];

    if (quantity > 0) {
      const itemPrice = price * quantity;
      subtotal += itemPrice;
      totalItems += quantity;

      const li = document.createElement('li');
      li.textContent = `${name} - ${quantity} × $${price.toFixed(2)} = $${itemPrice.toFixed(2)}`;
      cartItemsList.appendChild(li);
    }
  });

  const itemFee = totalItems * 1.00;
  const approxTotal = subtotal + itemFee;

  totalItemsDisplay.innerHTML = `
    ${totalItems} items<br>
    Subtotal: $${subtotal.toFixed(2)}<br>
    Fees: $${itemFee.toFixed(2)}<br>
    <strong>Approx Total: $${approxTotal.toFixed(2)}</strong>
  `;
}

document.getElementById('view-cart-btn').addEventListener('click', () => {
  updateCartModal();
  const modal = document.getElementById('cart-modal');
  modal.classList.remove('hidden');
  modal.style.display = 'block';
});

document.querySelector('.close-button').addEventListener('click', () => {
  const modal = document.getElementById('cart-modal');
  modal.classList.add('hidden');
  modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  const modal = document.getElementById('cart-modal');
  if (event.target === modal) {
    modal.classList.add('hidden');
    modal.style.display = 'none';
  }
});

document.getElementById('checkout-btn').addEventListener('click', () => {
  const address = prompt("Please enter your delivery address:");
  if (address && address.trim() !== "") {
    alert(`Thank you for your purchase!\n\nYour order will be delivered to:\n${address}`);
    
    // Simulate driver notification
    alert("📣 A notification has been sent to the driver for delivery.");

    // Clear cart
    for (const item in cart) cart[item] = 0;
    updateCartDisplay();
    updateCartModal();
    document.getElementById('cart-modal').style.display = 'none';
  } else {
    alert("Checkout canceled. Delivery address is required.");
  }
});


document.getElementById('search-input').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  document.querySelectorAll('.product').forEach(product => {
    const name = product.dataset.name.toLowerCase();
    if (name.includes(query)) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
});


updateCartDisplay();
