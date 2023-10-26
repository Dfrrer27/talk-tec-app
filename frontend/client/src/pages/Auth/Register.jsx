import { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { API_URL } from '../../config/index';
import { register } from "../../features/user";
import { Link } from "react-router-dom";

export function Register() {

  const dispatch = useDispatch();
  // Extrae información del estado global utilizando Redux
  const { registered, loading } = useSelector(state => state.user);

  // Estado local para almacenar la lista de carreras tecnológicas
  const [carreras, setCarreras] = useState([]);

  useEffect(() => {
    // Realizar la solicitud para obtener la lista de carreras
    fetch(`${API_URL}/api/users/carreras-tecnologicas`)
      .then((response) => response.json())
      .then((data) => {
        setCarreras(data);
      })
      .catch((error) => {
        console.error('Error al obtener las carreras tecnológicas', error);
      });
  }, []);

  const [formData, setFormData] = useState({
    codigo: '',
    email: '',
    nombre: '',
    apellido: '',
    carrera: '',
    password: '',
  });

  const { codigo, email, nombre, apellido, carrera, password } = formData;

  const onChange = e => {
    // Manejamos el cambio en los campos del formulario actualizando el estado local 
    setFormData({ ...formData, [e.target.name]: e.target.value });}

	const onSubmit = e => {
		e.preventDefault();

    // Envía una solicitud para registrar un nuevo usuario usando Redux
		dispatch(register({ codigo, email, nombre, apellido, carrera, password }));
	};

  // Si el registro es exitoso, redirige al usuario a la página de inicio de sesión
  if (registered) return <Navigate to='/login' />;

  return (
  <Layout title='TalkTec | Register' content='Register page'>
    <h1>Registrate</h1>

    <form action="" onSubmit={onSubmit}>
      <div>
        <label htmlFor="codigo">Codigo:</label>
        <input 
          type="number"
          name="codigo" 
          onChange={onChange}
          value={codigo}
          required/>
      </div>

      <br />
      <br />

      <div>
        <label htmlFor="email">Gmail:</label>
        <input 
          type="email"
          name="email" 
          onChange={onChange}
          value={email}
          required/>
      </div>

      <br />
      <br />

      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input 
          type="text"
          name="nombre" 
          onChange={onChange}
          value={nombre}
          required/>
      </div>

      <br />
      <br />

      <div>
        <label htmlFor="apellido">Apellido:</label>
        <input 
          type="text"
          name="apellido" 
          onChange={onChange}
          value={apellido}
          required/>
      </div>

      <br />
      <br />

      <div>
        <label htmlFor="carrera">Departamento:</label> 
        <select
          name="carrera"
          onChange={onChange}
          value={carrera}
          required
          >
          <option value="">Selecciona una carrera</option>
            {carreras.map((carrera) => (
            <option key={carrera.id} value={carrera.id}>
              {carrera.nombre}
            </option>
            ))}
        </select>
      </div>

      <br />
      <br />

      <div>
        <label htmlFor="password">Contraseña:</label>
        <input 
          type="password"
          name="password" 
          onChange={onChange}
          value={password}
          required/>
      </div>

      <br />
      <br />
      
      <Link to='/login'>Ya tienes cuenta?</Link>

        <br />
        <br />

      <Link to='/home'>Registrarte</Link>

      {loading ? (
					<span className="loader"></span>
				) : (
					<button>Registrarte</button>
				)
      }

    </form>

  </Layout>
  )
}