# server
-Para ejecutar, se ejecutan los siguientes comandos:<br>
docker compose build<br>
-luego debe cambiarse la variable de entorno de config.ev llamada SEVER_HOST<br>
se debe poner la dirección de la maquina que se usa.<br>
-se debe ejecutar el comando:<br>
docker compose up -d<br>
-ahora ya se puede acceder a las direcciones<br>
si no funciona, usar los comandos:<br>
docker compose down<br>
docker compose up -d<br>
(revisar las colecciones de postman)<br>
solo la ruta para crear usuarios post /users es accesible de forma publica<br>
para acceder a las otras rutas, es necesario crear un usuario e ir a la ruta /login (revisar la ruta en el la coleccion de postman)<br>
las sesiones solo duran lo especificado en el archivo de variables de entorno config.env en la variariable DEFAULT_EXPIRE_TOKEN, se puede modificar, para que los cambios surtan efecto se necesita usar los comandos<br>
docker compose down <br>
docker compose up -d <br>
la ruta /refresh permite actualizar el token en las cookies <br> la ruta /check permite verificar si las cookies tienen token de acceso valido
