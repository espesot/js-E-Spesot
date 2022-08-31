import { Ingresante, validarIngresante } from "./ingresanteClass.js"

//---------- Aplicamos operador OR
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


            Swal.fire({
                title: 'Confirma',
                text: "Confirma que desea crear un nuevo Alumno?",
                icon: 'info',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {

                    ingresantes.push(new Ingresante(NuevoIngresante.nombre, NuevoIngresante.apellido, NuevoIngresante.dni, NuevoIngresante.email, NuevoIngresante.fnacimiento))

                    //guardamos en el sesionStorage el ingresante
                    sessionStorage.setItem('Ingresantes', JSON.stringify(ingresantes))

                    ingresantes.lenght != 0 ? dibujarListaIngresantes(ingresantes) : console.info("no hay ingresante par dibujar")
                    //dibujarListaIngresantes(ingresantes)

                    //se limpia el formulario
                    document.querySelector('#nomIns').value = ""
                    document.querySelector('#Ape').value = ""
                    document.querySelector('#dni').value = ""
                    document.querySelector('#mail').value = ""
                    document.querySelector('#date').value = ""
                    Swal.fire(
                        'Creado',
                        'Se a Registrado un nuevo Alumno',
                        'success'
                    )
                }
            })


        } else {
            Swal.fire({
                title: 'Error!',
                text: 'DNI o Mail Repetido!!',
                icon: 'error',
                confirmButtonText: 'Back'
            })
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

//--------- se aplica ternario
ingresantes.lenght != 0 ? dibujarListaIngresantes(ingresantes) : console.error("no hay ingresante para dibujar")
