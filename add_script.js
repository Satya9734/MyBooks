let a=document.getElementById("card_item_container");
let add_number=document.getElementById("card-number");
let like_number=document.getElementById("like-number");
let list=document.getElementById("list_books");
let money=document.getElementById("money");
let book_count=document.getElementById("book_count");
let fillcards=()=>{
   
  let add_items = JSON.parse(localStorage.getItem('add_items')) || [];
add_items.forEach(element => {
  

    let e=document.createElement("div");
    e.classList.add("card", "mb-3");
    e.style="max-width: 540px;"
    e.innerHTML=`
    <div class="row g-0">
                  <div class="col-4">
                    <img src="${element.img}" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-8">
                    <div class="card-body">
                      <h5 class="card-title text-primary">${element.title}</h5>
                      <p class="card-text bg-warning">${element.author}</p>
                      <p class="card-text text-secondary">${element.publisher}</p>
                      <i class="bi bi-currency-rupee text-success">${element.price}</i>
                      <div class="d-flex justify-content-end">
                        <button class="btn btn-danger btn-sm" onclick="removeCard(this)" id="remove">Remove</button> 
                        </div>
                    </div>
                  </div>
                  </div>
                  `
a.appendChild(e)


})
}

let removeCard=(button)=>{
    const card = button.closest('.card');
     if (card) { card.remove(); }

     var cardTitle = button.closest('.card-body').querySelector('.card-title').textContent; 
    //  console.log(cardTitle);

     let add_items = JSON.parse(localStorage.getItem('add_items')) || [];
           
             add_items = add_items.filter(item => item.title !== cardTitle);
                localStorage.setItem('add_items', JSON.stringify(add_items));
                add_number.innerText=add_items.length;
                list.innerHTML=``;
                order();      
                a.innerHTML=``
                fillcards();
}

fillcards();

let add_items = JSON.parse(localStorage.getItem('add_items')) || [];
add_number.innerText=add_items.length;

let like_items = JSON.parse(localStorage.getItem('like_items')) || [];
like_number.innerText=like_items.length;

if(add_items.length!=0){
    document.getElementById("no_card_item").style="display:none;";
}


let order=()=>{
    let add_items = JSON.parse(localStorage.getItem('add_items')) || [];
    console.log(add_items.length)
    let counter=0;
    let amount=0;
    add_items.forEach((element)=>{
        
        let l=document.createElement("li");
        l.classList.add("list-group-item");
        l.innerText=`${++counter}-->${element.title}`;
        list.appendChild(l);
        amount+=element.price;
    })
    money.innerText=amount;
    book_count.innerText=add_items.length;
   
}
order();


let nav_item=document.querySelectorAll(".nav-link");
nav_item.forEach(element => {
  element.addEventListener("mouseover",()=>{
      element.classList.add("text-info");
  })
  element.addEventListener("mouseout",()=>{
      element.classList.remove("text-info");
  })
});