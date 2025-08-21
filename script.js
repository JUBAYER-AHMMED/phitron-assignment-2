const input = document.getElementById("input1");
const btn = document.getElementById("btn1");
const productContainer = document.getElementById("product-container");
const cartContainer = document.getElementById("cart-container2");
const detailContainer = document.getElementById("detail-container");
const close = document.getElementsByClassName("close");

const total = document.getElementById('totalItems');

btn.addEventListener("click", async () => {
  const inputValue = input.value;
  //   console.log(inputValue.length);

  if (inputValue.length == 1) {
    await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputValue}`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.drinks);
        //   console.log(typeof(data.meals));
        displayProducts(data.drinks);
      });
  } else if (inputValue.length > 1) {
    await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`
    )
      .then((response) => response.json())
      .then((data) => {
        //   console.log(typeof(data.meals));
        displayProducts(data.drinks);
      });
  }
  input.value = "";
});

const displayProducts = (products) => {
  productContainer.innerHTML = ""; // clear previous results

  if (!products) {
    productContainer.innerHTML = `<p class="NoMealFound">No drinks found!</p>`;
    return;
  }

  products.forEach((product) => {
    const div = document.createElement("div");
    div.classList.add("drink-box");

    const desc = product.strInstructions.slice(0, 15);

    div.innerHTML = `
      <img src=${product.strDrinkThumb} class="drink-img" />
      <h2 class='drinkName'>Glass: ${product.strGlass}</h2>
      <h4 class='category'>Category: ${product.strCategory}</h4>
      <p class='Instructions'>Instructions: ${desc}</p>
      <button class="btn add-cart">Add to Cart</button>
      <button class="btn details-btn">Details</button>
    `;

    
    div.querySelector(".add-cart").addEventListener("click", () => {
      handleAddToCart(product);
    });
    div.querySelector(".details-btn").addEventListener("click", () => {
      showDetails(product);
    });

    productContainer.appendChild(div);
    total.innerText = count;
  });
};
let count = 0;
function handleAddToCart(obj){
    console.log(obj);
    count++;
     total.innerText = count;
    const div = document.createElement("div");
    div.classList.add("rows");
// console.log(count)
if(count <8){
    div.innerHTML = `
       
          <div class="sl">${count}</div>
          <div><img class="image" src="${obj.strDrinkThumb}" /></div>
          <div class="name">${obj.strGlass}</div>
      `
      cartContainer.appendChild(div);}
      else{
        alert('More than 7 Items!!')
      }
}

// function showDetails(drink) {
//   console.log(drink);
//   const div = document.createElement("div");
//   div.classList.add("drink-box-detail");

//   div.innerHTML = `
//   <div class="top"><h2 class='drinkName'>Glass: ${drink.strGlass}</h2>
//   <i class="fa-solid fa-xmark close" onclick=""></i>
//     </div>
//           <hr>
//     <div class="detailselmt"><img src=${drink.strDrinkThumb} class="drink-img-detail" />
//     <h3 class="dt">Details</h3>
//     <h3 class="category2">Category: <span class="bold">${drink.strCategory}</span> </h3>
//     <h4 class="alc">Alcoholic: <span class="bold">${drink.strAlcoholic}</span></h4>
//     <p class="para">${drink.strInstructions}</p></div>
//     `;
//   detailContainer.appendChild(div);

//   div.querySelector(".close").addEventListener("click", () => {
//       removeDetails(div);
//     });
// }

function showDetails(drink) {
  
  detailContainer.innerHTML = "";

  const overlay = document.createElement("div");
  overlay.classList.add("detail-overlay");

  const div = document.createElement("div");
  div.classList.add("drink-box-detail");

  div.innerHTML = `
    <div class="top">
      <h2 class='drinkName'>Glass: ${drink.strGlass}</h2>
      <i class="fa-solid fa-xmark close"></i>
    </div>
    <hr>
    <div class="detailselmt">
      <img src=${drink.strDrinkThumb} class="drink-img-detail" />
      <h3 class="dt">Details</h3>
      <h3 class="category2">Category: <span class="bold">${drink.strCategory}</span></h3>
      <h4 class="alc">Alcoholic: <span class="bold">${drink.strAlcoholic}</span></h4>
      <p class="para">${drink.strInstructions}</p>
    </div>
  `;

  div.querySelector(".close").addEventListener("click", () => {
    overlay.remove();
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });

  overlay.appendChild(div);
  detailContainer.appendChild(overlay);
}

document.addEventListener("DOMContentLoaded", async () => {
  await fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a")
    .then((response) => response.json())
    .then((data) => {
      displayProducts(data.drinks);
    });
});