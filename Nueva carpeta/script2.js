// Elementos del DOM
const cartBtn = document.getElementById('cart-btn');
const cart = document.getElementById('cart');
const closeCartBtn = document.getElementById('close-cart');
const addButtons = document.querySelectorAll('.add-btn');
const cartItemsList = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const orderNowBtn = document.getElementById('order-now');

// Estado del carrito
let cartItems = [];

// Función para actualizar la vista del carrito
function updateCart() {
  cartItemsList.innerHTML = '';
  let total = 0;
  cartItems.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price} x${item.quantity}`;
    cartItemsList.appendChild(li);
    total += item.price * item.quantity;
  });
  cartTotal.textContent = total.toFixed(2);
  cartCount.textContent = cartItems.reduce((sum, item) => sum + item.quantity, 0);
}

// Manejar botón de agregar producto con cantidad
addButtons.forEach(button => {
  button.addEventListener('click', () => {
    const cardBack = button.closest('.card-back');
    const qtyInput = cardBack.querySelector('.qty-input');
    const quantity = parseInt(qtyInput.value, 10);

    if (quantity < 1 || isNaN(quantity)) {
      alert('Por favor, ingresa una cantidad válida.');
      return;
    }

    const name = button.getAttribute('data-name');
    const price = parseFloat(button.getAttribute('data-price'));
    const existingItem = cartItems.find(item => item.name === name);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cartItems.push({ name, price, quantity });
    }
    updateCart();
  });
});

// Mostrar/ocultar carrito
cartBtn.addEventListener('click', () => {
  const isHidden = cart.classList.contains('hidden');
  cart.classList.toggle('hidden');
  cartBtn.setAttribute('aria-expanded', !isHidden);
});

// Cerrar carrito con botón
closeCartBtn.addEventListener('click', () => {
  cart.classList.add('hidden');
  cartBtn.setAttribute('aria-expanded', false);
});

// Simular acción de checkout
checkoutBtn.addEventListener('click', () => {
  if (cartItems.length === 0) {
    alert('El carrito está vacío.');
    return;
  }
  alert(`Pedido finalizado. Total a pagar: $${cartTotal.textContent}`);
  cartItems = [];
  updateCart();
  cart.classList.add('hidden');
  cartBtn.setAttribute('aria-expanded', false);
});

// Botón Pide Ahora simula ir a checkout
orderNowBtn.addEventListener('click', () => {
  alert('Redirigiendo al checkout...');
});

/*CARRUSEL PROMOCIONES*/
let pictures = [
    "prom01.png",
    "prom02.png",
    "prom03.png",
    "prom04.png"
];
let contador = 0;

function carrusel(contenedor){
  contenedor.addEventListener('click',e =>   {
    let atras = contenedor.querySelector('.atras'),
        adelante = contenedor.querySelector('.adelante'),
        img = contenedor.querySelector('img'),
        tgt = e.target;//Identificar elemento que hace click
    console.log(tgt);
    if(tgt==atras){
       if(contador>0){
         img.src = pictures[contador -1];
         contador--;
       }else{
         img.src = pictures[pictures.length - 1];
         contador = pictures.length - 1;
       }
         
    }else if(tgt==adelante){
        if(contador < pictures.length - 1){
         img.src = pictures[contador + 1];
         contador++;
       }else{
         img.src = pictures[0];
         contador = 0;
       }     
    }
    
  });
}


  document.addEventListener("DOMContentLoaded", ()=>{
  let  contenedor = document.querySelector('.carrusel');
  carrusel(contenedor);
  });

  
  /*DELIVERY*/
