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
        .then(response =>  response.json())
        .then(data => this.comprobarUsuario(data, passUsuario) )
		
    }

    async registro(dniUsuario, passUsuario, nombre, telefono, correo) {
       
        var metodo = this;
        var data = { nombreApellidos:nombre, correo:correo ,dni: dniUsuario, telefono: telefono,pass: passUsuario}
        console.log(data)
        var res 
        let peticion = await fetch(IP_PUERTO + '/insertarU', {
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
		
    }


    async enviarConfirmacionMail(correoU) {
       
        var metodo = this;
        
        var data = {correo:correoU}
        console.log(data)
        var res 
        let peticion = await fetch(IP_PUERTO + '/enviar-confirmacion', {
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
    }


    async comprobarUsuario(data,passUsuario) {
        console.log(data.pass)
        console.log(passUsuario)

        if(data.verify == 1){
            if(data.pass.toString() == passUsuario){
                window.location.replace("./perfil.html");
            }
            else{
                document.getElementById("verificar").innerHTML = "Contraseña incorrecta."
            }
        }
        else{
            document.getElementById("verificar").innerHTML = "Verifica el correo primero."
        }
    }
}
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------