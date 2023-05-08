/** ---------------------------------------------------------------------
 * LogicaUsuario.js
 *
 * 03/05/23
 *
 * Daniel Benavides
 *
 * Este fichero contiene todas las funciones que operan con sql y se
 * conectan a la bd para los usuarios
 *
 *
 * ------------------------------------------------------------------- */
//import sqlite3 from './node_modules/sqlites3'
const sqlite3 = require( "sqlite3")
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
module.exports = class LogicaUsuario {
	
	// -----------------------------------------------------------------
	// nombreBD: Texto
	// -->
	//    constructor () -->
	// -----------------------------------------------------------------
	constructor( nombreBD, cb ) {
		this.laConexion = new sqlite3.Database(
			nombreBD,
			( err ) => {
				if( ! err ) {
					var context = this
					///////////////////////se pueden poner funciones y cosas así
					this.laConexion.run( "PRAGMA foreign_keys = ON" )
				}
				cb( err)
			}
		)
	} // ()

	// -----------------------------------------------------------------
	//	correo: Texto
	// _getUsuarioConcorreo() -->
	//  nombreApellidos, correo, pass, dni
	// -----------------------------------------------------------------
	async _getUsuarioConCorreo( correo ){
		let textoSQL = "select * from Usuarios where correo=$correo";
		let valoresParaSQL = { $correo: correo }
		return new Promise( (resolver, rechazar) => {
			this.laConexion.all( textoSQL, valoresParaSQL,
			( err, res ) => {
				if(err){
					rechazar(err)
				} else {
					console.log(res)
					resolver(res[0])
				}
			})
		})
	}
	
	// -----------------------------------------------------------------
	//	correo, pass: Texto
	// _comprobarpassConcorreoYPass() -->
	// pass
	// -----------------------------------------------------------------
	async _comprobarpassConCorreoYPass( correo, pass ){
		let textoSQL = "select pass from Usuario where correo=$correo and pass=$pass";
		let valoresParaSQL = { $correo: correo, $pass: pass }
		return new Promise( (resolver, rechazar) => {
			this.laConexion.all( textoSQL, valoresParaSQL,
			( err, res ) => {
				if(err){
					rechazar(err)
				} else if(res.length > 1){
					rechazar("ERROR: mas de 1 usuario comparte correo")
				} else {
					resolver(res[0])
				}
			})
		})
	}

	// -----------------------------------------------------------------
	//	correo: Texto
	// _cambiarpass() -->
	// 
	// -----------------------------------------------------------------
	async _cambiarpass( pass, correo ){
		let textoSQL = "UPDATE Usuario SET pass=$pass where correo=$correo";
		let valoresParaSQL = { $correo: correo, $pass: pass }
		return new Promise( (resolver, rechazar) => {
			this.laConexion.all( textoSQL, valoresParaSQL,
			( err, res ) => {
				if(err){
					rechazar(err)
				} else if(res.length > 1){
					rechazar("ERROR: mas de 1 usuario comparte correo")
				} else if(res.length == 0){
					rechazar(404)
				} else {
					resolver(res[0])
				}
			})
		})
	}

	// -----------------------------------------------------------------
	//	correo, pass: Texto
	// _getUsuarioConcorreoYPass() -->
	// correo, nombre, id_invernadero, id_rol, pass
	// -----------------------------------------------------------------

	async _getUsuarioConcorreoYPass( data ){
		let textoSQL = "select * from Usuarios where correo=$correo and pass=$pass";
		let valoresParaSQL = { $correo: data.correo, $pass: data.pass }
		return new Promise( (resolver, rechazar) => {
			this.laConexion.all( textoSQL, valoresParaSQL,
			( err, res ) => {
				if(err){
					rechazar(err)
				} else if(res.length > 1){
					rechazar("ERROR: mas de 1 usuario comparte correo")
				} else if(res.length == 0){
					rechazar(404)
				} else {
					resolver(res[0])
				}
			})
		})
	}

	async _getUsuarioConDni( dni ){
		console.log("LogicaUsuario res:" + dni)
		let textoSQL = "select * from Usuarios where dni=$dni";
		let valoresParaSQL = { $dni: dni}
		return new Promise( (resolver, rechazar) => {
			this.laConexion.all( textoSQL, valoresParaSQL,
			( err, res ) => {
				if(err){
					rechazar(err)
				} else {
					console.log("LogicaUsuario res:" + res[0].toString())
					resolver(res[0])
				}
			})
		})
	}

	async _insertarUsuario( data ){
		let textoSQL = "insert into Usuarios values($nombreApellidos, $correo, $pass,$dni)";
		let valoresParaSQL = { $nombreApellidos: data.nombreApellidos, $correo: data.correo, $pass: data.pass,$dni: data.dni }
		
		return new Promise( (resolver, rechazar) => {
			this.laConexion.all( textoSQL, valoresParaSQL,
			( err, res ) => {
				if(err){
					rechazar("ERROR: mas de 1 usuario comparte correo")
				} else {
					resolver()
				}
			})
		})
	}


	// -----------------------------------------------------------------
	// cerrar() -->
	// -----------------------------------------------------------------
	cerrar() {
		return new Promise( (resolver, rechazar) => {
			this.laConexion.close( (err)=>{
				( err ? rechazar(err) : resolver(200) )
			})
		})
	} // ()
} // class
// ---------------------------------------------------------------------
// ---------------------------------------------------------------------
