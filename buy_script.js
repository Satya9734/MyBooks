let card=document.querySelector(".card");
let like=document.getElementById("like-number");
let add=document.getElementById("card-number");
let nav_item=document.querySelectorAll(".nav-link");
nav_item.forEach(element => {
  element.addEventListener("mouseover",()=>{
      element.classList.add("text-info");
  })
  element.addEventListener("mouseout",()=>{
      element.classList.remove("text-info");
  })
});


let buy_items=JSON.parse(localStorage.getItem("buy_items"));
card.innerHTML=`
<img src="${buy_items.img}" class="card-img-top" alt="img not found" style="height:300px">
<div class="card-body">
<h5 class="card-title text-primary">${buy_items.title}</h5>
<p class="card-text bg-warning d-block">${buy_items.author}</p>
<span class='text-success fs-5'>Price : <span class="bi bi-currency-rupee text-success fs-5">${buy_items.price}</span></span>
</div>
 <div id="offer">
    <i class="bi bi-star-fill text-primary"> Free Delivery</i><br>
  <i class="bi bi-star-fill text-primary"> 7 Day Return Policy </i><br>
  <i class="bi bi-star-fill text-primary"> Cash on Delivery </i><br>
  
  </div>
`
let like_items=JSON.parse(localStorage.getItem("like_items")).length;
like.innerText=like_items;
let card_items=JSON.parse(localStorage.getItem("add_items")).length;
add.innerText=card_items;

