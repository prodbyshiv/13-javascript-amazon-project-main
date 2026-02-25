import { cart,removeFromcart } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";
import  dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions } from "../data/deliveryoptions.js";
updateCartQuantity();


  console.log(dayjs());
  const today = dayjs();

  const deliveryDate = today.add(7,'days');
  
  console.log(deliveryDate.format('dddd,MMMM D' )); // format() date ko easy to read format me dega.
  
   

let cartPageHTML = '';
cart.forEach((cartItem)=>{
    // now we will use product id to get the cartItem remaining property from products.js
    let matchingItem;
    products.forEach((product)=>{
        if (product.id===cartItem.productId) {
            matchingItem = product;
        }
    });
    ///// ye part samjhao kya ho rha hai ? why we need id ? ///////////////////////////////////////
    const deliveryOptionsId = cartItem.deliveryOptionsid

    let deliveryOption;
    deliveryOptions.forEach((option)=>{
      if (option.id === deliveryOptionsId) {
        deliveryOption = option;
      }
    });

  const today = dayjs();
const deliveryDate = today.add(deliveryOption.deliveryDays
  ,'days'
);
const dateStrings = deliveryDate.format(
  'dddd, MMMM D'
  );
/////////////////////////////////////////////////
     cartPageHTML += `
    <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
            <div class="delivery-date">
              Delivery date: ${dateStrings}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src=${matchingItem.image}>

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingItem.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingItem.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity" 
                  data-product-id = ${matchingItem.id}>
                    Update
                    
                  </span>
                  <input class="quantity-input">
                  <span class=" save-quantity-link">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-quantity-link"
                  data-product-id = ${matchingItem.id}>
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                
                ${deliveryOptionsHTML(matchingItem,cartItem)}
                
              </div>
            </div>
          </div>
    `
});

function deliveryOptionsHTML(matchingItem,cartItem) {
  let html = '';
 
  deliveryOptions.forEach((deliveryOption)=>{
     const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays
    ,'days'
  );
  const dateStrings = deliveryDate.format(
    'dddd, MMMM D'
  );
 const priceStrings = deliveryOption.priceCents 
 ===0 
 ? 'FREE'
 : `$${formatCurrency(deliveryOption.priceCents)} - `;

  const isChecked = deliveryOption.id ===
  cartItem.deliveryOptionsid;
   html += `
        <div class="delivery-option">
              <input type="radio"
              ${isChecked ? 'checked' : ''}
                class="delivery-option-input"
                name="delivery-option-${matchingItem.id}">
              <div>
                <div class="delivery-option-date">
                  ${dateStrings}
                </div>
                <div class="delivery-option-price">
                  ${priceStrings} Shipping
                </div>
              </div>
            </div>
    `
  });
  return html;
  
}
document.querySelector('.js-order-summary').innerHTML = cartPageHTML;
// console.log(cartPageHTML);

document.querySelectorAll('.js-delete-quantity-link')
.forEach((link)=>{
  link.addEventListener('click', ()=>{
    const productID = link.dataset.productId;
    removeFromcart(productID);
  const container = document.querySelector(`.js-cart-item-container-${productID}`);
    
    
    container.remove();

    updateCartQuantity();
  });
});
  function updateCartQuantity() {
    let cartQuantity = 0;

      cart.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });

      document.querySelector('.js-checkout-quantity')
        .innerHTML = `Checkout (${cartQuantity} items) `;
  }
  
    document.querySelectorAll('.js-update-quantity')
    .forEach((update)=>{
      update.addEventListener('click',()=>{
        const productId = update.dataset.productId;
        console.log(productId);
        
      })
    })

        
  
 
      