let nav_item=document.querySelectorAll(".nav-link");
let dropdown_menu=document.querySelector(".dropdown-menu");
let dropdown=document.querySelector(".dropdown");
let card_number=document.querySelector("#card-number");
let like_number=document.querySelector("#like-number");
let alert=document.querySelector("#sticky-alert");
nav_item.forEach(element => {
    element.addEventListener("mouseover",()=>{
        element.classList.add("text-info");
    })
    element.addEventListener("mouseout",()=>{
        element.classList.remove("text-info");
    })
});

dropdown.addEventListener("mouseover",()=>{
    dropdown_menu.style.display="block"
})
dropdown.addEventListener("mouseout",()=>{
    dropdown_menu.style.display="none"
})
//randome price
function randomPrice(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



//card and its data
// const options = {
    // 	method: 'GET',
    // 	headers: {
        // 		'x-rapidapi-key': '0bf6b1c9e2msh6941e38f15ae677p1a21cejsn7f9d228ea4d5',
        // 		'x-rapidapi-host': 'all-books-api.p.rapidapi.com'
        // 	}
        // };


let url="https://openlibrary.org/search.json?q=random_books&fields=title,author_name,publisher,isbn&limit=20";

let book_data=async ()=>{
    console.log("start")
    let response=await fetch(url);
    console.log("start")
  let data=await response.json();
  document.getElementById("card-container").innerHTML=``;

for(let key in data.docs){

     let card_container=document.getElementById("card-container");
     let element=document.createElement("div");
     element.classList.add("card","col-6","col-ms-3","col-sm-4","col-xl-2","p-2","border");
     
     let img=document.createElement("img");
    img.src=`https://covers.openlibrary.org/b/isbn/${data.docs[key].isbn[0]}-M.jpg`;
  
//       async function getBookData(bibkey){
//         const _path = `https://openlibrary.org/api/books?bibkeys=${bibkey}&format=json`;
//         const _response = await fetch(_path);
//         const data = await _response.json();
//         img.src = data[bibkey].thumbnail_url;
        
//     }
// getBookData(data.docs[key].isbn[0]);
    img.classList.add("card-img-top");
    img.setAttribute("height","200");
    img.alt="surver fail";
    
 
  
    
        
     let like_box=document.createElement("div");
     like_box.classList.add("position-absolute" ,"top-0", "end-0", "p-2")
     let like=document.createElement("i");
     like.classList.add("bi", "bi-heart",  "text-danger","card-like-button");
     like.style="font-size: 150%;font-weight: bolder;";
     like_box.appendChild(like);
     
     let card_body=document.createElement("div");
     card_body.classList.add("card-body");

     let card_title=document.createElement("h5");
     card_title.classList.add("card-title","text-primary");
     card_title.innerText=`${data.docs[key].title}`
     card_body.appendChild(card_title);

     let card_writer=document.createElement("p");
    card_writer.classList.add("card-text", 'bg-warning', 'text-bg-light');
    card_writer.innerText=`by ${data.docs[key].author_name[0]}`;
    card_body.appendChild(card_writer);

    let card_publisher=document.createElement("p");
    card_publisher.classList.add("card-text" ,"text-secondary");
    card_publisher.innerText=`Publish by : ${data.docs[key].publisher[0]}`;
    card_body.appendChild(card_publisher);
    
    let price=randomPrice(150,350);
    let card_price=document.createElement("h5");
    card_price.classList.add("bi" ,"bi-currency-rupee", "text-success");
    card_price.innerText=price;
    card_body.appendChild(card_price);
    
    let card_add=document.createElement("button");
    card_add.classList.add("btn", "btn-outline-dark", "btn-sm");
    card_add.innerText="+add";
    card_body.appendChild(card_add);


    let card_buy=document.createElement("a");
    card_buy.classList.add("btn", "btn-outline-success", "btn-sm");
    card_buy.innerText="Buy Now";
    card_buy.href="buy.html";
    card_body.appendChild(card_buy);
    
    
    element.appendChild(img);
    element.appendChild(like_box);
    element.appendChild(card_body);
    

    let like_items = JSON.parse(localStorage.getItem('like_items')) || [];
like_items.forEach((obj)=>{
if(obj.title==data.docs[key].title){
    like.classList.add("bi-heart-fill");
    like.classList.remove("bi-heart");
}
})
    like.addEventListener("click",()=>{
        like.classList.toggle("bi-heart-fill");
        like.classList.toggle("bi-heart");
      


        if(like.classList.contains("bi-heart-fill")){
            // let counter=localStorage.getItem("like_counter");
            // localStorage.setItem("like_counter",++counter);
            
            let obj={
                price:price,
                img:img.src,
                title:data.docs[key].title,
                author:data.docs[key].author_name[0],
                publisher:data.docs[key].publisher[0]
            }
            let like_items = JSON.parse(localStorage.getItem('like_items')) || [];
            like_items.push(obj);
            localStorage.setItem('like_items', JSON.stringify(like_items));

            like_number.innerText=like_items.length;
        }
        else{
            // let counter=localStorage.getItem("like_counter");
            // localStorage.setItem("like_counter",--counter);
            // like_number.innerText=`${localStorage.getItem("like_counter")}`;
            let like_items = JSON.parse(localStorage.getItem('like_items')) || [];
           
             like_items = like_items.filter(item => item.title !== data.docs[key].title);
                localStorage.setItem('like_items', JSON.stringify(like_items));
                like_number.innerText=like_items.length;
        }

 })

 card_add.addEventListener("click",()=>{
    let obj={
        price:price,
        img:img.src,
        title:data.docs[key].title,
        author:data.docs[key].author_name[0],
        publisher:data.docs[key].publisher[0]
    }
    let add_items = JSON.parse(localStorage.getItem('add_items')) || [];
           add_items.push(obj);
           console.log(add_items.length)
card_number.innerText=add_items.length;
            localStorage.setItem('add_items', JSON.stringify(add_items));
     
    alert.style="display:bock";
 })
 card_buy.addEventListener("click",()=>{
    let obj={
        price:price,
        img:img.src,
        title:data.docs[key].title,
        author:data.docs[key].author_name[0],
        publisher:data.docs[key].publisher[0]
    }
    let buy_items = JSON.parse(localStorage.getItem('buy_items')) || [];
           buy_items=obj;
            localStorage.setItem('buy_items', JSON.stringify(buy_items));
            // window.location.href = 'test2.html';
 })

    card_container.appendChild(element);
}
    
}
book_data();

let add_items = JSON.parse(localStorage.getItem('add_items')) || [];
card_number.innerText=add_items.length;
 

let like_items = JSON.parse(localStorage.getItem('like_items')) || [];
like_number.innerText=like_items.length;

let btn=document.getElementById("search_button")
btn.addEventListener("click",(e)=>{
    e.preventDefault();
    let key=document.getElementById("search_key").value;
localStorage.setItem("key",key);
window.location.href = 'more.html';
})
