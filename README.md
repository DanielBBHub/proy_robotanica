# proy_robotanica  ![Logo del proyecto Robotanica](https://github.com/DanielBBHub/proy_robotanica/blob/develop/proy_robotanica_web/ux/src/img/Logo.png)
  
Los diferentes paquetes desarrollados para el proyecto se han implementado en base a `node.js`, con una estructura de directorios modular para cada parte que compone la web, mediante la compilacion que aporta `npm`:  
  - *proy_robotanica_web/ux/*: **contendra los archivos relacionados con la interfaz de la web, asi como la comunicacion con el servidor**
  - *proy_robotanica_web/servidorREST/*: **contendra los archivos relacionados con el servidor REST que recibira las peticiones HTTP**
  - *proy_robotanica_web/logica/*: **contendra los archivos relacionados con las operaciones que se apliquen a la base de datos**  
  
Los archivos desarrollados para la pagina web cumplen los siguientes propositos:  
  - *proy_robotanica_web/ux/src/js/logica_fake.js*: **Actuar como un cliente del servidor REST mediante llamadas HTTP (POST y GET)**  
  - *proy_robotanica_web/ux/src/js/adapter.js*: **Implementar los callbacks de los botones y dotar de funcionalidades a la pagina utilizando, a modo de puente, roslib**    
  - *proy_robotanica_web/servidorREST/mainServidorREST.js*: **Levantar el servidor REST, implementando el modulo 'logica', para la comunicacion entre el usuario y la base de datos**    
  - *proy_robotanica_web/servidorREST/ReglasREST.js*: **Implementar las llamadas a la logica del negocio dependiendo de que 'comando' de las reglas se ha pedido**    
  - *proy_robotanica_web/servidorREST/package.json*: **Configurar el nombre del paquete, comando de arranque del servicio y test y las dependencias a instalar**  
  - *proy_robotanica_web/logica/LogicaUsuario.js*: **Operaciones de lectura y escritura en la base de datos de usuarios**    
  - *proy_robotanica_web/logica/LogicaInvernadero.js*: **Operaciones de lectura y escritura en la base de datos de invernadero**    
  - *proy_robotanica_web/logica/LogicaProducto.js*: **Operaciones de lectura y escritura en la base de datos de productos**  
  - *proy_robotanica_web/logica/package.json*: **Configurar el nombre del servidor, comando de arranque y las dependencias a instalar**    
  - *proy_robotanica_web/bd/invernaderos.sql*: **Declarar la tabla de datos para los invernaderos**    
  - *proy_robotanica_web/bd/productos.sql*: **Declarar la tabla de datos para los productos**    
  - *proy_robotanica_web/bd/usuarios.sql*: **Declarar la tabla de datos para los usuarios**  

## INSTALACION  
Para el uso del servidor implementado se han de instalar los paquetes previamente:
>Este comando instala las dependencias necesarias. Si se prefiere se pueden descargar manualmente
>Nos situamos en la carpeta logica y servidorREST y ejecutamos el comando dentro de cada una
<pre><code>npm install</code></pre>  
  
Una vez esten los paquetes instalados abrimos los puertos para los servicios:
>El simpleHTTPServer es una de muchas maneras con las que abrir un puerto HTTP  
>Nos situamos en la carpeta ux para abrir el servidor de acceso a la pagina web
<pre><code>cd ux/</code>  
<code>python3 -m http.server</code></pre>  
>Nos situamos en la carpeta servidorREST para abrir el servidor de acceso a la pagina web
<pre><code>cd servidorREST/</code>  
<code>npm run servidor</code></pre>   
  
## DOCUMENTACION API  
La documentacion de la api REST se puede encontrar [aqui](https://app.swaggerhub.com/apis-docs/RUXZFLY_1/Robotanica/1.0.0-oas3.1#/)
