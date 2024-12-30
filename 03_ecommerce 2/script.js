document.addEventListener('DOMContentLoaded', () => {
    const Products = [
        {
            id: 1,
            name: 'Product 1',
            price: 29.99
        },
        {
            id: 2,
            name: 'Product 2',
            price: 49.99
        },
        {
            id: 3,
            name: 'Product 3',
            price: 69.99
        },
        {
            id: 4,
            name: 'Product 4',
            price: 19.99
        },
        {
            id: 5,
            name: 'Product 5',
            price: 59.99
        }
    ];
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const ProductList = document.getElementById('product-list')
    const cartItems = document.getElementById('cart-items')
    const emptyCartMessage = document.getElementById('empty-cart')
    const cartTotal = document.getElementById('cart-total')
    const totalPrice = document.getElementById('total-price')
    const checkoutBtn = document.getElementById('checkout-btn')

    
    Products.forEach((product) => {
        const productDiv = document.createElement('div')
        productDiv.classList.add('product')
        productDiv.innerHTML = `<span>
       ${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id = "${product.id}">Add to cart</button>
        `
        ProductList.appendChild(productDiv)
    })

    ProductList.addEventListener('click', (e) => {
        if(e.target.tagName === 'BUTTON'){
            const productID = parseInt(e.target.getAttribute('data-id'));
            const product = Products.find((p) => p.id === productID)
            addToCart(product)
            renderCart()
            
        }
        saveTasks()
         
    })

    checkoutBtn.addEventListener('click', () => {
        checkout()
    })

   cartItems.addEventListener('click', (e) => {
   
        if(e.target.tagName === 'BUTTON'){
            let productID = parseInt(e.target.getAttribute('data-id'))
            let price = parseFloat(e.target.getAttribute('data-price'))
            let total = parseFloat(totalPrice.innerText.replace('$', ''));
            
            cart = cart.filter((item) => {
                return item.id !== productID;
            })
           
            
            e.target.parentNode.remove()
            total -= price
            totalPrice.innerText = `$${total.toFixed(2)}`
            saveCart()
            
        }
   })

    function renderCart() {
        cartItems.innerHTML = ''
        
        let TotalPrice = 0;
        if(cart.length > 0){
            emptyCartMessage.classList.add('hidden')
            cartTotal.classList.remove('hidden')
            cart.forEach((item, index) => {
                TotalPrice += item.price
                totalPrice.textContent = `$${TotalPrice.toFixed(2)}`
            
                
                const cartItem = document.createElement('div')
                cartItem.innerHTML = `<span>
                    ${item.name} - $${item.price.toFixed(2)}</span>
                    <button data-id = "${item.id}" data-price ="${item.price}" class='remove'>Remove</button>`
                cartItems.appendChild(cartItem)
                cartItem.style.display = 'flex'
                cartItem.style.justifyContent = 'space-between'
                cartItem.style.margin = '4px'
                 cartItem.style.padding = '4px'
                 
                 
            })
            saveCart()
            //saveTasks()
        }else{
            emptyCartMessage.classList.remove('hidden')
        }
    }

    function addToCart(product) {
        cart.push(product)
        
        saveCart()
    }
    
    function checkout() {
        cart.length = 0
        alert('Checkout done')
        renderCart()
        cartTotal.classList.add('hidden')
        emptyCartMessage.classList.remove('hidden')
        
        
    }

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart))
        let total = parseFloat(totalPrice.innerText.replace('$', ''));
        if(total === 0){
            emptyCartMessage.classList.remove('hidden')
            cartTotal.classList.add('hidden')
        }
        
        
    }
    renderCart()
})