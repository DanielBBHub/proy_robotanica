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
var nodemailer = require('nodemailer');
var randtoken = require('rand-token');
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
		let textoSQL = "select * from Usuarios where dni=$dni";
		let valoresParaSQL = {$dni: dni}
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

	async _insertarUsuario( data ){
		let textoSQL = "insert into Usuarios values($nombreApellidos, $correo, $telefono, $pass, $dni, $token, $verify, $imagen  )";
		let valoresParaSQL = { 
			$nombreApellidos: data.nombreApellidos, 
			$correo: data.correo, 
			$telefono: data.telefono, 
			$pass: data.pass,
			$dni: data.dni,
			$token: null,
			$verify:0,
			$imagen:"" }
		
		return new Promise( (resolver, rechazar) => {
			this.laConexion.all( textoSQL, valoresParaSQL,
			( err, res ) => {
				if(err){
					rechazar(err)
				} else {
					this._enviarCorreo(data)
				}
			})
		})
	} 

	
	async _cambiarCorreoConDni( data ){
		let textoSQL = "update Usuarios set correo=$correo where dni=$dni";
		let valoresParaSQL = { $correo: data.correo,$dni: data.dni }
		
		return new Promise( (resolver, rechazar) => {
			this.laConexion.all( textoSQL, valoresParaSQL,
			( err, res ) => {
				if(err){
					rechazar(err)
				} else {
					resolver()
				}
			})
		})
	}

	async _cambiarTlfConDni( data ){
		let textoSQL = "update Usuarios set telefono=$tlf where dni=$dni";
		let valoresParaSQL = { $tlf: data.tlf,$dni: data.dni }
		
		return new Promise( (resolver, rechazar) => {
			this.laConexion.all( textoSQL, valoresParaSQL,
			( err, res ) => {
				if(err){
					rechazar(err)
				} else {
					resolver()
				}
			})
		})
	}

	async _cambiarPassConDni( data ){
		let textoSQL = "update Usuarios set pass=$pass where dni=$dni";
		let valoresParaSQL = {$pass: data.pass, $dni: data.dni}
		
		return new Promise( (resolver, rechazar) => {
			this.laConexion.all( textoSQL, valoresParaSQL,
			( err, res ) => {
				if(err){
					rechazar(err)
				} else {
					resolver()
				}
			})
		})
	}

	async _guardarImagenUsuario(data){
		let textoSQL = "update Usuarios set imagen=$imagen where dni=$dni";
		let valoresParaSQL = {$imagen: data.imagen, $dni: data.dni}
		
		return new Promise( (resolver, rechazar) => {
			this.laConexion.all( textoSQL, valoresParaSQL,
			( err, res ) => {
				if(err){
					rechazar(err)
				} else {
					resolver()
				}
			})
		})
	}

	async _enviarCorreo( data ){
		var sent
		var token
		let textoSQL = "select * from Usuarios where correo=$correo";
		let valoresParaSQL = {$correo:data.correo}
		var res = new Promise( (resolver, rechazar) => {
			this.laConexion.all( textoSQL, valoresParaSQL,
			async ( err, res ) => {
				if (err) throw err;
				/* var type = "success";
				var msg = "Email already verified"; */
				console.log(res[0]);
				if (res.length > 0) {
					token = randtoken.generate(20);
					console.log(token);
					if (res[0].verify == 0) {
						sent = await this.sendEmail(data.correo, token);
						resolver()	
					}	
				} else {
					console.log("2");
					/* type = "error";
					msg = "The Email is not registered with us"; */
				}
			})
		}).then( () => {
			console.log(res);
			if (sent != 1) {
				let textoSQL2 = "UPDATE Usuarios SET token=$token WHERE correo=$correo";
				let valoresParaSQL2 = {$correo:data.correo, $token:token}
				console.log(valoresParaSQL2)
				return new Promise( (resolver, rechazar) => {
					this.laConexion.all( textoSQL2, valoresParaSQL2,
					( err, res ) => {
						if (err) throw err;
						console.log("TOKEN INTRODUCIDO")
						console.log(res)
						resolver()
						/* type = "success";
						msg = "The verification link has been sent to your email address";*/
					})
				})
				
				} else {
					console.log("Que onda pasa aqui");
				/* type = "error";
				msg = "Something goes to wrong. Please try again"; */
			}
		})
			

		
	}

	async _confirmarCorreo( data ){
		let textoSQL = "select * from Usuarios where token=$token";
		var token = data
		let valoresParaSQL = {$token:data}
		var verificar = 1
		var res = new Promise( (resolver, rechazar) => {
			this.laConexion.all( textoSQL, valoresParaSQL,
			async ( err, res ) => {
				if (err) throw err;
				/* var type = "success";
				var msg = "Email already verified"; */
				console.log(res[0]);
				if (res.length > 0) {
					verificar = res[0].verify
					resolver()
					
				} else {
					console.log("2");
					/* type = "error";
					msg = "The Email is not registered with us"; */
				}
			})
		}).then( () => {
			console.log(res);
			console.log(data);
			if (verificar == 0) {
				let textoSQL2 = "UPDATE Usuarios SET verify=$verify WHERE token=$token";
				let valoresParaSQL2 = {$verify:1, $token:data}
				console.log(valoresParaSQL2)
				return new Promise( (resolver, rechazar) => {
					this.laConexion.all( textoSQL2, valoresParaSQL2,
					( err, res ) => {
						if (err) throw err;
						console.log("VALIDACION INTRODUCIDO")
						resolver()
						/* type = "success";
						msg = "The verification link has been sent to your email address";*/
					})
				})
				} else {
					console.log("Que onda pasa aqui");
				/* type = "error";
				msg = "Something goes to wrong. Please try again"; */
				
			}
		})
	}

	async sendEmail(email, token) {
		console.log("sendMail");
        var email = email;
        var token = token;
        var mail = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "ruxzfly@gmail.com", // Your email id
            pass: "tvle nwyf weeg fori", // Your password
          },
        });
        var mailOptions = {
          from: "robotanica@gmail.com",
          to: email,
          subject: "Email verification - Robotanica.com",
          html:
            '<p>You requested for email verification, kindly use this <a href="http://localhost:8080/confirmar-correo?token=' +
            token +
            '">link</a> to verify your email address</p>',
        };
		console.log(mailOptions);
        mail.sendMail(mailOptions, function (error, info) {
          if (error) {
			console.log('ERROR   ' + error);
            return 1;
          } else {
			console.log('TODO BIEN   ' +info);
            return 0;
          }
        });
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
