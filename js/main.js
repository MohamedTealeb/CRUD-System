var productNameInput = document.getElementById('productName');
var productCategotyInput = document.getElementById('productCategory');
var producPriceInput = document.getElementById('productPrice');
var productDescriptioneInput = document.getElementById('productDescription');

var productcontainer = [];
var currentIndex = null; 

if (localStorage.getItem('products') != null) {
    productcontainer = JSON.parse(localStorage.getItem('products'));
}

function addproduct() {
    var productobj = {
        name: productNameInput.value,
        category: productCategotyInput.value,
        price: producPriceInput.value,
        description: productDescriptioneInput.value,
    };

    if (currentIndex === null) {
        productcontainer.push(productobj); 
    } else {
        productcontainer[currentIndex] = productobj;
        currentIndex = null; 
    }

    display();
    localStorage.setItem('products', JSON.stringify(productcontainer));
    clearInput();
}

function display() {
    var cartona = ``;
    for (var i = 0; i < productcontainer.length; i++) {
        cartona += `
<tr>
<td>${i + 1}</td>
<td>${productcontainer[i].name}</td>
<td>${productcontainer[i].category}</td>
<td>${productcontainer[i].price}</td>
<td>${productcontainer[i].description}</td>
<td><button onclick="deleteitem(${i})" class="btn btn-danger btn-sm">Delete</button></td>
<td><button onclick="edititem(${i})" class="btn btn-success btn-sm">Update</button></td>
</tr>
`;
    }
    document.getElementById('tbody').innerHTML = cartona;
}

function edititem(index) {
    currentIndex = index; 
    var product = productcontainer[index];
    productNameInput.value = product.name;
    productCategotyInput.value = product.category;
    producPriceInput.value = product.price;
    productDescriptioneInput.value = product.description;
}

function clearInput() {
    productNameInput.value = "";
    productCategotyInput.value = "";
    producPriceInput.value = "";
    productDescriptioneInput.value = "";
}

function deleteitem(index) {
    productcontainer.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(productcontainer));
    display();
}

function search() {
    var searchInput = document.getElementById('searchInput').value.toLowerCase();
    var searchResult = ``;

    for (var i = 0; i < productcontainer.length; i++) {
        if (productcontainer[i].name.toLowerCase().includes(searchInput)) {
            var highlightedName = productcontainer[i].name.replace(
                new RegExp(searchInput, 'gi'),
                (match) => `<span class="highlight">${match}</span>`
            );
            searchResult += `
        <tr>
<td>${i + 1}</td>
<td>${highlightedName}</td>
<td>${productcontainer[i].category}</td>
<td>${productcontainer[i].price}</td>
<td>${productcontainer[i].description}</td>
<td><button onclick="deleteitem(${i})" class="btn btn-danger btn-sm">Delete</button></td>
<td><button onclick="edititem(${i})" class="btn btn-success btn-sm">Update</button></td>
</tr>`;
        }
    }
    document.getElementById('tbody').innerHTML = searchResult;
}

display();
