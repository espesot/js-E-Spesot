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


//const alumnos = [];

// alumnos.push(new Alumno("Enzo", 8, 7, 6))
// alumnos.push(new Alumno("Ivan", 9, 7, 9))
// alumnos.push(new Alumno("Martin", 5, 7, 6))
// alumnos.push(new Alumno("Juan", 6, 7, 6))

const alumnos = fetch('./json/alumnos.json')
    .then((res) =>{ 
        return res.json()
    })
    
    





//Guardamos en la sesion local
sessionStorage.setItem('alumnos', JSON.stringify(alumnos))

document.querySelector('#falumno').addEventListener('submit', (Event) => {
    Event.preventDefault()

    const NuevoAlumno = {
        nombre: Event.target[0].value,
        nMatematica: Event.target[1].value,
        nLengua: Event.target[2].value,
        nHistoria: Event.target[3].value
    }


    alumnos.push(new Alumno(NuevoAlumno.nombre, NuevoAlumno.nMatematica, NuevoAlumno.nLengua, NuevoAlumno.nHistoria))
    console.log(NuevoAlumno)

    // agregar un nuevo alumno y guardarlo... ?????

    sessionStorage.setItem('alumnos', JSON.stringify(alumnos))
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

})
// se utiliza para remplaza el QuerySelector
const curso = document.querySelector('#curso')

console.log(curso)


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
    // es rempazado por la variable. "curso"
    //  document.querySelector("#curso").innerHTML = Lista
}

document.addEventListener("DOMContentLoaded", () => {
    const saveAlumnos = JSON.parse( sessionStorage.getItem("alumnos")) || [] 
    saveAlumnos != 0 ? listaAlumnos(saveAlumnos) : console.error("no hay alumnos guardados")  
    
    //listaAlumnos(saveAlumnos)

})
