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

//variables importantes (quiza luego las cambie de lugar)
const botonGuardar = document.getElementById("boton-guardar")
const filaColaborador = document.getElementById("fila-colaboradores")




//---------FUNCIONESSSSSS---------
//agregar a la tabla
function anadirColaborador(listaColaboradores){


    let colaboradores = ""

    //se crea una fila con celdas que usan los respectivos atributos de la variable colaborador
    for (let colaborador of listaColaboradores){
            colaboradores += `<tr>
                            <td>${colaborador.id}</td>
                            <td>${colaborador.nombre}</td>
                            <td>${colaborador.apellido}</td>
                            <td>${colaborador.cargo}</td>
                            <td>${colaborador.correo}</td>
                            </tr>`
    }
    filaColaborador.innerHTML = colaboradores
}

//funcion para validar campos, luego se le entrega un objeto con los parametros correspondientes
function validarCampo(input, errores, opciones) {
    if (input.value.trim() === "" || input.value.length > opciones.largo) {
        errores.push(`Ingrese un ${opciones.nombre} de 1 a ${opciones.largo} caracteres`)
    }

    //este es para el correo, si el objeto tiene regex, se valida como correo
    if (opciones.regex && !opciones.regex.test(input.value)) {
        errores.push(opciones.mensajeRegex)
    }
}

//activa el input de busqueda
document.getElementById("busqueda").addEventListener("input", filtrarTabla)

function filtrarTabla() {
    let inputFiltro = document.getElementById("busqueda").value.toLowerCase()

    let colaboradoresFiltrados = listaColaboradores.filter(colaborador => 
        colaborador.nombre.toLowerCase().includes(inputFiltro) ||
        colaborador.cargo.toLowerCase().includes(inputFiltro)
    )

    anadirColaborador(colaboradoresFiltrados)
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
    validarCampo(nombreInput,   erroresNombre,   { nombre: "nombre",   largo: 15 })
    validarCampo(apellidoInput, erroresApellido, { nombre: "apellido", largo: 15 })
    validarCampo(cargoInput,    erroresCargo,    { nombre: "cargo",    largo: 15 })

    validarCampo(correoInput, erroresCorreo, {
        nombre: "correo",
        largo: 50,
        regex: /^[a-zA-Z0-9._%+-]+@empresa\.cl$/,
        mensajeRegex: "Ingrese un correo con el formato esperado (abc@empresa.cl)"
    })


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
        id: listaColaboradores.length + 1,
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