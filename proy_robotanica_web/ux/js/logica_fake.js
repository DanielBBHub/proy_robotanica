// ---------------------------------------------------------------------
// LogicaFake.js
// ---------------------------------------------------------------------

const IP_PUERTO = "http://localhost:8080";
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
export default class LogicaFake {
    

    async metodoPrueba() {
       
        var metodo = this;

        let peticion = await fetch(IP_PUERTO + '/prueba', {
            method: 'GET'
        });
        if (peticion.status == 404) {
            
            return;
        } else {
			
			//guardo el email para recuperar la información de este usuario más adelante
			console.log('Prueba')
            return            
        }
        
    }
}
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------