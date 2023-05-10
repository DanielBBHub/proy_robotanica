import LogicaFake from "./logica_fake.js";
document.addEventListener('DOMContentLoaded', event => {
    // Navegacion por control manual
    let logica = new LogicaFake()
    //Callback para el inicio de sesion 
    document.getElementById("login").addEventListener("click", () => {
        console.log('login')
        var correo =   document.getElementById("dniUsuarioL").value 
        var pass =  document.getElementById("passUsuario").value
        logica.login(correo, pass)
    })
    //Callback para el registro
    document.getElementById("registro").addEventListener("click", () => {
        console.log('registro')
        var correo =   document.getElementById("correoUsuario").value 
        var pass =  document.getElementById("passwordUsuario").value
        var passRe =  document.getElementById("passwordUsuario").value
        var tlf =   document.getElementById("telefonoUsuario").value 
        var dni =  document.getElementById("dniUsuario").value
        var nombreApellidos =  document.getElementById("nombreUsuario").value + ' ' + document.getElementById("apellidosUsuario").value
        
        //Hacer comprobacion antes de loggear al usuario
        logica.registro(dni, pass, nombreApellidos, tlf, correo)
    })


    document.getElementById("parar").addEventListener("click", stop)
    document.getElementById("moverAtras").addEventListener("click", reverse)

    // Navegacion a un punto
    document.getElementById("navTomates").addEventListener("click", () => {
        call_nav_service("tomate")
    })
    document.getElementById("waypoint_berenjena").addEventListener("click", () => {
        call_nav_waypoints_service("waypoints_sim")
    })

    document.getElementById("waypoint_tomate").addEventListener("click", () => {
        call_nav_waypoints_service("waypoints")
    })

    /*
    // Navegacion por ruta
    document.getElementById("nav_ruta").addEventListener("click", () => {
        call_nav_waypoints_service("activate")
    })
    */

    //Atributos para representar la info de la conexion
    var data = {
        // ros connection
        ros: null,
        rosbridge_address: 'ws://127.0.0.1:9090/',
        connected: false,
        //Infomracion del servicio
        service_busy: false, 
	    service_response: ''
      }

    connect()
    //Se le pasa la direccion del rosbridge a ROSLIB y se crea 
    //una nueva conexion. Esta es asincrona y se crean manejadores de 
    //eventos 
    function connect(){
        

        data.ros = new ROSLIB.Ros({
        url: data.rosbridge_address
        })

        //suscribe()
        // Define callbacks
        //Al des/conectarnos sacamos por pantalla el estaado de la conexion 
        data.ros.on("connection", () => {
            data.connected = true
            console.log("Conexion con ROSBridge correcta") 
        })
        data.ros.on("error", (error) => {
            console.log("Se ha producido algun error mientras se intentaba realizar la conexion")
            console.log(error)
        })
        data.ros.on("close", () => {
            data.connected = false
            console.log("Conexion con ROSBridge cerrada")	    	 
        })
    }

    //Se cierra la conexion
    function disconnect(){
        data.ros.close()
        data.connected = false
      console.log('Clic en botón de desconexión')
    } 

    function suscribe(){
        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/odom',
            messageType: 'nav_msgs/msg/Odometry'
        })

        topic.subscribe((message) => {
            data.position = message.pose.pose.position
                document.getElementById("pos_x").innerHTML = data.position.x.toFixed(2)
                document.getElementById("pos_y").innerHTML = data.position.y.toFixed(2)
        })
    } 

    //Funciones de movimiento del robot desde la web
    //Se publicans msg en el topic desde el websocket
    function move() {
        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/msg/Twist'
        })
        let message = new ROSLIB.Message({
            linear: {x: 0.1, y: 0, z: 0, },
            angular: {x: 0, y: 0, z: -0.2, },
        })
        topic.publish(message)
    }

    function stop() {
        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/msg/Twist'
        })
        let message = new ROSLIB.Message({
            linear: {x: 0, y: 0, z: 0, },
            angular: {x: 0, y: 0, z: 0, },
        })
        topic.publish(message)
    }

    function reverse() {
        let topic = new ROSLIB.Topic({
            ros: data.ros,
            name: '/cmd_vel',
            messageType: 'geometry_msgs/msg/Twist'
        })
        let message = new ROSLIB.Message({
            linear: {x: -0.1, y: 0, z: 0, },
            angular: {x: 0, y: 0, z: -0.2, },
        })
        topic.publish(message)
    }

    //Mover el robor a partir de un servicio ya hecho 
    function call_delante_service(valor){
        data.service_busy = true
        data.service_response = ''	
    
      //definimos los datos del servicio
        let service = new ROSLIB.Service({
            ros: data.ros,
            name: '/movement',
            serviceType: 'proy_robotanica_custom_interface/srv/MyMoveMsg'
        })
    
        let request = new ROSLIB.ServiceRequest({
            move: valor
        })
    
        service.callService(request, (result) => {
            data.service_busy = false
            data.service_response = JSON.stringify(result)
        }, (error) => {
            data.service_busy = false
            console.error(error)
        })	
    }

    //Mover el robor a partir de un servicio ya hecho 
    function call_nav_service(valor){
        data.service_busy = true
        data.service_response = ''	
        console.log("Se ha pulsado el boton con el valor: " + valor)
    
      //definimos los datos del servicio
        let service = new ROSLIB.Service({
            ros: data.ros,
            name: '/service_nav_to_pose',
            serviceType: 'proy_robotanica_custom_interface/srv/TypeOfPlant'
        })
    
        let request = new ROSLIB.ServiceRequest({
            type: valor
        })
    
        service.callService(request, (result) => {
            data.service_busy = false
            data.service_response = JSON.stringify(result)
        }, (error) => {
            data.service_busy = false
            console.error(error)
        })	
    }

    // Servicio de navegacion a un punto
    function call_nav_service(valor){
        data.service_busy = true
        data.service_response = ''	
        console.log("Se ha pulsado el boton con el valor: " + valor)
    
      //definimos los datos del servicio
        let service = new ROSLIB.Service({
            ros: data.ros,
            name: '/service_nav_to_pose',
            serviceType: 'proy_robotanica_custom_interface/srv/TypeOfPlant'
        })
    
        let request = new ROSLIB.ServiceRequest({
            type: valor
        })
    
        service.callService(request, (result) => {
            data.service_busy = false
            data.service_response = JSON.stringify(result)
        }, (error) => {
            data.service_busy = false
            console.error(error)
        })	
    }

    // Servicio de navegacion por una ruta
    function call_nav_waypoints_service(valor){
        data.service_busy = true
        data.service_response = ''	
        console.log("Se ha pulsado el boton con el valor: " + valor)
    
        //definimos los datos del servicio
        let service = new ROSLIB.Service({
            ros: data.ros,
            name: '/waypoint_server',
            serviceType: 'proy_robotanica_custom_interface/srv/MyMoveMsg'
        })
    
        let request = new ROSLIB.ServiceRequest({
            move: valor
        })
    
        service.callService(request, (result) => {
            data.service_busy = false
            data.service_response = JSON.stringify(result)
        }, (error) => {
            data.service_busy = false
            console.error(error)
        })	
    }

    // Servicio de navegacion por una ruta
    function call_capture_image(valor){
        data.service_busy = true
        data.service_response = ''	
        console.log("Se ha pulsado el boton con el valor: " + valor)
    
        //definimos los datos del servicio
        let service = new ROSLIB.Service({
            ros: data.ros,
            name: '/capturar',
            serviceType: 'proy_robotanica_custom_interface/srv/MyCameraMsg'
        })
    
        let request = new ROSLIB.ServiceRequest({
            type: valor
        })
    
        service.callService(request, (result) => {
            data.service_busy = false
            data.service_response = JSON.stringify(result)
        }, (error) => {
            data.service_busy = false
            console.error(error)
        })	
    }
});