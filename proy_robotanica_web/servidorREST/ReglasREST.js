//----------------------------------------------------------------------
// ReglasREST.js
//----------------------------------------------------------------------
module.exports.cargar = function( servidorExpress, laLogicaUsuario ) {
	//--------------------------------------------------------
	// GET /prueba
	//--------------------------------------------------------
	servidorExpress.get('/prueba/', function( peticion, respuesta ){
		console.log( " * GET /prueba " )
		respuesta.send( "¡Funciona!" )
	}) // get /prueba
	
	
//////////////////////////////////////////////////////////////
// MÉTODO GET
//////////////////////////////////////////////////////////////
	
	//--------------------------------------------------------
	// Peticion GET /usuario
	//--------------------------------------------------------
	servidorExpress.post(
		'/usuarioxdni',
		async function(peticion, respuesta) {
			console.log(" * GET /usuarioxdni ")
			var data = JSON.parse(peticion.body)
			
			var res = null
			var error = null

			try {
				// llamo a la función adecuada de la lógica
				console.log(data.dni)
				res = await laLogicaUsuario._getUsuarioConDni(data.dni)
			} catch (e) {
				error = e
			}
			// si el array de resultados no tiene una casilla ...
			if (error != null) {
				if (error == 404) {
					respuesta.status(404).send("No encontré usuario ")
				} else {
					//500: internal server error
					console.log(error)
					respuesta.status(500).send("Error interno del servidor")
				}
				return
			} else {
				respuesta.send(JSON.stringify(res))
			}
		}) // get /usuario

		servidorExpress.post(
			'/usuarioxcorreo',
			async function(peticion, respuesta) {
				console.log(" * GET /usuarioxcorreo ")
				// averiguo el email y la contrasenya
				var data = JSON.parse(peticion.body)
				// llamo a la función adecuada de la lógica
				var res = null
				var error = null

				try {
					res = await laLogicaUsuario._getUsuarioConcorreoYPass(data)
				} catch (e) {
					error = e
				}
				// si el array de resultados no tiene una casilla ...
				if (error != null) {
					if (error == 404) {
						respuesta.status(404).send("No encontré usuario con email " + email)
					} else {
						//500: internal server error
						console.log(error)
						respuesta.status(500).send("Error interno del servidor")
					}
					return
				} else {
					respuesta.send(JSON.stringify(res))
				}
			}) // get /contrasenya

			servidorExpress.post(
				'/insertarU',
				async function(peticion, respuesta) {
					console.log(" * POST /insertarU ")
						
					var data = JSON.parse(peticion.body)
						
					var res = null
					var error = null
		
					try {
						res = await laLogicaUsuario._insertarUsuario(data)
					} catch (e) {
						error = e
					}
					// si el array de resultados no tiene una casilla ...
					if (error != null) {
						if (error == 404) {
							respuesta.status(404).send("No encontré usuario con email " + email)
						} else {
							//500: internal server error
							console.log(error)
							respuesta.status(500).send("Error interno del servidor")
						}
						return
					} else {
						respuesta.send(JSON.stringify(res))
					}
				}) // get /usuario

				servidorExpress.post(
					'/enviar-confirmacion',
					async function(peticion, respuesta) {
						console.log(" * POST /enviar-confirmacion ")
							
						var data = JSON.parse(peticion.body)
							
						var res = null
						var error = null
			
						try {
							res = await laLogicaUsuario._enviarCorreo(data)
						} catch (e) {
							error = e
						}
						// si el array de resultados no tiene una casilla ...
						if (error != null) {
							if (error == 404) {
								respuesta.status(404).send("No encontré usuario con email " + email)
							} else {
								//500: internal server error
								console.log(error)
								respuesta.status(500).send("Error interno del servidor")
							}
							return
						} else {
							respuesta.send(JSON.stringify(res))
						}
					}) // get /usuario

					servidorExpress.post(
						'/guardar-imagen',
						async function(peticion, respuesta) {
							console.log(" * POST /guardar-imagen ")
								
							var data = JSON.parse(peticion.body)
								
							var res = null
							var error = null
				
							try {
								res = await laLogicaUsuario._guardarImagenUsuario(data)
							} catch (e) {
								error = e
							}
							// si el array de resultados no tiene una casilla ...
							if (error != null) {
								if (error == 404) {
									respuesta.status(404).send("No encontré usuario con email " + email)
								} else {
									//500: internal server error
									console.log(error)
									respuesta.status(500).send("Error interno del servidor")
								}
								return
							} else {
								respuesta.send(JSON.stringify(res))
							}
						}) // get /usuario

					servidorExpress.get(
						'/confirmar-correo?',
						async function(peticion, respuesta) {
							console.log(" * GET /confirmar-correo ")
								
							var token = peticion.query.token
								
							var res = null
							var error = null
				
							try {
								res = await laLogicaUsuario._confirmarCorreo(token)
							} catch (e) {
								error = e
							}
							// si el array de resultados no tiene una casilla ...
							if (error != null) {
								if (error == 404) {
									respuesta.status(404).send("No encontré usuario con email " + email)
								} else {
									//500: internal server error
									console.log(error)
									respuesta.status(500).send("Error interno del servidor")
								}
								return
							} else {
								respuesta.send(JSON.stringify(res))
							}
						}) // get /usuario
				
	
}
//----------------------------------------------------------------------
//----------------------------------------------------------------------
