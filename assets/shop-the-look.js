let dotButton = document.querySelectorAll(".dot__button");
dotButton.forEach((dot) => {
  dot.addEventListener("click", () => {
    const productId = dot.dataset.productId;
    let cardProducts = document.querySelectorAll(".card");
    cardProducts.forEach((card) => {
      card.style.display = "none";
    });
    const targetCard = document.querySelector(
      `.card[data-product-id="${productId}"]`,
    );
    if (targetCard) {
      targetCard.style.display = "flex";
    }
  });
});

document.querySelectorAll(".shop-now-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const variantId = btn.dataset.variantId;
    addToCart(variantId);
  });
});

function addToCart(variantId) {
  fetch("/cart/add.js", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: variantId, quantity: 1 }),
  })
    .then((res) => res.json())
    .then(() => {
      window.location.href = "/cart";
    })
    .catch((err) => console.error("Add to cart failed:", err));
}
