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

async function getProductData(id) {
    console.log(id);
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
                            <button class="btn btn-success"> Add to cart</button>
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

