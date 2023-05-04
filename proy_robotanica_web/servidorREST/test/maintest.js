// ........................................................
// mainTest1.js
// ........................................................
var request = require("request");
var assert = require("assert");

// ........................................................
// ........................................................
const IP_PUERTO = "http://localhost:8080";
// ........................................................
// main ()

  describe("Test 1 : Prueba del servidor REST", function () {
    // ....................................................
    // ....................................................
    it("probar que GET /prueba responde ¡Funciona!", function (hecho) { 
      request.get( 
        { url: IP_PUERTO + "/prueba", headers: { "User-Agent": "daniel" } }, // headers
        function (err, respuesta, carga) { // callback 
          
          assert.equal(err, null, "¿ha habido un error?"); //
          assert.equal(respuesta.statusCode, 200, "¿El código no es 200 (OK)");
          assert.equal(carga, "¡Funciona!", "¿La carga no es ¡Funciona!?");
          hecho();
        } // callback()
      ); // .get
    }); // it

    it("probar que GET /usuarioxdni responde ¡Funciona!", function (hecho) { 
      var dni = {"dni":"87654321A"}
      request.post( 
        { 
        headers: { "User-Agent": "daniel", 'Content-type': 'application/json' }, 
        url: IP_PUERTO + "/usuarioxdni", 
        body: JSON.stringify(dni)
        }, // headers
        function (err, respuesta, carga) { // callback 
         var sol = JSON.parse(carga) 
          assert.equal(err, null, "¿ha habido un error?"); //
          assert.equal(sol.correo , "dabebel@epsg.upv.es", "¿El correo no es dabebel@epsg.upv.es");
          hecho();
        } // callback()
      ); // .get
    }); // it
    
    // ....................................................
    // ....................................................
    it("probar POST /insertarU", function (hecho) { // Probar Post
      var datosUsuario = { // Datos de la medicion a enviar al servidor REST
        nombreApellidos: 'Jon Calleja', // Muestra de la medicion
        correo: "jon@gmail.com", // Fecha de la medicion
        pass: "ajujuajuju",
        dni: '12345123R' // Usuario de la medicion
      };
      request.post(
        {
          headers: { "User-Agent": "Daniel", "Content-Type": "application/json" }, // Cabeceras de la peticion
          url: IP_PUERTO + "/insertarU", // URL del servidor REST
          body: JSON.stringify(datosUsuario), // Datos de la medicion a enviar al servidor REST en formato JSON
        }, 
        function (err, respuesta, carga) { // Callback de la peticion POST al servidor REST 
          //console.log("asserts"); Mensaje de depuracion para ver que se ejecuta el callback
          assert.equal(err, null, "¿ha habido un error?"); // Comprobar que no hay error
          assert.equal(respuesta.statusCode, 500, "¿El código no es 500 (Ya exsiste)"); // Comprobar que el codigo de respuesta es 200 (OK) 
          hecho(); // Indicar que el test ha terminado
        } // callback
      ); // .post
      //console.log("llega?");
    })//it
  }); // describe