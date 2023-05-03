/** ---------------------------------------------------------------------
 * LogicaInvernaderos.js
 *
 * 03/05/23
 *
 * Daniel Benavides
 *
 * Este fichero contiene todas las funciones que operan con sql y se
 * conectan a la bd para los invernaderos
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
	_getUsuarioConCorreo( correo ){
		let textoSQL = "select * from Usuarios where correo=$correo";
		let valoresParaSQL = { $correo: correo }
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
	// _comprobarpassConcorreoYPass() -->
	// pass
	// -----------------------------------------------------------------
	_comprobarpassConCorreoYPass( correo, pass ){
		let textoSQL = "select pass from Usuario where correo=$correo and pass=$pass";
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
	//	correo: Texto
	// _cambiarpass() -->
	// 
	// -----------------------------------------------------------------
	_cambiarpass( pass, correo ){
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

	_getUsuarioConcorreoYPass( correo, pass ){
		let textoSQL = "select * from Usuario where correo=$correo and pass=$pass";
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
