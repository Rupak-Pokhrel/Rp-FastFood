/**
 * RP Fast Food and Restaurant - Core Client Logic Script
 */

// DOM Cache Elements
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.getElementById('menu-icon');
const esewaModal = document.getElementById('esewa-modal');
const cartPreview = document.getElementById('cart-preview');
const modalItemsList = document.getElementById('modal-items-list');
const modalTotalPrice = document.getElementById('modal-total-price');

// Client State Data Storage Dictionary
let internalCart = {};

// 1. Mobile Hamburger Navigation Overlay Controller
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    if (mobileMenu.classList.contains('hidden')) {
        menuIcon.className = 'fa-solid fa-bars text-2xl';
    } else {
        menuIcon.className = 'fa-solid fa-xmark text-2xl';
    }
});

// Dismiss dropdown when clicking anchor target components
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIcon.className = 'fa-solid fa-bars text-2xl';
    });
});

// 2. Shopping Selection/Order Processing State Engine
function addToOrder(name, price) {
    if (internalCart[name]) {
        internalCart[name].qty += 1;
    } else {
        internalCart[name] = { price: price, qty: 1 };
    }
    updateCartPreviewLayoutDOM();
}

function updateCartPreviewLayoutDOM() {
    const items = Object.keys(internalCart);
    if(items.length === 0) {
        cartPreview.innerHTML = "No items added to your order yet.";
        return;
    }

    let total = 0;
    let listString = '<ul class="text-left space-y-1 max-h-24 overflow-y-auto">';
    items.forEach(key => {
        const row = internalCart[key];
        total += (row.price * row.qty);
        listString += `<li><span class="font-semibold text-neutral-800">${key}</span> x ${row.qty} - <span class="text-amber-600 font-medium">Rs. ${row.price * row.qty}</span></li>`;
    });
    listString += `</ul><div class="mt-2 pt-2 border-t border-gray-200 font-bold text-neutral-900 text-right">Current Subtotal: Rs. ${total}</div>`;
    
    cartPreview.innerHTML = listString;
}

// 3. Online eSewa Payment Window Modal System Interactions
function openEsewaModal() {
    const items = Object.keys(internalCart);
    if (items.length === 0) {
        alert('Please pick some delightful items from our menu first before attempting checkout!');
        return;
    }

    let modalListHtml = '';
    let finalPriceSum = 0;
    
    items.forEach(itemKey => {
        const data = internalCart[itemKey];
        const lineCost = data.price * data.qty;
        finalPriceSum += lineCost;
        
        modalListHtml += `
            <div class="flex justify-between text-sm text-gray-700">
                <span><strong class="text-neutral-900">${itemKey}</strong> (x${data.qty})</span>
                <span class="font-medium">Rs. ${lineCost}</span>
            </div>
        `;
    });

    modalItemsList.innerHTML = modalListHtml;
    modalTotalPrice.textContent = `Rs. ${finalPriceSum}`;
    
    esewaModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden'); // Lock global backdrop viewport frame updates
}

function closeEsewaModal() {
    esewaModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
}

function executePaymentMockup() {
    alert('Simulation Successful!\n\nYour order has been successfully logged. Connecting seamlessly to official eSewa secure transaction endpoints...\n\nThank you for choosing RP Fast Food!');
    internalCart = {};
    updateCartPreviewLayoutDOM();
    closeEsewaModal();
}