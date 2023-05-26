Aplicación de Ecommerce

   Este proyecto ha sido desarrollado en un entorno de desarrollo basado en JavaScript, utilizando tecnologías como Node.js, Express, MongoDB y Handlebars como motor de plantillas.
   
   La aplicación de Ecommerce que hemos desarrollado es una solución completa para la venta de productos en línea. Ha sido diseñada y construida utilizando las últimas tecnologías web para garantizar un rendimiento óptimo y una experiencia de usuario excepcional.



Detalles del servidor
    A continuación se detallan los componentes y la configuración utilizados en el servidor.
    
    Dependencias y Configuración

   - Se utiliza el framework Express para crear el servidor.
   - El servidor se crea utilizando el método createServer del módulo http.
   - El módulo url se utiliza para convertir la ruta del archivo a una ruta de sistema de archivos.
   - El módulo path se utiliza para trabajar con rutas de archivos y directorios.
   - El módulo cookie-parser se utiliza para analizar las cookies en las solicitudes entrantes.
   - Se utiliza el módulo socket.io para habilitar la comunicación en tiempo real mediante WebSockets.
   - El módulo express-handlebars se utiliza como motor de plantillas para renderizar las vistas.
   - Los motores de plantillas pug y ejs también se configuran para renderizar las vistas.
   - Se utiliza el middleware express-compression para habilitar la compresión de respuestas HTTP.
   - Se utiliza el middleware swagger-ui-express para mostrar la documentación de la API mediante Swagger.
   - Se define un objeto de opciones para Swagger que contiene detalles sobre la API y los archivos YAML que describen las rutas de los endpoints.
   - Se crea una instancia de swaggerJSDoc con las opciones de Swagger para generar la especificación Swagger.
   - Se define el manejo de errores utilizando un middleware para capturar y renderizar los errores en una vista personalizada.
   - Se configuran los eventos del socket.io utilizando el módulo socket-io.config.js.
   - Se define la constante ENABLE_CLUSTER para habilitar o deshabilitar el clúster de procesos.
   - Si el clúster está habilitado y el proceso actual es el proceso maestro, se crea un clúster de procesos para aprovechar los núcleos de la CPU.
   - Se configura el directorio de vistas y se establecen los motores de plantillas en Express.
   - Se configuran las rutas estáticas y los middleware necesarios, como el análisis de JSON y URL-encoded, y el análisis de cookies.
   - Se inicializa Passport para la autenticación y autorización.
   - Se establece el puerto en el que el servidor escucha las solicitudes entrantes.
   - Se inicia el servidor y se muestra un mensaje de registro con la URL y el puerto en el que está escuchando el servidor.
   - Se maneja el evento de error del servidor.
    
    Estructura de Archivos y Rutas

   - Se importa el módulo express y se crea una instancia de la aplicación.
   - Se importa el módulo http y se crea el servidor utilizando la aplicación Express.
   - Se define la ruta del archivo actual utilizando el módulo url y se obtiene el directorio base utilizando el módulo path.
   - Se establece la constante __filename como la ruta del archivo actual convertida a una ruta de sistema de archivos.
   - Se establece la constante __dirname como el directorio base del archivo actual.
   - Se define un bloque condicional que verifica si el clúster de procesos está habilitado y si el proceso actual es el proceso maestro. En caso afirmativo, se crean múltiples procesos hijos utilizando el módulo cluster para aprovechar el rendimiento de la CPU.
   - Si el clúster no está habilitado o el proceso actual no es el proceso maestro, se continúa con la configuración del servidor.
   - Se configuran los middleware y los motores de plantillas, como express-handlebars, pug y ejs, para renderizar las vistas.
   - Se configura la documentación de la API utilizando Swagger y el middleware swagger-ui-express para mostrar la documentación en la ruta "/api-docs".
   - Se establecen las rutas utilizando el enrutador indexRouter importado desde el archivo index.route.js.
   - Se define un middleware para manejar los errores y renderizar una vista de error personalizada.
   - Se configuran los eventos del socket.io utilizando el módulo socket-io.config.js.
   - Se define el puerto en el que el servidor escucha las solicitudes entrantes.
   - Se inicia el servidor y se muestra un mensaje de registro con la URL y el puerto en el que está escuchando el servidor.
    Se maneja el evento de error del servidor.
    
    
    Uso del Servidor

   - El servidor se inicia ejecutando el archivo principal.
   - El servidor escucha las solicitudes entrantes en el puerto especificado.
   - Se puede acceder a la aplicación a través del navegador utilizando la dirección y el puerto mostrados en el mensaje de registro.
    
    Notas Adicionales

   - El servidor utiliza clúster de procesos para aprovechar los núcleos de la CPU y mejorar el rendimiento.
   - Se utiliza Passport para la autenticación y autorización en la aplicación.
   - Se utiliza el middleware compression para habilitar la compresión de las respuestas HTTP y reducir el tamaño de los archivos transferidos.
   - Se utilizan varios motores de plantillas, como express-handlebars, pug y ejs, para renderizar las vistas de la aplicación.
   - Se utiliza Swagger para generar y mostrar la documentación de la API.
   - El servidor utiliza el módulo socket.io para habilitar la comunicación en tiempo real mediante WebSockets.
   - Se utiliza el middleware swagger-ui-express para mostrar la documentación de la API generada por Swagger en una interfaz de usuario interactiva.


