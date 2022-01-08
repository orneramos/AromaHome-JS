let contadorCarrito = JSON.parse(localStorage.getItem('contador'))
let carritoDeCompras = JSON.parse(localStorage.getItem('productos'))
let total = JSON.parse(localStorage.getItem('total'))

$(() => {
    //mostrar productos a comprar y total
    if(localStorage.getItem('productos')) {
        $("#spanContadorCarrito").text(`${contadorCarrito}`)
        carritoDeCompras.forEach(producto => {
            $("#listaProductos").append(
            `
            <li class="list-group-item d-flex justify-content-between lh-sm">
                <div>
                    <h6 class="my-0">${producto.tipo}</h6>
                    <small class="text-muted">${producto.fragancia}</small>
                </div>
                <span class="text-muted">${producto.cantidad} x $${producto.precio}</span>
            </li>
            `
            )
        })
        $("#listaProductos").append(`
            </li>
                <li class="list-group-item d-flex justify-content-between">
                <span>Total:</span>
                <strong>$${total}</strong>
            </li>`
        )
    } else {
        $("#spanContadorCarrito").text(0)
    }

    // formulario datos de envio y compra
    $("#formularioCompra").submit((e) => {
        e.preventDefault()
    })
    
    //POST
    $("#btn-finalizarCompra").on('click', () => {
        $.post("https://jsonplaceholder.typicode.com/posts", JSON.stringify(carritoDeCompras), function(data, estado) {
            console.log(data, estado)
            if(estado){
               $("#mensajeConfirmacionCompra").append("<h5>Su compra se ha ejecutado correctamente, a la brevedad prepararemos su pedido para ser enviado</h5>") 
               $("#contenedorForm").fadeOut()
               localStorage.clear()
            }
        })
    })
})
