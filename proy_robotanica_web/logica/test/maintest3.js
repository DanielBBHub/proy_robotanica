// ........................................................
// mainTest1.js 
// ........................................................
const Logica = require("../LogicaInvernadero.js") // Añadimos la clase Logica 
var assert = require("assert") // Añadimos assert para hacer pruebas
// ........................................................
// main ()
// ........................................................
describe("Test 3: Conectar, añadir, comprobar y cerrar la base de datos de invernaderos", function () { // Test 1 
    // ....................................................
    // ....................................................
    var laLogica = null // La clase Logica vale null para poder asignarle un valor
    // ....................................................
    // ....................................................
    it("conectar a la base de datos", function (hecho) { // Conectar a la base de datos 
        laLogica = new Logica(
            "../bd/robotanica.bd", // Nombre de la base de datos
            function (err) { // Callback
                if (err) { // Si hay error
                    throw new Error("No he podido conectar con robotanica.db") // Lanza un error
                }
                hecho() // Sino, termina
            })
    }) // it
     // ....................................................
    // ....................................................
    it("puedo buscar un invernadero", // Puedo buscar la ultimausuario en la base de datos
        async function () { // Función asíncrona para insertar valores y comprobar que se han insertado con callback
            var invernadero = await laLogica._getInvernaderoConDni('12345678A') // Busca la usuario con el ID 2 llamando a la función buscarusuario de la clase Logica (a la promesa)
            //Comprueba que el ID debe ser 2
            assert.equal(invernadero.idInvernadero, '78AInvernadero1') // Comprueba que el ID de la usuario es 2
            
        }) // it
    // ....................................................
    // ....................................................
    it("puedo insertar un invernadero", // Puedo insertar una NUEVA usuario en la base de datos
        async function () { // Función asíncrona para insertar valores y comprobar que se han insertado con callback
            // Valores de invernadero a insertar
                 /* dniUser    varchar(9)    primary key not null,
                    nombre    varchar(50)    not null,
                    direccion    varchar(50)    not null,
                    area    INTEGER    not null,
                    tipo    varchar(50)    not null,
                    idInvernadero    varchar(52)    not null, */
             try
            { 
                res = await laLogica._insertarInvernadero({
                    dniUser: '12141214A',
                    nombre: 'Invernadero3',
                    direccion: 'Calle Falsa 23',
                    area: 100,
                    tipo: 'Hidroponico',
                    idInvernadero: '14AInvernadero3'
                    })
             }
            catch {
                
            } 
            //Busca la usuario con el ID 2
            var invernadero = await laLogica._getInvernaderoConDni('12141214A') // Busca la usuario con el ID 2 llamando a la función buscarusuario de la clase Logica (a la promesa)
            //Comprueba que el ID debe ser 2
            assert.equal(invernadero.nombre, 'Invernadero3') // Comprueba que el ID de la usuario es 2
            
        }) // it
    // ....................................................
    // ....................................................
    it("cerrar conexión a la base de datos", // Cierra la conexión a la base de datos 
        async function () { // Función asíncrona para cerrar la conexión a la base de datos
            try { // Intenta cerrar la conexión a la base de datos
                await laLogica.cerrar() // Cierra la conexión a la base de datos
            } catch (err) { // Si hay error
                throw new Error("cerrar conexión a BD fallada: " + err) // Lanza un error
            }
        }) // it
}) // describe