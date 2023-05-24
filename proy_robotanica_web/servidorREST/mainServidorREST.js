//----------------------------------------------------------------------
// mainServidorREST.js
//----------------------------------------------------------------------
//----------------------------------------------------------------------
//----------------------------------------------------------------------
const cors = require('cors')
const express = require( 'express' )
const bodyParser = require( 'body-parser' )
const session = require('express-session');
const cookieParser = require('cookie-parser');
const LogicaUsuario = require( "../logica/LogicaUsuario.js" )
const LogicaInvernaderos = require( "../logica/LogicaInvernadero.js" )
const LogicaProducto = require( "../logica/LogicaProducto.js" )
//----------------------------------------------------------------------
//----------------------------------------------------------------------
function cargarLogicaUsuario( fichero ) {
	return new Promise( (resolver, rechazar) => {
		var laLogicaUsuario = new LogicaUsuario( fichero,
		function( err ) {
			if ( err ) {
				rechazar( err )
			} else {
				resolver( laLogicaUsuario )
			}
		}) // new
	}) // Promise
} // ()
function cargarLogicaInvernaderos( fichero ) {
	return new Promise( (resolver, rechazar) => {
		var laLogicaInvernaderos = new LogicaInvernaderos( fichero,
		function( err ) {
			if ( err ) {
				rechazar( err )
			} else {
				resolver( laLogicaInvernaderos )
			}
		}) // new
	}) // Promise
} // ()
function cargarLogicaProducto( fichero ) {
	return new Promise( (resolver, rechazar) => {
		var laLogicaProducto = new LogicaProducto( fichero,
		function( err ) {
			if ( err ) {
				rechazar( err )
			} else {
				resolver( laLogicaProducto )
			}
		}) // new
	}) // Promise
} // ()
//----------------------------------------------------------------------
// main()
//----------------------------------------------------------------------
async function main() {	
	// instancias de las diferentes logicas
	var laLogicaUsuario = await cargarLogicaUsuario( "../bd/robotanica.bd" )
	var laLogicaInvernaderos = await cargarLogicaInvernaderos( "../bd/robotanica.bd" )
	var laLogicaProducto = await cargarLogicaProducto( "../bd/robotanica.bd" )
	
	var servidorExpress = express()
	servidorExpress.use(cookieParser());
	servidorExpress.use(session({ 
		secret: '123458cat',
		resave: false,
		saveUninitialized: true,
		cookie: { maxAge: 60000 }
	}))
	// CORS
	servidorExpress.use(cors())
	// para poder acceder a la carga de la petición http
	// asumiendo que es JSON
	servidorExpress.use ( bodyParser.text({type: 'application/json'}) )
	// cargo las reglas REST
	var reglas = require( "./ReglasREST.js")
	reglas.cargar( servidorExpress, laLogicaUsuario, laLogicaInvernaderos, laLogicaProducto)
	// arranco el servidor
	var servicio = servidorExpress.listen( 8080, function() {
		console.log( "servidor REST escuchando en el puerto 8080 ")
	})
	// capturo control-c para cerrar el servicio ordenadamente
	process.on('SIGINT', function() {
		console.log (" terminando ")
		servicio.close ()
	})
} // ()
//----------------------------------------------------------------------
//----------------------------------------------------------------------
main()
//----------------------------------------------------------------------
//----------------------------------------------------------------------