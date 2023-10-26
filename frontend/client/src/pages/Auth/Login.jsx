import { Link } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { resetRegistered, login  } from "../../features/user";
import { useState, useEffect } from "react";

export function Login() {
  
  const distpatch = useDispatch();  // Obtiene una función "dispatch" para enviar acciones a Redux
  const {loading} = useSelector(state => state.user) // Obtiene el estado "loading" del almacenamiento Redux
  const { token } = useSelector(state => state.user)
 
  const [formData, setFormData] = useState({ // Define un estado local para los datos del formulario
    email: '',
    password: '',
  });

  useEffect(() => {
    distpatch(resetRegistered());
  }, [distpatch]);

  const { email, password } = formData; // Extrae los valores de "email" y "password" del estado

  const onChange = e => { setFormData({ ...formData, [e.target.name]: e.target.value });} // Actualiza el estado con los cambios del formulario

	const onSubmit = e => {
		e.preventDefault();

    console.log('Token JWT:', token); // Agregar este registro de consola

    distpatch(login({ email, password })); // Envía una acción Redux para realizar el inicio de sesión
	};

  return (
  <Layout title='TalkTec | Login' content='Login page'>
    <h1>Inicia Sesión</h1>

    <form action="" onSubmit={onSubmit}>

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

      <Link to='/register'>Registrate</Link>

        <br />
        <br />

      <Link to='/home'>Iniciar Sesión</Link>

      {loading ? (
          <span className="loader"></span>
        ) : (
          <button>Iniciar Sesión</button>
        )
      }

    </form>

  </Layout>
  )
}