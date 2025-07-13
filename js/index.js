var productNameInput = document.getElementById("productName");
var productPriceInput = document.getElementById("productPrice");
var productCategoryInput = document.getElementById("productCategory");
var productDescriptionInput = document.getElementById("productDescription");
var productImageInput = document.getElementById("productImage");
var searchInput = document.getElementById("searchInput");
var btnAdd = document.getElementById("btnAdd");
var btnUpdate = document.getElementById("btnUpdate");

var currentIndex = 0;
productList = [];

if (localStorage.getItem("productContainer") != null) {
  productList = JSON.parse(localStorage.getItem("productContainer"));
}

displayData();
function addProduct() {
  if (
    validationInputs(productNameInput, "msgName") &&
    validationInputs(productPriceInput, "msgPrice") &&
    validationInputs(productCategoryInput, "msgCategory") &&
    validationInputs(productDescriptionInput, "msgDescription")
  ) {
    var product = {
      name: productNameInput.value.trim(),
      price: productPriceInput.value,
      category: productCategoryInput.value.trim(),
      description: productDescriptionInput.value.trim(),
      image: productImageInput.files[0]
        ? `image/${productImageInput.files[0]?.name}`
        : `image/electronic3.JPEG`,
    };

    productList.push(product);
    localStorage.setItem("productContainer", JSON.stringify(productList));
    clearForm();
    displayData();
  }
  removeValidClasses();
}

function displayData() {
  var cartona = "";
  for (var i = 0; i < productList.length; i++) {
    cartona += createCols(i);
  }
  document.getElementById("rowData").innerHTML = cartona;
}

function searchData() {
  var term = searchInput.value;

  cartona = "";
  for (let i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(term.toLowerCase())) {
      cartona += createCols(i);
    }
  }
  document.getElementById("rowData").innerHTML = cartona;
}

function createCols(i) {
  let patter = new RegExp(searchInput.value, "gi");
  return `
       <div class="col-md-3">
            <div class="card">
              <div class="card">
                <img height="150px" class="card-img-top" src="image/electronic3.JPEG" alt="Title" />
                <div class="card-body text-center">
                  <span>id: ${i}</span>
                  <h3 class="card-title"> ${productList[i].name.replace(
                    patter,
                    (match) => `<span class="bg-info">${match}</span>`
                  )}</h3>
                  <h4 class="card-text"> ${productList[i].price}</h4>
                  <h4 class="card-text">  ${productList[i].category}</h4>
                  <p class="card-text"> ${productList[i].description}</p>
                </div>
                <div class="card-footer text-center">
                  <button  onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm">delete</button>
                  <button onclick="dataUpdateInfo(${i})" class="btn btn-outline-warning btn-sm">update</button>
                </div>
              </div>
            </div>
          </div>
        `;
}

function clearForm() {
  productNameInput.value = null;
  productPriceInput.value = null;
  productCategoryInput.value = null;
  productDescriptionInput.value = null;
  productImageInput.value = null;
}

function deleteProduct(index) {
  productList.splice(index, 1);
  localStorage.setItem("productContainer", JSON.stringify(productList));
  displayData();
}

function dataUpdateInfo(index) {
  currentIndex = index;
  productNameInput.value = productList[index].name;
  productPriceInput.value = productList[index].price;
  productCategoryInput.value = productList[index].category;
  productDescriptionInput.value = productList[index].description;

  btnAdd.classList.add("d-none");
  btnUpdate.classList.remove("d-none");
}

function updateData() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescriptionInput.value,
    image: productImageInput.files[0]
      ? `image/${productImageInput.files[0]?.name}`
      : `image/stitch2.png`,
  };
  productList.splice(currentIndex, 1, product);
  localStorage.setItem("productContainer", JSON.stringify(productList));

  displayData();

  btnAdd.classList.remove("d-none");
  btnUpdate.classList.add("d-none");
  clearForm();
}

// function validationName() {
//   var text = productNameInput.value;
//   var regex = /^[A-Za-z][A-Za-z0-9 ]{2,19}$/;
//   var msgName = document.getElementById("msgName");
//   if (regex.test(text)) {
//     productNameInput.classList.remove("is-invalid");
//     productNameInput.classList.add("is-valid");

//     msgName.classList.add("d-none");
//     return true;
//   } else {
//     productNameInput.classList.remove("is-valid");
//     productNameInput.classList.add("is-invalid");

//     msgName.classList.remove("d-none");
//     return false;
//   }
// }

// function validationPrice() {
//   var text = productPriceInput.value;
//   var regex = /^[1-9][0-9]*(\.[0-9]{1,2})?$/;
//   var msgPrice = document.getElementById("msgPrice");

//   if (regex.test(text)) {
//     productPriceInput.classList.add("is-valid");
//     productPriceInput.classList.remove("is-invalid");
//     msgPrice.classList.add("d-none");
//     return true;
//   } else {
//     productPriceInput.classList.add("is-invalid");
//     productPriceInput.classList.remove("is-valid");
//     msgPrice.classList.remove("d-none");
//     return false;
//   }
// }

// function validationCategory() {
//   var text = productCategoryInput.value;
//   var regex = /^(tv|mobile|screen|electronic)$/i;
//   var msgCategory = document.getElementById("msgCategory");
//   if (regex.test(text)) {
//     productCategoryInput.classList.add("is-valid");
//     productCategoryInput.classList.remove("is-invalid");
//     msgCategory.classList.add("d-none");

//     return true;
//   } else {
//     productCategoryInput.classList.add("is-invalid");
//     productCategoryInput.classList.remove("is-valid");
//     msgCategory.classList.remove("d-none");
//     return false;
//   }
// }

// function validationDescription() {
//   var text = productDescriptionInput.value;
//   var regex = /^[A-Za-z][A-Za-z0-9 .,]{9,}$/;
//   var msgDescription = document.getElementById("msgDescription");
//   if (regex.test(text)) {
//     productDescriptionInput.classList.add("is-valid");
//     productDescriptionInput.classList.remove("is-invalid");
//     msgDescription.classList.add("d-none");
//     return true;
//   } else {
//     productDescriptionInput.classList.add("is-invalid");
//     productDescriptionInput.classList.remove("is-valid");
//     msgDescription.classList.remove("d-none");
//     return false;
//   }
// }

function removeValidClasses() {
  document.getElementById("productName").classList.remove("is-valid");
  document.getElementById("productPrice").classList.remove("is-valid");
  document.getElementById("productCategory").classList.remove("is-valid");
  document.getElementById("productDescription").classList.remove("is-valid");
  document.getElementById("productImage").classList.remove("is-valid");
}

function validationInputs(element, msgId) {
  var text = element.value;
  var regex = {
    productName: /^[A-Za-z][A-Za-z0-9 ]{2,19}$/,
    productPrice: /^[1-9][0-9]*(\.[0-9]{1,2})?$/,
    productCategory: /^(tv|mobile|screen|electronic)$/i,
    productDescription: /^[A-Za-z][A-Za-z0-9 .,]{9,}$/,
  };
  var msg = document.getElementById(msgId);

  if (regex[element.id].test(text)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    msg.classList.add("d-none");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    msg.classList.remove("d-none");
    return false;
  }
}
