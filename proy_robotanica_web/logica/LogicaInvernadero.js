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
	_getInvernaderoConDni( dniUser ){
		let textoSQL = "select * from Invernaderos where dniUser=$dniUser";
		let valoresParaSQL = { $dniUser: dniUser }
		return new Promise( (resolver, rechazar) => {
			this.laConexion.all( textoSQL, valoresParaSQL,
			( err, res ) => {
				if(err){
					rechazar(err)
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
	_insertarInvernadero( data ){
		let textoSQL = "insert into Invernaderos values($dniUser, $nombre, $direccion,$area, $tipo, $idInvernadero)";
		let valoresParaSQL = { $dniUser: data.dniUser, $nombre: data.nombre, $direccion: data.direccion, $area: data.area, $tipo: data.tipo, $idInvernadero: data.idInvernadero}
		return new Promise( (resolver, rechazar) => {
			this.laConexion.all( textoSQL, valoresParaSQL,
			( err, res ) => {
				if(err){
					rechazar(err)
				}else {
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
