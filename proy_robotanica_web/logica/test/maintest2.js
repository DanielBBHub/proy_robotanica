// ........................................................
// mainTest1.js 
// ........................................................
const Logica = require("../LogicaProductos.js") // Añadimos la clase Logica 
var assert = require("assert") // Añadimos assert para hacer pruebas
// ........................................................
// main ()
// ........................................................
describe("Test 1: Conectar, añadir, comprobar y cerrar la base de datos de usuarios", function () { // Test 1 
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
    it("puedo buscar un producto", // Puedo buscar la ultimausuario en la base de datos
        async function () { // Función asíncrona para insertar valores y comprobar que se han insertado con callback
            var usuario = await laLogica._getProductoPorInvernadero('78AInvernadero1') // Busca la usuario con el ID 2 llamando a la función buscarusuario de la clase Logica (a la promesa)
            //Comprueba que el ID debe ser 2
            assert.equal(Productos.idInvernadero, '78AInvernadero1') // Comprueba que el ID de la usuario es 2
            
        }) // it
    // ....................................................
    // ....................................................
    it("puedo insertar un producto", // Puedo insertar una NUEVA usuario en la base de datos
        async function () { // Función asíncrona para insertar valores y comprobar que se han insertado con callback
            // Valores de la usuario a insertar
                 /* nombreApellidos    varchar(255),
                    correo   varchar(50)    not null,
                    pass    varchar(50)    not null,
                    dni    date    not null PRIMARY KEY */
            await laLogica._insertarProducto({
                idInvernadero: '78AInvernadero1',
                productos: 'Tomate-calabaza',
                madurez: 'verde',
                fechaPlantacion: '2020-05-05',
                coord: '2,3,3,3'
                })
            //Busca la usuario con el ID 2
            var prodcut = await laLogica._getProductoPorInvernadero('78AInvernadero1') // Busca la usuario con el ID 2 llamando a la función buscarusuario de la clase Logica (a la promesa)
            //Comprueba que el ID debe ser 2
            console.log(prodcut)
            assert.equal(Productos.idInvernadero, '12141214A') // Comprueba que el ID de la usuario es 2
            
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