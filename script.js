let divProductos = document.getElementById("productos")
let divCarritoDeCompras = document.getElementById("carritoDeCompras")
let precioTotal = document.getElementById("precioTotal")
let contadorCarrito = document.getElementById("contador")

localStorage.setItem('contador', JSON.stringify(contadorCarrito.innerText))
localStorage.setItem('total', JSON.stringify(precioTotal.innerHTML))

let carritoDeCompras = []
let productosEnStock = []

//mostrar cards con productos en stock - tienda
$.getJSON('stock.json', function(data) {
    data.forEach(producto => productosEnStock.push(producto))
    mostrarProductos(productosEnStock)
})

function mostrarProductos(array){
    array.forEach(producto => {
        let div = document.createElement("div")
        div.classList.add("producto-item")
        div.innerHTML += `
        <div class="card m-5" style="width: 18rem;">
            <img src="${producto.url}" class="card-img-top" alt="imagen${producto.tipo}">
            <div class="card-body">
                <h5 class="card-title">${producto.tipo}</h5>
                <p>${producto.fragancia}</p>
                <p class="card-text">$${producto.precio}</p>
                <button class="btn btn-light" id="boton${producto.id}">Agregar al carrito</button>
            </div>
        </div>
        `
        divProductos.appendChild(div)
        // boton agregar al carrito
        let botonAgregar = document.getElementById(`boton${producto.id}`)
        botonAgregar.addEventListener('click', () => {
            agregarAlCarrito(producto.id)
        })
    });
} 

//localStorage: cuando inicia la pagina, si hay productos guardados en el localStorage, agregarlos al carrito 
checkLocalStorage()

function checkLocalStorage() {
    if (localStorage.getItem('productos')) {
        console.log(localStorage.getItem('productos').length)
        carritoDeCompras = JSON.parse(localStorage.getItem('productos'))
        //agregar html del carrito de los productos que estaban en el localStorage
        carritoDeCompras.forEach(productoAgregar => {
            let div = document.createElement("div")
            div.classList.add(`productoEnCarrito${productoAgregar.id}`)
            div.innerHTML = `
                <h5>${productoAgregar.tipo} ${productoAgregar.fragancia}</h5>
                <div class="grid">
                    <div class="cantidad d-flex">
                        <button class="btn btn-light" id="btnRestar${productoAgregar.id}">-</button>
                        <p id="cantidad${productoAgregar.id}">Cantidad: ${productoAgregar.cantidad}</p>
                        <button class="btn btn-light" id="btnSumar${productoAgregar.id}">+</button>
                    </div>
                    <p class="precio">$${productoAgregar.precio}</p>
                    <button id="btnEliminar${productoAgregar.id}" class="btn btn-light btn-eliminar"><i class="fas fa-trash-alt"></i></button>
                </div>
            ` 
            divCarritoDeCompras.appendChild(div)
            //restar cantidad
            let btnRestar = document.getElementById(`btnRestar${productoAgregar.id}`)
            btnRestar.addEventListener('click', () => {
                if (productoAgregar.cantidad > 1) {
                    productoAgregar.cantidad -= 1
                    document.getElementById(`cantidad${productoAgregar.id}`).innerHTML = 
                    `<p id="cantidad${productoAgregar.id}">Cantidad: ${productoAgregar.cantidad}</p>`
                    actualizarCarrito()
                }
            })
            //sumar cantidad
            let btnSumar = document.getElementById(`btnSumar${productoAgregar.id}`)
            btnSumar.addEventListener('click', () => {
                if (productoAgregar.cantidad < productoAgregar.stock) {
                    productoAgregar.cantidad += 1
                    document.getElementById(`cantidad${productoAgregar.id}`).innerHTML = 
                    `<p id="cantidad${productoAgregar.id}">Cantidad: ${productoAgregar.cantidad}</p>`
                    actualizarCarrito()
                }
            })
            //eliminar producto del carrito
            let botonEliminar = document.getElementById(`btnEliminar${productoAgregar.id}`)
            botonEliminar.addEventListener('click', () => {
                document.querySelector(`.productoEnCarrito${productoAgregar.id}`).remove()
                carritoDeCompras = carritoDeCompras.filter(element => element.id != productoAgregar.id)    
                actualizarCarrito()
            })
        });
        actualizarCarrito()
    } else {
        carritoDeCompras = []
    }
}

