export const handleSortPrice = function(e) {
  e.preventDefault();
  const fromInput = this.elements[name="price-from"].value;
  const toInput = this.elements[name="price-to"].value;

  if (!fromInput || !toInput || fromInput.trim().length === 0 || toInput.trim().length === 0 || fromInput > toInput) {
    alert("Khoảng giá không phù hợp");
    return;
  }

//   const oldHref = location.href;
//   const queryPriceString =  `priceRange=${fromInput},${toInput}`
//   const newHref = oldHref.includes("?") ? `${oldHref}&${queryPriceString}` : `${oldHref}?${queryPriceString}`;
  location.href = `?priceRange=${fromInput},${toInput}`;

} 