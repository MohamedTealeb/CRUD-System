var productNameInput=document.getElementById('productName')
var productCategotyInput=document.getElementById('productCategory')
var producPriceInput=document.getElementById('productPrice')
var productDescriptioneInput=document.getElementById('productDescription')

var productcontainer=[]
if(localStorage.getItem('products')!=null){
    productcontainer= JSON.parse( localStorage.getItem('products'))
}
function addproduct(){
   
    var productobj={
        name:productNameInput.value,
        category:productCategotyInput.value,
        price:producPriceInput.value,
        description:productDescriptioneInput.value,
    
    }
    productcontainer.push(productobj)
    display()
   localStorage.setItem('products',JSON.stringify(productcontainer))
   clearInput()

}
function display(){

var cartona=``
for(var i=0;i<productcontainer.length;i++){
cartona+=`
<tr>
<td>${i+1}</td>
<td>${productcontainer[i].name}</td>
<td>${productcontainer[i].category}</td>
<td>${productcontainer[i].price}</td>
<td>${productcontainer[i].description}</td>
<td><button onclick="deleteitem(${i})"  class="btn btn-danger btn-sm">Delete</button></td>
<td><button class="btn btn-success btn-sm">Update</button></td>
</tr>
`
}
document.getElementById('tbody').innerHTML=cartona

}
display()
function clearInput(){
    productNameInput.value="";
    productCategotyInput.value="";
    producPriceInput.value="";
    productDescriptioneInput.value="";
}
function deleteitem(Index){
productcontainer.splice(Index,1)
localStorage.setItem('products',JSON.stringify(productcontainer))
display()
}
function search(){
var search_5=document.getElementById('searchInput').value
var box2=``
for(var i=0;i<productcontainer.length;i++){
    if(productcontainer[i].productNameInput.includes(search_5)){
        console.log("yes",i);
        box2+=`
        <tr>
<td>${i+1}</td>
<td>${productcontainer[i].name}</td>
<td>${productcontainer[i].category}</td>
<td>${productcontainer[i].price}</td>
<td>${productcontainer[i].description}</td>
<td><button onclick="deleteitem(${i})"  class="btn btn-danger btn-sm">Delete</button></td>
<td><button class="btn btn-success btn-sm">Update</button></td>
</tr>`
    }
}
document.getElementById('tbody').innerHTML=box2
}