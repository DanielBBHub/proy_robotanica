import LogicaFake from "./logica_fake.js"
document.onreadystatechange = function() {
    if( document.readyState === "complete"){
        let logica = new LogicaFake()
        let boton=document.getElementById("prueba")
        boton.addEventListener("click" , async function(){
            await logica.metodoPrueba()
            }) 
        }
}