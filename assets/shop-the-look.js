let dotButton = document.querySelectorAll("  .dot__button");
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
