class Alumno {
    constructor(nombre, nMatematica, nLengua, nHistoria) {
        this.nombre = nombre
        this.notas = [nMatematica, nLengua, nHistoria]
    }

    getNombre() {
        return this.nombre
    }

    getPromedio() {
        let total = 0
        this.notas.forEach((nota) => {
            total += nota
        })
        return this.nombre, total / 3
    }

    getNotas() {
        return this.notas
    }
    addAlumno(alumno) {
        this.alumno.push(alumno)
    }

}

const getAlumnos = async () => {
    try {
        const fetchData = await fetch('../src/json/alumnos.json')
        const jsonAlumnos = await fetchData.json()
        return jsonAlumnos
    } catch (error) {
        return error
    }
}


const jsonAlumnos = await getAlumnos()

const alumnos = [];
jsonAlumnos.Alumnos.forEach(alumno => {
    alumnos.push(new Alumno(alumno.nombre, alumno.notas.nMatematica, alumno.notas.nLengua, alumno.notas.nHistoria))
})


//Buscamos un ingresante para cargarle las notas..
let encontrado = "undefine"
let indexIngresante = "undefine"
const marca = document.querySelector('#resultadoBusqueda')

const ingresantes = JSON.parse(localStorage.getItem('Ingresantes')) || []
console.log(ingresantes)

document.querySelector('#busqueda').addEventListener('submit', (event) => {

    event.preventDefault()

    const dni = event.target[0].value
    console.log(dni)

    encontrado = ingresantes.find((ingresante) => {
        return ingresante.dni === dni
    })

    indexIngresante = ingresantes.findIndex((ingresante) => {
        return ingresante.dni == dni
    })

    encontrado != undefined ? console.log(encontrado) : console.error("no se encontro ningun alumno")

    if (encontrado != undefined) {
        marca.innerHTML = `El Alumno encontrado es: ${encontrado.nombre}`
    } else {
        marca.innerHTML = "El DNI no corresponde a un ingresante!!!"
    }
})


//Guardamos en la sesion local

if (JSON.parse(localStorage.getItem('alumnos') === null)){
    localStorage.setItem('alumnos', JSON.stringify(alumnos))
} else {
   const storageAlumnos = JSON.parse(localStorage.getItem("alumnos"))
}

document.getElementById('cargaNotas').addEventListener('submit', (event) => {
    event.preventDefault()

    console.log("Submit form carga notas")
    const NuevoAlumno = {
        nombre: encontrado.nombre,
        nMatematica: parseInt(event.target[0].value),
        nLengua: parseInt(event.target[1].value),
        nHistoria: parseInt(event.target[2].value)
    }


    alumnos.push(new Alumno(NuevoAlumno.nombre, NuevoAlumno.nMatematica, NuevoAlumno.nLengua, NuevoAlumno.nHistoria))
    console.log("nuevo alu" + NuevoAlumno)

    // agregar un nuevo alumno y guardarlo... ?????

    localStorage.setItem('alumnos', JSON.stringify(alumnos))
    // //se limpia el folmuria
    document.querySelector('#dniAlumno').value = ""
    document.querySelector('#mat').value = ""
    document.querySelector('#len').value = ""
    document.querySelector('#his').value = ""
    listaAlumnos(alumnos)

    //agregamos sweetaleert
    Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Las Notas Fueron Cargadas',
        showConfirmButton: false,
        timer: 1000
    })



    const saveAlumnos = JSON.parse(localStorage.getItem("alumnos")) || []
    saveAlumnos != 0 ? listaAlumnos(saveAlumnos) : console.error("no hay alumnos guardados")

})
// se utiliza para remplaza el QuerySelector
const curso = document.querySelector('#curso')

const listaAlumnos = (alumnos) => {
    let Lista = ""

    alumnos.forEach((alumno, index) => {
        Lista += `
        <tr>
            <th scope="row">${index + 1}</th>
		    <td>${alumno.nombre}</td>
		    <td>${alumno.notas[0]}</td>
	    	<td>${alumno.notas[1]}</td>
	    	<td>${alumno.notas[2]}</td>
        </tr>`
    })
    curso.innerHTML = Lista
}

 const saveAlumnos = JSON.parse( localStorage.getItem("alumnos")) || []
 saveAlumnos != 0 ? listaAlumnos(saveAlumnos) : console.error("no hay alumnos guardados")