Endpoints de la Aplicación
    A continuación se detallan los endpoints disponibles en la aplicación:

    Rutas Principales
   - /: Ruta principal que redirige al inicio de la aplicación.
   - /users: Ruta para el manejo de usuarios.
   - /admin: Ruta para el panel de administrador.
   - /payments: Ruta para el manejo de pagos.
   - /vip: Ruta para usuarios VIP.
   - /auth: Ruta para la autenticación y autorización.
   - /productos: Ruta para el manejo de productos.
   - /mockingproducts: Ruta para pruebas del módulo de productos.
   - /carrito: Ruta para el manejo del carrito de compras.
   - /chat: Ruta para el chat de la aplicación.
   - /api: Ruta para obtener información de la API.
   - /: Ruta para acceso no autorizado.

    Rutas de Usuarios

   - GET /users/me: Obtiene los datos del usuario autenticado.
   - POST /users/: Registra un nuevo usuario.
   - GET /users/: Obtiene todos los usuarios (requiere autenticación).
   - GET /users/:id: Obtiene los datos de un usuario específico (requiere autenticación).
   - PUT /users/:id: Actualiza los datos de un usuario específico (requiere autenticación).
   - DELETE /users/:id: Elimina un usuario específico (requiere autenticación de administrador).
   - DELETE /users/inactive/delete: Elimina usuarios inactivos (requiere autenticación de administrador).
    
    Rutas de Autenticación

   - GET /auth/cookie: Obtiene la cookie de autenticación.
   - POST /auth/sign-in: Inicia sesión de usuario.
   - POST /auth/sign-out: Cierra sesión de usuario.
   - POST /auth/sign-up: Registra un nuevo usuario.
   - POST /auth/forgot-password: Envía un correo para restablecer la contraseña.
   - POST /auth/reset-password: Restablece la contraseña del usuario.
   - GET /auth/forgot-password/resetPassword: Renderiza la página de restablecimiento de contraseña.

    Rutas de Productos

   - GET /productos/: Obtiene todos los productos (requiere autenticación).
   - GET /productos/search: Realiza una búsqueda de productos (requiere autenticación).
   - GET /productos/all: Obtiene todos los productos (requiere autenticación).
   - GET /productos/category/:category: Obtiene productos por categoría (requiere autenticación).
   - GET /productos/images/:id: Obtiene la imagen de un producto específico (requiere autenticación).
   - POST /productos/: Agrega un nuevo producto (requiere autenticación y carga de imagen).
   - GET /productos/:id: Obtiene los datos de un producto específico (requiere autenticación).
   - PUT /productos/:id: Actualiza los datos de un producto específico (requiere autenticación).
   - DELETE /productos/:id: Elimina un producto específico (requiere autenticación y autorización VIP).

    Rutas de Pagos

   - POST /payments/payment-intents: Crea una intención de pago (requiere autenticación).

    Rutas de Carrito

   - GET /carrito/: Obtiene el carrito de compras del usuario autenticado.
   - GET /carrito/carritos: Obtiene todos los carritos de compras (requiere autenticación).
   - POST /carrito/: Crea un nuevo carrito de compras (requiere autenticación y sin acceso de administrador).
   - GET /carrito/:email: Obtiene el carrito de compras de un usuario específico (requiere autenticación).
   - POST /carrito/:id: Agrega un producto al carrito de compras (requiere autenticación y sin acceso de administrador).
   - PUT /carrito/:id: Agrega la misma cantidad de un producto al carrito de compras (requiere autenticación).
   - DELETE /carrito/:id: Elimina el carrito de compras del usuario autenticado (requiere autenticación).
   - DELETE /carrito/:id/:product_id: Elimina un producto específico del carrito de compras (requiere autenticación).
   - POST /carrito/:cart_id/:user_id: Realiza la compra del carrito de compras (requiere autenticación).
   - POST /carrito/order/new/:id: Crea una nueva orden de compra (requiere autenticación).

    Rutas del Panel de Administrador

   - GET /admin/: Obtiene el panel de administrador (requiere autenticación de administrador).
   - GET /admin/users: Obtiene todos los usuarios en el panel de administrador (requiere autenticación de administrador).
   - GET /admin/products-listing: Obtiene el listado de productos en el panel de administrador (requiere autenticación de administrador).

   - Nota: Los endpoints que requieren autenticación utilizan el middleware verifyToken para validar el token de autenticación. Algunos endpoints adicionales requieren permisos de administrador y VIP, y utilizan los middlewares verifyAdminToken y checkVIP respectivamente para realizar las validaciones correspondientes.

    Variables de Entorno

   - PORT
   - MONGO_PASS
   - PASS_GMAIL
   - USER_GMAIL
   - CLOUD_NAME
   - API_KEY
   - API_SECRET
   - SECRET_KEY_STRIPE
   - PUBLIC_KEY_STRIPE

    Dependencias de la Aplicación

   - La aplicación desarrollada en Node.js tiene las siguientes dependencias:

    Dependencias principales:

   - @faker-js/faker: Biblioteca para generar datos de prueba realistas.
   - axios: Cliente HTTP basado en promesas para realizar solicitudes a servicios web.
   - bcrypt: Librería para el hashing seguro de contraseñas.
   - bcryptjs: Implementación pura de JavaScript de bcrypt para el hashing seguro de contraseñas.
   - cloudinary: Servicio en la nube para almacenar y gestionar imágenes y archivos multimedia.
   - cluster: Módulo que permite crear un clúster de procesos para aprovechar el rendimiento de la CPU.
   - connect-mongo: Middleware para conectar y gestionar sesiones en MongoDB.
   - cookie-parser: Middleware para analizar las cookies en las solicitudes entrantes.
   - cors: Middleware para habilitar el intercambio de recursos de origen cruzado (CORS) en Express.
   - dotenv: Módulo para cargar variables de entorno desde un archivo .env.
   - ejs: Motor de plantillas para generar HTML dinámico en el servidor.
   - express: Framework web rápido y minimalista para Node.js.
   - express-compression: Middleware para habilitar la compresión de respuestas HTTP.
   - express-handlebars: Motor de plantillas para generar vistas HTML dinámicas en Express.
   - joi: Biblioteca de validación de datos para JavaScript.
   - jsonwebtoken: Implementación de JSON Web Tokens (JWT) para la autenticación y autorización.
   - minimist: Analizador de argumentos de línea de comandos.
   - moment: Biblioteca para manipular, formatear y mostrar fechas y horas en JavaScript.
   - mongoose: ODM (Object-Document Mapping) para MongoDB que facilita la interacción con la base de datos.
   - mongoose-delete: Plugin para eliminar lógicamente documentos en Mongoose.
   - multer: Middleware para el manejo de formularios multipart en Express y la carga de archivos.
   - nodemailer: Biblioteca para enviar correos electrónicos desde Node.js.
   - normalizr: Biblioteca para normalizar datos anidados en estructuras más simples.
   - passport: Middleware para la autenticación en Node.js.
   - passport-local: Estrategia de autenticación local para Passport.
   - pug: Motor de plantillas para generar vistas HTML en Express.
   - socket.io: Biblioteca para habilitar la comunicación en tiempo real mediante WebSockets.
   - stripe: Biblioteca para integrar pagos con la plataforma de Stripe.
   - swagger-jsdoc: Generador de especificaciones Swagger a partir de comentarios JSDoc.
   - swagger-ui-express: Middleware para mostrar la documentación de la API generada por Swagger en una interfaz de usuario interactiva.
   - sweetalert2: Biblioteca para mostrar hermosos diálogos y modales en el navegador.
   - twilio: Biblioteca para enviar mensajes de texto y realizar llamadas telefónicas mediante la API de Twilio.
   - uuid: Generador de identificadores únicos universalmente (UUID) en JavaScript.
   - validator: Biblioteca para validar y sanear datos de entrada en JavaScript.
   - winston: Biblioteca para el registro de registros (logs) en Node.js.

    Dependencias de desarrollo:

   - eslint: Herramienta de linting para JavaScript.
   - nodemon: Utilidad que reinicia automáticamente la aplicación Node.js cuando se detectan cambios

    Panel de Control de Administradores

   - Puedes acceder al panel administrativo de la ecommerce mediante la ruta '/admin', debes iniciar sección previamente   