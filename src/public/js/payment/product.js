export const handleSearchAndFilter = function (e) {
  // I) variable identification
  // 1.price search
  const fromInput = document.querySelector('input[name="price-from"]').value;
  const toInput = document.querySelector('input[name="price-to"]').value;

  // 2. sort order (thứ tự sắp xếp)
  const sortOptions = $('input[name="flexRadioDefault"]:checked');
  let oldSearchParams = new URLSearchParams(location.search);

  // 3.manufacturer
  const checkedManufacturerInputs = [
    ...document.querySelectorAll("input[name='manufacturer']:checked"),
  ];

  // 4.category
  const categoryInput = document.querySelector("select[name='category']");

  // II) assign query string
  let searchQuery = "";
  // 1) price search
  if (fromInput.trim().length === 0 && toInput.trim().length === 0) {
    searchQuery += `?priceRange=0, 1000000000`;
  } else if (
    fromInput.trim().length === 0 ||
    toInput.trim().length === 0 ||
    +fromInput > +toInput
  ) {
    alert("Khoảng giá không hợp lệ vui lòng nhập lại");
    return;
  } else {
    searchQuery += `?priceRange=${fromInput},${toInput}`;
  }

  // 2) sort order

  switch (sortOptions.val()) {
    case "low-to-high":
      searchQuery += `&_sort&column=price&type=asc`;
      break;
    case "high-to-low":
      searchQuery += `&_sort&column=price&type=desc`;
      break;
    case "created-at":
      searchQuery += `&_sort&column=_createdAt&type=asc`;
      break;
    case "default":
      searchQuery += "";
      break;
    default:
      searchQuery += "";
      break;
  }

  // 3) manufacturer
  // ["Sunrise_Foods", "Friggitoria", ...]
  if (checkedManufacturerInputs.length !== 0) {
    const manufacturers = checkedManufacturerInputs.map(
      (checkedManu) => checkedManu.dataset.search
    );
    searchQuery += `&manufacturer=${manufacturers.join(",")}`;
  }

  // 4) category
  searchQuery += `&category=${categoryInput.value}`;
  location.assign(searchQuery);
};

export const handlePagination = function (e) {
  const allowFields = [
    "_sort",
    "column",
    "type",
    "priceRange",
    "manufacturer",
    "category",
    "page",
  ];
  const query = e.target.dataset.query;
  if (!query) {
    alert("khong tim thay query");
    return;
  }

  const pageValue = query.split("=")[1];
  const params = new URLSearchParams(location.search);
  params.set("page", pageValue);

  const url = allowFields.reduce((accum, field, index) => {
    if (params.has(field)) {
      if (index !== 0) {
        accum += "&";
      }

      return (accum += `${field}=${params.get(field)}`);
    }

    return accum;
  }, "?");
  location.assign(url);
};

export const loadFilterFromSearchParams = function () {
  const params = new URLSearchParams(location.search);
  // 1) price range
  if (params.has("priceRange")) {
    const fromInput = document.querySelector('input[name="price-from"]');
    const toInput = document.querySelector('input[name="price-to"]');
    const priceString = params.get("priceRange");
    const [fromPrice, toPrice] = priceString.split(",");

    if (+fromPrice !== 0 && +toPrice !== 1000000000) {
      fromInput.value = fromPrice;
      toInput.value = toPrice;
    }
  }

  // 2) sort order
  if (params.has("column") && params.has("type")) {
    const column = params.get("column");
    const type = params.get("type");
    let sortValue = "";

    if (column === "price") {
      sortValue = type === "asc" ? "low-to-high" : "high-to-low";
    } else {
      sortValue = "created-at";
    }

    const sortOptions = document.querySelector(`input[value=${sortValue}]`);
    console.log(sortOptions);
    sortOptions.checked = true;
  }

  // 3) manufacturer
  if (params.has("manufacturer")) {
    const manufacturers = params.get("manufacturer").split(",");
    manufacturers.forEach((manu) => {
      document.querySelector(`input[value=${manu}]`).checked = true;
    });
  }

  // 4) category
  if (params.has("category")) {
    const categoryInput = document.querySelector("select[name='category']");
    categoryInput.value = params.get("category");
  }

  // 5) pagination
  if (params.has("page")) {
    const page = document.querySelector(
      `.page-item[value="${params.get("page")}"]`
    );

    page.classList.add("selected");
  }
};
