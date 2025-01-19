let card_container=document.getElementById("card_container");
let card_number=document.getElementById("card-number");
let like_number=document.getElementById("like-number");

let nav_item=document.querySelectorAll(".nav-link");
nav_item.forEach(element => {
  element.addEventListener("mouseover",()=>{
      element.classList.add("text-info");
  })
  element.addEventListener("mouseout",()=>{
      element.classList.remove("text-info");
  })
});



let make_list=()=>{
    
let like_items = JSON.parse(localStorage.getItem('like_items')) || [];
like_items.forEach(element => {
    let div=document.createElement("div");
    div.classList.add("card","mb-3");
    div.innerHTML=`
          <div class="row g-0">
        <div class="col-4">
          <img src="${element.img}" class="img-fluid rounded-start" style="height:200px; width:170px" alt="...">
        </div>
        <div class="col-8 position-relative">
          <div class="card-body">
            <h5 class="card-title text-primary">${element.title}</h5>
            <p class="card-text text-bg-warning " style="display: inline-block; id="author" ">By ${element.author}</p>
            <p class="card-text"><small class="text-body-secondary">Publich By : ${element.publisher} </small></p>
            <i class="bi bi-currency-rupee card-text text-success fs-5">${element.price}</i><br>
             <a href="buy.html" class="btn btn-primary btn-sm" onclick="buy_now(this)">Buy Now</a>
          </div>
          <span class="position-absolute" style="right: 10px; top: 50%; transform: translateY(-50%); cursor: pointer;" id="delete_like" onclick="remove_like(this)">
            <i class="bi bi-trash fs-5"></i>
          </span>
        </div>
      </div>
    `

    card_container.appendChild(div);
});
}

make_list();

let remove_like=(button)=>{
  const card = button.closest('.card'); 
  let title = card.querySelector('.card-title').innerText;
  if (card) { card.remove(); }
console.log(title);
  let like_items = JSON.parse(localStorage.getItem('like_items')) || [];
    like_items = like_items.filter(item => item.title !== title);
    localStorage.setItem('like_items', JSON.stringify(like_items));
    count();
}

let buy_now=(btn)=>{
  const body = btn.closest('.card-body'); 
  let title=body.querySelector(".card-title").innerText;
  let price=body.querySelector(".bi").innerText;
  let author=body.querySelector(".text-bg-warning").innerText;
 let like_items = JSON.parse(localStorage.getItem('like_items')) || [];
 let img;
 like_items.forEach((e)=>{
  if(e.title==title){
    img=e.img;
  }
 })
 
  let obj={
    price:price,
    img:img,
    title:title,
    author:author,
    publisher:"..."
}
let buy_items = JSON.parse(localStorage.getItem('buy_items')) || [];
       buy_items=obj;
      localStorage.setItem('buy_items', JSON.stringify(buy_items));
}

let count=()=>{
  let like_items = JSON.parse(localStorage.getItem('like_items')) || [];
like_number.innerText=like_items.length;
  let add_items = JSON.parse(localStorage.getItem('add_items')) || [];
card_number.innerText=add_items.length;

}
count();
