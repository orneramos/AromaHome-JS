const validateMail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

let contadorCarrito = JSON.parse(localStorage.getItem('contador'))
let carritoDeCompras = JSON.parse(localStorage.getItem('productos'))
let total = JSON.parse(localStorage.getItem('total'))

$(() => {
    //mostrar productos a comprar y total
    if (localStorage.getItem('productos')) {
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
        $("#contenedorForm").remove()
        $("h4").remove()
    }

    // formulario datos de compra y envio
    $("#formularioCompra").submit((e) => {
        e.preventDefault()

        //form validation
        let isValid = true
        let email = $("#email").val()
        
        $(".invalid-feedback").hide()

        if (!validateMail.test(email)) {
            $("#errorEmail").show()
            isValid = false
        } 
        if ($('#firstName').val() == '') {
            $("#errorFirstName").show()
            isValid = false
        }
        if ($('#lastName').val() == '') {
            $("#errorLastName").show()
            isValid = false
        } 
        if ($('#address').val() == '') {
            $("#errorAddress").show()
            isValid = false
        } 
        if ($('#city').val() == '') {
            $("#errorCity").show()
            isValid = false
        } 
        if ($('#cc-name').val() == '') {
            $("#errorNombreTarjeta").show()
            isValid = false
        } 
        if ($('#cc-number').val() == '') {
            $("#errorNumeroTarjeta").show()
            isValid = false
        } 
        if ($('#cc-cvv').val() == '') {
            $("#errorCodigoTarjeta").show()
            isValid = false
        } 
        //POST
        if (isValid) {
            $.post("https://jsonplaceholder.typicode.com/posts", JSON.stringify(carritoDeCompras), function(data, estado) {
                if (estado) {
                $("#mensajeConfirmacionCompra").append("<h5>Su compra se ha ejecutado correctamente, a la brevedad prepararemos su pedido para ser enviado</h5>") 
                $("#contenedorForm").fadeOut()
                localStorage.clear()
                }
            })
        }
    })
})
