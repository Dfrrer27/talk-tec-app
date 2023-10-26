// Quiero almacenar el acceso y que actualice los tokens dentro de las cookies
const express = require('express'); // express
const cookieParser = require('cookie-parser'); // Middleware para analizar cookies
const path = require('path'); // manejar ruta de archivos

require('dotenv').config(); // require para dotenv, luego llamar directo a la configuracion, Configura variables de entorno desde un archivo .env 

// Rutas de autenticacion
const loginRoute = require('./routes/auth/login');
const meRoute = require('./routes/auth/me');
const registerRoute = require('./routes/auth/register');

// Crear la aplicacion express
const app = express();

// Configurar aplicación de express
app.use(express.json()); 
app.use(cookieParser());

// Rutas de autenticacion de la aplicacion
app.use(loginRoute);
app.use(meRoute);
app.use(registerRoute);

app.use(express.static('client/dist')); //archivos estaticos que express reconoce y sirve de compilacion
app.get('*', (req, res) => {
    return res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
})

const PORT = process.env.PORT || 5000;

console.log(`Escuchando en el puerto ${PORT}`)

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
