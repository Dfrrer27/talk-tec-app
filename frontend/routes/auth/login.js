const express = require('express');
const cookie = require('cookie');
const cors = require('cors');
const fetch = (...args) =>
	import('node-fetch').then(({ default: fetch }) => fetch(...args));

const router = express.Router();

const corsOptions = {
	origin: 'http://localhost:5173', // Reemplaza esto con la URL de tu aplicación React
	methods: 'GET, POST',
	credentials: true,
  };

router.use(cors(corsOptions));

router.post('/api/users/login', async (req, res) => {
	const { email, password } = req.body;

	const body = JSON.stringify({ email, password });

	try {
		const apiRes = await fetch('http://localhost:8000/api/token/', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body,
			credentials: 'include',
		});

		const data = await apiRes.json();

		if (apiRes.status === 200) {
			res.setHeader('Set-Cookie', [
				cookie.serialize('access', data.access, {
					httpOnly: true,
					maxAge: 60 * 30,
					path: '/api/',
					sameSite: 'strict',
					secure: process.env.NODE_ENV === 'production',
				}),
				cookie.serialize('refresh', data.refresh, {
					httpOnly: true,
					maxAge: 60 * 60 * 24,
					path: '/api/',
					sameSite: 'strict',
					secure: process.env.NODE_ENV === 'production',
				}),
			]);

			return res.status(200).json({ success: 'Inicie sesión exitosamente' });
		} else {
			return res.status(apiRes.status).json(data);
		}
	} catch (err) {
		console.error(err);
		return res.status(500).json({
			error: 'Algo salió mal al iniciar sesión',
		});
	}
});

module.exports = router;