//agregar productos al carrito teniendo en cuenta si ya estaban. si es asi, unicamente sumar cantidad sino agregar todo el producto
function agregarAlCarrito(id) {
    //agregar productos al carrito
    let productoEnCarrito = carritoDeCompras.find(producto => producto.id == id)
    if (productoEnCarrito) {
        if (productoEnCarrito.cantidad < productoEnCarrito.stock) {
            productoEnCarrito.cantidad = productoEnCarrito.cantidad + 1
            document.getElementById(`cantidad${productoEnCarrito.id}`).innerHTML = 
            `<p id="cantidad${productoEnCarrito.id}">Cantidad: ${productoEnCarrito.cantidad}</p>`
        } else {
            alert("No queda stock del producto elegido")
        } 
    } else {
        let productoAgregar = productosEnStock.find(producto => producto.id == id)
        carritoDeCompras.push(productoAgregar)
        //crear y agregar el html del carrito
        let div = document.createElement("div")
        div.classList.add(`productoEnCarrito${productoAgregar.id}`)
        div.innerHTML = `
            <h5>${productoAgregar.tipo} ${productoAgregar.fragancia}</h5>
            <div class="grid">
                <div class="cantidad d-flex">
                    <button class="btn btn-light" id="btnRestar${productoAgregar.id}">-</button>
                    <p id="cantidad${productoAgregar.id}">Cantidad: ${productoAgregar.cantidad}</p>
                    <button class="btn btn-light" id="btnSumar${productoAgregar.id}">+</button>
                </div>
                <p class="precio">$${productoAgregar.precio}</p>
                <button id="btnEliminar${productoAgregar.id}" class="btn btn-light btn-eliminar"><i class="fas fa-trash-alt"></i></button>
            </div>
        ` 
        divCarritoDeCompras.appendChild(div)
        //restar cantidad
        let btnRestar = document.getElementById(`btnRestar${productoAgregar.id}`)
        console.log(btnRestar)
        btnRestar.addEventListener('click', () => {
            if (productoAgregar.cantidad > 1) {
                productoAgregar.cantidad -= 1
                console.log(productoAgregar.cantidad)
                document.getElementById(`cantidad${productoAgregar.id}`).innerHTML = 
                `<p id="cantidad${productoAgregar.id}">Cantidad: ${productoAgregar.cantidad}</p>`
                actualizarCarrito()
            }
        })
        //sumar cantidad
        let btnSumar = document.getElementById(`btnSumar${productoAgregar.id}`)
        btnSumar.addEventListener('click', () => {
            if (productoAgregar.cantidad < productoAgregar.stock) {
                productoAgregar.cantidad += 1
                console.log(productoAgregar.cantidad)
                document.getElementById(`cantidad${productoAgregar.id}`).innerHTML = 
                `<p id="cantidad${productoAgregar.id}">Cantidad: ${productoAgregar.cantidad}</p>`
                actualizarCarrito()
            }
        })
        // eliminar producto del carrito
        let botonEliminar = document.getElementById(`btnEliminar${productoAgregar.id}`)
        botonEliminar.addEventListener('click', () => {
            document.querySelector(`.productoEnCarrito${productoAgregar.id}`).remove()
            carritoDeCompras = carritoDeCompras.filter(element => element.id != productoAgregar.id)    
            actualizarCarrito()
        })
    }
    actualizarCarrito()
}

//actualizar cantidad de unidades en el carrito, precio total y actualizar localStorage
function actualizarCarrito() {
    contadorCarrito.innerText = carritoDeCompras.reduce((acc, el) => acc + el.cantidad, 0)
    precioTotal.innerText = carritoDeCompras.reduce((acc, el) => acc + (el.precio * el.cantidad), 0)
    localStorage.setItem('productos', JSON.stringify(carritoDeCompras))
    localStorage.setItem('contador', JSON.stringify(contadorCarrito.innerText))
    localStorage.setItem('total', JSON.stringify(precioTotal.innerHTML))
} 



    
