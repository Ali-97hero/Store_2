/* Dropdown */
const navItems = document.querySelectorAll(".nav__item");
navItems.forEach((item) => {
  const dropdown = item.querySelector(".mega-dropdown");
  let closeTimer;
  item.addEventListener("mouseenter", () => {
    clearTimeout(closeTimer);
    dropdown.classList.add("active");
  });
  item.addEventListener("mouseleave", () => {
    closeTimer = setTimeout(() => {
      dropdown.classList.remove("active");
    }, 100);
  });

  dropdown.addEventListener("mouseleave", () => {
    clearTimeout(closeTimer);
  });
});
/* Mobile Dropdown */
const menuBtn = document.querySelector(".nav_menu");
const mobileDrawer = document.getElementById("mobileDrawer");
const mobileOverlay = document.getElementById("mobileOverlay");
const mobileClose = document.getElementById("mobileClose");

function openDrawer() {
  mobileDrawer.classList.add("active");
  mobileOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeDrawer() {
  mobileDrawer.classList.remove("active");
  mobileOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

menuBtn.addEventListener("click", openDrawer);
mobileClose.addEventListener("click", closeDrawer);
mobileOverlay.addEventListener("click", closeDrawer);

// accordion
document.querySelectorAll(".mobile-nav__trigger").forEach((trigger) => {
  trigger.addEventListener("click", () => {
    const item = trigger.parentElement;
    const wasOpen = item.classList.contains("open");
    document
      .querySelectorAll(".mobile-nav__item")
      .forEach((i) => i.classList.remove("open"));
    if (!wasOpen) item.classList.add("open");
  });
});

const searchBtn = document.querySelector(".nav__search__svg_1");
const searchOverlay = document.querySelector(".searchbar-overlay");
const searchParent = document.querySelector(".search_bar_parent");
const searchClose = document.querySelector(".search_bar_cross");

function openSearch() {
  searchOverlay.classList.add("active");
  searchParent.classList.add("active");
}
function closeSearch() {
  searchOverlay.classList.remove("active");
  searchParent.classList.remove("active");
}
searchBtn.addEventListener("click", () => {
  openSearch();
});

searchClose.addEventListener("click", () => {
  closeSearch();
});
searchOverlay.addEventListener("click", () => {
  closeSearch();
});
searchParent.addEventListener("click", (e) => e.stopPropagation());

const searchBtnMobile = document.querySelector(".nav__search__svg_2");
const searchBarMobileParent = document.querySelector(
  ".search_bar_mobile_parent",
);
const searchBarMobileCross = document.querySelector(".sb-top-cross");
searchBtnMobile.addEventListener("click", () => {
  searchBarMobileParent.classList.add("active");
});
searchBarMobileCross.addEventListener("click", () => {
  searchBarMobileParent.classList.remove("active");
});

const cartIcon = document.querySelector(".nav__cart");
const cartParent = document.querySelector(".cart-parent");
const cartOverlay = document.querySelector(".cart-overlay");
const cartCrossIcon = document.querySelector(".cart-cross-icon");
const shopBtn = document.querySelector(".shop");
function cartOpen() {
  cartOverlay.classList.add("active");
  cartParent.classList.add("active");
}
function cartClose() {
  cartOverlay.classList.remove("active");
  cartParent.classList.remove("active");
}
cartIcon.addEventListener("click", () => {
  cartOpen();
  getCart();
});
cartCrossIcon.addEventListener("click", () => {
  cartClose();
});
cartOverlay.addEventListener("click", () => {
  cartClose();
});

shopBtn.addEventListener("click", () => {
  cartClose();
});
/* Cart Functionality */
function getCart() {
  fetch("/cart.js")
    .then((res) => res.json())
    .then((cart) => renderCart(cart));
}
function renderCart(cart) {
  const cartContainer = document.querySelector(".cart");
  const emptyContainer = document.querySelector(".empty-cart-body-content");
  const buyBtn = document.querySelector(".buy");
  const shopBtn = document.querySelector(".shop");
  if (cart.item_count === 0) {
    cartContainer.innerHTML = "";
    emptyContainer.style.display = "block";
    buyBtn.style.display = "none";
    shopBtn.style.display = "flex";
    return;
  }
  emptyContainer.style.display = "none";
  shopBtn.style.display = "none";
  buyBtn.style.display = "flex";

  cartContainer.innerHTML = cart.items
    .map(
      (item) => `
    <div class="cart-item" data-key="${item.key}">
    <img src="${item.image}" alt="${item.title}">
    <div class="cart-item__info">
        <p class="cart-item__title">${item.product_title}</p>
        <p class="cart-item__variant">${item.variant_title || ""}</p>
         <div class="cart-item__qty">
          <button class="qty-btn minus" data-key="${item.key}">−</button>
          <span>${item.quantity}</span>
          <button class="qty-btn plus" data-key="${item.key}">+</button>
        </div>
        <p class="cart-item__price">${formatCurrency(item.final_price)}</p>
    </div>
     <button class="cart-item__remove" data-key="${item.key}">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
  </div>
    `,
    )
    .join("");
  if (cart.item_count === 0) {
    return "";
  } else {
    document.querySelector(".cart-count").innerHTML = `(${cart.item_count})`;
  }
  attachCartListeners();
}

function formatCurrency(cents) {
  return "$" + (cents / 100).toFixed(2);
}
function updateCartQuantity(key, quantity) {
  fetch("/cart/change.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: key,
      quantity: quantity,
    }),
  })
    .then((res) => res.json())
    .then((cart) => renderCart(cart));
}
function removeCartItem(key) {
  updateCartQuantity(key, 0);
}

function attachCartListeners() {
  document.querySelectorAll(".cart-item__remove").forEach((Btn) => {
    Btn.addEventListener("click", () => {
      removeCartItem(Btn.dataset.key);
    });
  });
  document.querySelectorAll(".qty-btn.minus").forEach((Btn) => {
    Btn.addEventListener("click", () => {
      const qty = parseInt(Btn.nextElementSibling.innerText) - 1;
      updateCartQuantity(Btn.dataset.key, qty);
    });
  });
  document.querySelectorAll(".qty-btn.plus").forEach((Btn) => {
    Btn.addEventListener("click", () => {
      const qty = parseInt(Btn.nextElementSibling.innerText) + 1;
      updateCartQuantity(Btn.dataset.key, qty);
    });
  });
}
