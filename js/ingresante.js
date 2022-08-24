import { Ingresante, validarIngresante } from "./ingresanteClass.js"

const ingresantes = JSON.parse(sessionStorage.getItem('Ingresantes')) || []


// utilizamos el evento del boton para agregar los campos del formulario con id ingresante

document.querySelector('#fingresante').addEventListener('submit', (Event) => {
    Event.preventDefault()

    const NuevoIngresante = {
        nombre: Event.target[0].value,
        apellido: Event.target[1].value,
        dni: Event.target[2].value,
        email: Event.target[3].value,
        fnacimiento: Event.target[4].value,
    }
    console.log(NuevoIngresante)
    if (NuevoIngresante.nombre && NuevoIngresante.apellido && NuevoIngresante.dni && NuevoIngresante.email && NuevoIngresante.fnacimiento) {
        
        //añadimos el ingresante a la clase
        if (validarIngresante(ingresantes, NuevoIngresante) === true) {

            ingresantes.push(new Ingresante(NuevoIngresante.nombre, NuevoIngresante.apellido, NuevoIngresante.dni, NuevoIngresante.email, NuevoIngresante.fnacimiento))

            //guardamos en el sesionStorage el ingresante
            sessionStorage.setItem('Ingresantes', JSON.stringify(ingresantes))
            dibujarListaIngresantes(ingresantes)
            //se limpia el formulario
            document.querySelector('#nomIns').value = ""
            document.querySelector('#Ape').value = ""
            document.querySelector('#dni').value = ""
            document.querySelector('#mail').value = ""
            document.querySelector('#date').value = ""
            //alerte de exito de ingreso
        } else {
            alert("Atención... DNI o Mail repetido!!!")
        }
    } else {
        alert("Debe Completar Todos los Campos")
    }



})

const dibujarListaIngresantes = (ingresantes) => {
    let data = ""

    ingresantes.forEach((ingresante, index) => {
        data += `<tr>
                     <th scope="row">${index + 1}</th>
         		    <td>${ingresante.nombre}</td>
         		    <td>${ingresante.apellido}</td>
         	    	<td>${ingresante.dni}</td>
         	    	<td>${ingresante.email}</td>
         	    	<td>${ingresante.fnacimiento}</td>
                 </tr>
        `

    });
    document.querySelector('#ingresante').innerHTML = data

}

if (ingresantes.lenght != 0) {
    dibujarListaIngresantes(ingresantes)
}