import { Ingresante } from "./ingresanteClass"


document.querySelector('dniAlumno').addEventListener('change', (Event) => {

    const r = sessionStorage.getItem('Ingresante', JSON.parse(Ingresante))
    console.log("pasa")
})