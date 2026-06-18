function getCart(){return JSON.parse(localStorage.getItem('bigJoeCart')||'[]')}
function saveCart(cart){localStorage.setItem('bigJoeCart',JSON.stringify(cart));updateCartCount()}
function addToCart(name,price){let cart=getCart();let item=cart.find(p=>p.name===name);if(item){item.qty+=1}else{cart.push({name,price,qty:1})}saveCart(cart);alert(name+' added to cart')}
function updateCartCount(){let count=getCart().reduce((sum,i)=>sum+i.qty,0);document.querySelectorAll('.cart-count').forEach(el=>el.textContent=count)}
function renderCart(){let cart=getCart();let body=document.getElementById('cart-body');let totalEl=document.getElementById('cart-total');if(!body)return;body.innerHTML='';let total=0;cart.forEach((item,index)=>{let line=item.price*item.qty;total+=line;body.innerHTML+=`<tr><td>${item.name}</td><td><button onclick="changeQty(${index},-1)">-</button> ${item.qty} <button onclick="changeQty(${index},1)">+</button></td><td>R${item.price.toFixed(2)}</td><td>R${line.toFixed(2)}</td><td><button class="btn" onclick="removeItem(${index})">Remove</button></td></tr>`});totalEl.textContent='R'+total.toFixed(2)}
function changeQty(index,amount){let cart=getCart();cart[index].qty+=amount;if(cart[index].qty<=0)cart.splice(index,1);saveCart(cart);renderCart()}
function removeItem(index){let cart=getCart();cart.splice(index,1);saveCart(cart);renderCart()}
function placeOrder(){let cart=getCart();if(cart.length===0){alert('Your cart is empty');return}localStorage.removeItem('bigJoeCart');alert('Order placed successfully! Your order number is BJ'+Math.floor(Math.random()*9000+1000));window.location='orders.html'}
function searchMenu(){let input=document.getElementById('menu-search');if(!input)return;let filter=input.value.toLowerCase();document.querySelectorAll('.menu-item').forEach(card=>{card.style.display=card.innerText.toLowerCase().includes(filter)?'block':'none'})}
document.addEventListener('DOMContentLoaded',()=>{updateCartCount();renderCart()})
