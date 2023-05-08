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

    async login(dniUsuario, passUsuario) {
       
        var metodo = this;
        var data = { dni: dniUsuario, pass: passUsuario}
        console.log(data)
        var res 
        let peticion = await fetch(IP_PUERTO + '/usuarioxdni', {
            method: 'POST',
            headers: new Headers(
            //Partes del header que se han añadido para 
            //posibilitar la comunicacion con el servidor REST
            { 'Users-Agent' : 'Daniel',
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json'}),
            mode: "cors",
            body: JSON.stringify(data),
            

        }) 
        //Se recoge el JSON de la cabecera de la respuesta 
        .then(response =>  res = response.json())
        if(res.pass == passUsuario){
            window.location.replace("./perfil.html");
        }
        else{

        }
		
    }

    async comrprobarUsuario(data,passUsuario) {
        if(data.pass == passUsuario){
            window.location.replace("./perfil.html");
        }
        else{

        }
    }
}
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------