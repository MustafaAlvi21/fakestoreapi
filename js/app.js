let products = []
async function app() {
    await axios.get('https://fakestoreapi.com/products')
        .then(function (response) {
            // handle success
            console.log(response);
            // console.log(response.data[0]);
            products = response.data
            console.log(products);

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

    console.log("products =>>>> ");
    renderProducts()

}

function renderProducts() {
    products.forEach((product, index) => {
        console.log(index, product);
        document.querySelector("#store").innerHTML += `
        <div id="productCard" class="card col-lg-3 col-sm-6 mx-3" style="width: 100%;">
        <img class="card-img-top" src=${product.image} alt="Card image cap">
        <div class="card-body">
        <h5 class="card-title"> ${product.title} </h5>
            <p class="card-text"> ${product.description} </p>
            <a href="/detail.html?id=${product.id}" class="btn btn-primary">$ ${product.price} </a>
            </div>
            </div>
        `;

    });
}

async function getProductData() {
    myId = ""
    const params = new URLSearchParams(window.location.search)
    for (const param of params) {
        console.log(param)
        myId = param[1]
    }

    console.log("myId", myId);


    await axios.get(`https://fakestoreapi.com/products/${myId}`)
        .then(function (response) {
            // handle success
            console.log(response);
            // console.log(response.data[0]);
            const product = response.data
            var a = "ALI"
            console.log(product);
            document.querySelector("#itemData").innerHTML += `
                <div class="col-lg-6">
                        <!-- item img -->
                        <img src=${product.image} width="300px" alt="img">
                    </div>
                    <div class="col-lg-6">
                        <!-- item data -->

                        <div>
                            <h1>${product.title}</h1>
                            <div id="review">
                                <img src="https://cdn.pixabay.com/photo/2021/10/11/00/58/star-6699069__340.png" width="25px" alt="">
                            </div>
                            <h3 id="p1">$${product.price}</h3>
                            <p id="dec">${product.description}</p>
                        </div>
                        <div>
                            <button class="btn btn-success" onclick="addToCart(${product.id})"> Add to cart</button>
                        </div>
            </div>
            `
            // console.log(products);

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

    // itemData
}

async function addToCart(id) {
    console.log(id);
    await axios.get(`https://fakestoreapi.com/products/${id}`)
        .then(data => {
            console.log(data.data);

            cart = []
            item = data.data
            item.quantity = 1

            storageItems = JSON.parse(localStorage.getItem("cart"))
            console.log("storageItems", storageItems);

            if (storageItems == null) {
                // if storageItems null hay means koi data storage main save nahi hay to hum directly
                // localStorage main product save kerringay.
                cart.push(item)
                localStorage.setItem("cart", JSON.stringify(cart))
                alert("Added in cart")

            } else if (storageItems.length > 0) {
                // if storageItems null nahi hay means koi data storage main save hay to hum loop run ker k
                // pehle to storage main check kerringay k jo item storage main save kerna hay kia wo storage main pehle say hi
                // save hay ya nahi then agr storage main already save hay to uski quantity main +1 yani increament kerna hay
                // agr item storage main save nahi hay to usko simply save kerna hay

                let found = false
                storageItems.forEach((loopWalaItem, i) => {
                    if (parseInt(loopWalaItem.id) == parseInt(item.id)) {
                        found = true
                        storageItems[i].quantity += 1;
                        localStorage.setItem("cart", JSON.stringify(storageItems))
                    }
                });

                // agr item storage main save nahi hay to simply add kerre hain
                if (found == false) {
                    storageItems.push(item)
                    localStorage.setItem("cart", JSON.stringify(storageItems))
                }
                alert("Added in cart")
            }

        })
        .catch(e => console.log)

}


function fetchCart() {
    // firstly localStorage say cart items ko get kia 
    const storageItems = JSON.parse(localStorage.getItem("cart"))
    let total = 0;

    // secondly yahan hum cart k items ko loop ker k page pay show kerre hain
    storageItems.forEach(item => {
        document.querySelector("#cartData").innerHTML += `
            <div class="row itemRow py-3" style="border-top: 1px solid gray">
                <div class="col-3">
                    <img style="max-width: 100px;" src="${item.image}" alt="img">
                </div>
                <div class="col-3">
                    ${item.title}
                </div>
                <div class="col-3">
                    ${item.quantity}
                </div>
                <div class="col-3">
                    ${item.price} <button class="btn btn-danger" style="font-weight: 700;" onclick="deleteFromCart(${item.id})"> X </button>
                </div>
            </div>
        `
        // third yahan hum loop k under total sum kerre hain
        // means each item ki price ko multiply kerre hain uski quantity say or phir total main add kerre hain
        total += (item.price * item.quantity)
    
    });

    document.querySelector("#totalAmount").innerText = `$${total.toFixed(2)}`;
}


// yahan specific item ko delete kerre hain
function deleteFromCart(id) {

    // firstly localStorage say cart items ko get kia 
    const storageItems = JSON.parse(localStorage.getItem("cart"))
    
    // secondly jb cart page main kisi item k delete button ko click kia jai ga 
    // to uski id is function main as a parameter mile gi
    // phir hum cart k items ko loop ker match kerringay k kis item ki id match kerri hay parameter ki id say
    // jo id match hogi usko "splice" method k thriugh hum remove kerringay cart items main say or phir page reload hoga
    storageItems.forEach((loopWalaItem, i) => {
        if (parseInt(loopWalaItem.id) == id) {
            storageItems.splice(i,1)
            localStorage.setItem("cart", JSON.stringify(storageItems))
            window.location.reload()
        }
    });
}
