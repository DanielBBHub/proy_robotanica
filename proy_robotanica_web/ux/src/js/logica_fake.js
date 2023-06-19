// ---------------------------------------------------------------------
// LogicaFake.js
// ---------------------------------------------------------------------

const IP_PUERTO = "http://localhost:8080";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------

const firebaseConfig = {
    apiKey: "AIzaSyDRW_wZjy-Ibr5cY1e9WGf9nInxiO45S4Y",
    authDomain: "bd-robotanica.firebaseapp.com",
    projectId: "bd-robotanica",
    storageBucket: "gs://bd-robotanica.appspot.com",
    messagingSenderId: "303273414038",
    appId: "1:303273414038:web:006041b5d3cbcf9e84a1b7",
    measurementId: "G-4ZN58MF5TC"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);


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
    

    async mostrar_datos(dniU){
        var metodo = this;
        //aqui va el dni del ususario "dniU"
        var data = {dni: dniU}
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
        }).then(response => response.json())
        //Una vez recogida se pasa la muestra y la fecha de esta a la funcion cargar_muestra()
        .then(data => 
            this.cargarDatosUsuario(data)
        )
    }
            
    async guardarImagen(dniU, imagenUrl) {
       
        var data = {dni:dniU, imagen:imagenUrl}
        console.log(data)
        var res 
        let peticion = await fetch(IP_PUERTO + '/guardar-imagen', {
            method: 'POST',
            headers: new Headers(
            //Partes del header que se han añadido para 
            //posibilitar la comunicacion con el servidor REST
            { 'Users-Agent' : 'Daniel',
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json'}),
            mode: "cors",
            body: JSON.stringify(data),
            

        }).then(response => response.json())
        //Una vez recogida se pasa la muestra y la fecha de esta a la funcion cargar_muestra()
        .then(data => this.cargarDatosUsuario(data))

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


    cargarDatosUsuario(data){
        console.log(data)
		document.getElementById("nombreUsuarioTxt").textContent =  data.nombreApellidos;
        document.getElementById("correoUsuarioTxt").textContent =  data.correo;
        document.getElementById("tlfUsuarioTxt").textContent =  data.telefono;
        document.getElementById("imgUsuario").src =  data.imagen;
    }
    async subirImagen(dniU, imagen) {
        const imageRef = ref(storage, 'images/'+ dniU)
        const metadata = {
            contentType: imagen.type
        };
        const uploadTask = uploadBytesResumable(imageRef, imagen, metadata)
        uploadTask.on('state_changed',
        (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
            }
        },
        (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
            case 'storage/unauthorized':
                // User doesn't have permission to access the object
                console.log('case: storage/unauthorized')
                console.log(error)
                break;
            case 'storage/canceled':
                // User canceled the upload
                console.log('case: storage/canceled')
                console.log(error)
                break;

            // ...

            case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                console.log(error)
                break;
            }
        },
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                console.log('File available at', downloadURL);
                this.guardarImagen(dniU, downloadURL)
            });
        }
        );
    }


    async comprobarUsuario(data,passUsuario) {
        console.log(data.pass)
        console.log(passUsuario)

        if(data.verify == 1){
            if(data.pass.toString() == passUsuario){
                window.location.replace("./perfil.html?dni=" + data.dni);
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