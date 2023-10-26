const express = require('express');
const cors = require('cors'); // Importa el módulo de CORS
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();

const corsOptions = {
	origin: 'http://localhost:5173', // Reemplaza esto con la URL de tu aplicación React
	methods: 'GET, POST',
	credentials: true, // Asegúrate de incluir las credenciales
};
  
router.use(cors(corsOptions)); // Usa CORS con las opciones definidas

router.get('/api/users/me', async (req, res) => {
	const { access } = req.cookies;
	console.log("Access Token:", access);

	try {
		const apiRes = await fetch('http://localhost:8000/api/users/me', {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${access}`,
			},
		});

		const data = await apiRes.json();

		return res.status(apiRes.status).json(data);
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			error: 'Algo salió mal al intentar recuperar el usuario',
		});
	}
});

module.exports = router;