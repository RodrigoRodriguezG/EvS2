//variables para los colaboradores
const nombreInput = document.getElementById("nombre")
const apellidoInput = document.getElementById("apellido")
const cargoInput = document.getElementById("cargo")
const correoInput = document.getElementById("correo")
let listaColaboradores = []

//Variables de los divs para adjuntar errores
const errorNombre = document.getElementById("error-nombre")
const errorApellido = document.getElementById("error-apellido")
const errorCargo = document.getElementById("error-cargo")
const errorCorreo = document.getElementById("error-correo")

//boton xd
const botonGuardar = document.getElementById("boton-guardar")



function anadirColaborador(listaColaboradores){
    const filaColaborador = document.getElementById("fila-colaboradores")

    let colaboradores = ""
    for (let colaborador of listaColaboradores){
            colaboradores += `<tr><td>${colaborador.nombre}</td>
                            <td>${colaborador.apellido}</td>
                            <td>${colaborador.cargo}</td>
                            <td>${colaborador.correo}</td></tr>`
    }
    filaColaborador.innerHTML = colaboradores
}




botonGuardar.addEventListener("click", (e) => {
    //prevenir que se recargue la pagina al dar click
    e.preventDefault()

    //listas mensajes de error
    let erroresNombre = []
    let erroresApellido = []
    let erroresCargo = []
    let erroresCorreo = []
    
    //Limpiar los campos antes de volver a validar
    errorNombre.innerText = ""
    errorApellido.innerText = ""
    errorCargo.innerText = ""
    errorCorreo.innerText = ""


    //Validaciones por largo, se añade el error a la lista correspondiente 
    if (nombreInput.value.trim() === "" || nombreInput.value.length > 15){
        erroresNombre.push("Ingrese un nombre de 1 a 15 caracteres")
    }
    if (apellidoInput.value.trim() === "" || apellidoInput.value.length > 15){
        erroresApellido.push("Ingrese un apellido de 1 a 15 caracteres")
    }
    if (cargoInput.value.trim() === "" || cargoInput.value.length > 15){
        erroresCargo.push("Ingrese un cargo de 1 a 15 caracteres")
    }

    const regexCorreo = /^[a-zA-Z0-9._%+-]+@empresa\.cl$/
    if (correoInput.value.trim() === "" || !regexCorreo.test(correoInput.value)) {
        erroresCorreo.push("Ingrese un correo con el formato esperado (abc@empresa.cl)")
    }


    //Si se detectan errores en las listas, se envian al div correspondiente separados por una coma 
    //(no se hasta que punto me sirva la coma porque por ahora solo es una validacion por campo pero ajá)
    if (erroresNombre.length > 0) {
        errorNombre.innerText = erroresNombre.join(", ")
    }
    if (erroresApellido.length > 0) {
        errorApellido.innerText = erroresApellido.join(", ")
    }
    if (erroresCargo.length > 0) {
        errorCargo.innerText = erroresCargo.join(", ")
    }
    if (erroresCorreo.length > 0) {
        errorCorreo.innerText = erroresCorreo.join(", ")
    }

    //se interrumpe el registro si se detecta una lista con error
    if (erroresNombre.length > 0 || erroresApellido.length > 0 || 
        erroresCargo.length > 0 || erroresCorreo.length > 0) {
        return
    }

    //si los inputs son validos, creamos un colaborador como objeto con los inputs como valores
    let colaboradorNuevo = {
        nombre: nombreInput.value.trim(),
        apellido: apellidoInput.value.trim(),
        cargo: cargoInput.value.trim(),
        correo: correoInput.value.trim()
    }

    //se añade a la lista y se muestra en consola para verificar
    listaColaboradores.push(colaboradorNuevo)
    console.log("Colaboradores:",listaColaboradores)

    anadirColaborador(listaColaboradores)

})