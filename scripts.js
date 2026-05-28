//variables para los colaboradores
const nombreInput = document.getElementById("nombre")
const apellidoInput = document.getElementById("apellido")
const cargoInput = document.getElementById("cargo")
const correoInput = document.getElementById("correo")
let listaColaboradores = []
let contadorId = 1

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
                                <td><button onclick="eliminarColaborador(${colaborador.id})">Eliminar</button></td>
                              </tr>`
    }
    filaColaborador.innerHTML = colaboradores
}

//funcion para validar campos, luego se le entrega un objeto con los parametros correspondientes
function validarCampo(input, errores, opciones) {
    //Validaciones por largo, se añade el error a la lista correspondiente 
    if (input.value.trim() === "" || input.value.length > opciones.largo) {
        errores.push(`Ingrese un ${opciones.nombre} de 1 a ${opciones.largo} caracteres`)
    }

    // valida caracteres permitidos (letras, tildes, espacios)
    if (opciones.regexCampo && !opciones.regexCampo.test(input.value.trim())) {
        errores.push(`El campo ${opciones.nombre} solo permite letras`)
    }

    //este es para el correo, si el objeto tiene regex, se valida como correo
    if (opciones.regex && !opciones.regex.test(input.value)) {
        errores.push(opciones.mensajeRegex)
    }
    
    //verifica si el correo ya existe en la lista de colaboradores
    if (listaColaboradores.some(c => c.correo === input.value.toLowerCase().trim())) {
        errores.push(`El correo ${input.value} ya existe`)
    }
}

function textErrores(erroresCampo, errorCampo){
    //Si se detectan errores en las listas, se envian al div correspondiente separados por una coma 
    //(no se hasta que punto me sirva la coma porque por ahora solo es una validacion por campo pero ajá)
        if (erroresCampo.length > 0) {
        errorCampo.innerText = erroresCampo.join(", ")
    }
}

//activa el input de busqueda
document.getElementById("busqueda").addEventListener("input", filtrarTabla)

function filtrarTabla() {
    //input en minuscula
    let inputFiltro = document.getElementById("busqueda").value.toLowerCase()

    //filtra usando include con el input de filtro y en minuscula
    let colaboradoresFiltrados = listaColaboradores.filter(colaborador => 
        colaborador.nombre.toLowerCase().includes(inputFiltro) ||
        colaborador.cargo.toLowerCase().includes(inputFiltro)
    )

    //sobreescribe la tabla para mostrar solo los filtros, sin borrar los datos sin filtrar
    //entonces no es sobreescribir pero no se de que manera decirlo xd
    anadirColaborador(colaboradoresFiltrados)
}

function eliminarColaborador(id) {
    //devuleve la lista con todos menos el id seleccionado
    listaColaboradores = listaColaboradores.filter(colaborador => colaborador.id !== id)

    //actualiza la tabla para "borrar" el objeto con el id seleccionado
    anadirColaborador(listaColaboradores)
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

    //llamamos a la funcion de validar campos con su respectivo campos y parametros de objeto
    const regexSoloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ]+$/
    validarCampo(nombreInput, erroresNombre, {nombre: "nombre", largo: 15, regexCampo: regexSoloLetras})
    validarCampo(apellidoInput, erroresApellido, {nombre: "apellido", largo: 15, regexCampo: regexSoloLetras})
    validarCampo(cargoInput, erroresCargo, {nombre: "cargo", largo: 15, regexCampo: regexSoloLetras})

    validarCampo(correoInput, erroresCorreo, {
        nombre: "correo",
        largo: 50,
        //el correo sí puede tener números
        permitirNumeros: true, 
        regex: /^[a-zA-Z0-9._%+-]+@empresa\.cl$/,
        mensajeRegex: "Ingrese un correo con el formato esperado (abc@empresa.cl)"
    })

    //usamos la funcion de mostrar los textos de error
    textErrores(erroresNombre, errorNombre)
    textErrores(erroresApellido, errorApellido)
    textErrores(erroresCargo, errorCargo)
    textErrores(erroresCorreo, errorCorreo)


    //se interrumpe el registro si se detecta una lista con error
    if (erroresNombre.length > 0 || erroresApellido.length > 0 || 
        erroresCargo.length > 0 || erroresCorreo.length > 0) {
        return
    }
    //si los inputs son validos, creamos un colaborador como objeto con los inputs como valores


    let colaboradorNuevo = {
        //si no hay ningun colabordar registrado el id es 1
        id: contadorId++,
        nombre: nombreInput.value.trim(),
        apellido: apellidoInput.value.trim(),
        cargo: cargoInput.value.trim(),
        correo: correoInput.value.toLowerCase().trim()
    }

    //se añade a la lista y se muestra en consola para verificar
    listaColaboradores.push(colaboradorNuevo)
    console.log("Colaboradores:",listaColaboradores)

    anadirColaborador(listaColaboradores)

})