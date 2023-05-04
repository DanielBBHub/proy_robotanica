/** ---------------------------------------------------------------------
 * LogicaProducto.js
 *
 * 03/05/23
 *
 * Daniel Benavides
 *
 * Este fichero contiene todas las funciones que operan con sql y se
 * conectan a la bd para los productos
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
	_getProductoPorInvernadero( idInvernadero ){
		let textoSQL = "select * from Productos where idInvernadero=$idInvernadero";
		let valoresParaSQL = { $idInvernadero: idInvernadero }
		return new Promise( (resolver, rechazar) => {
			this.laConexion.all( textoSQL, valoresParaSQL,
			( err, res ) => {
				if(err){
					rechazar(err)
				} else if(res.length > 1){
					rechazar("ERROR")
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
	
	async _insertarProducto(data){
		let textoSQL = "insert into Productos values ($idInvernadero, $productos, $madurez, $fechaplantacion, $coords)";
		let valoresParaSQL = {
			$idInvernadero: data.idInvernadero,
			$productos: data.productos,
			$madurez: data.madurez,
			$fechaplantacion: data.fechaPlantacion,
			$coords: data.coords}
			
		return new Promise( (resolver, rechazar) => {
			this.laConexion.run( textoSQL, valoresParaSQL,
			( err ) => {
				if(err){
					rechazar(err)
				} else {
					resolver(200)
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
