
class Ingresante{
    constructor(nombre, apellido, dni, email,fnacimiento){
        this.nombre = nombre
        this.apellido = apellido
        this.dni = dni
        this.email = email
        this.fnacimiento = fnacimiento
    }

    getIngresante(){
        return this.nombre
    }

    addIngresante(ing){
        this.ing.push(ing)
    }

}

const validarIngresante = (ingresantes, nuevoIngresante) => {
    // email repeat
    let encontrado = ingresantes.find((ingresante)=>{
        return ingresante.email === nuevoIngresante.email
    })

    if(encontrado === undefined) {
        encontrado = ingresantes.find((ingresante)=>{
            return ingresante.dni === nuevoIngresante.dni
        })
        if(encontrado === undefined) {
            return true
        } else {
            console.error("dni repeat")
            return false
        }
    } else {
        console.error("email repeat")
        return false
    }
}


//const ingresante = new ingresante()
//export{ingresante} 
export {Ingresante, validarIngresante}