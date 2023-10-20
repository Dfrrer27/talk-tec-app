import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export function Navbar() {

  const { isAuthenticated } = useSelector(state => state.user);

  const authLinks = (

    <>
      <li className="nav-item">
        <NavLink className='nav-link' to='/home'>
          Home
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink className='nav-link' to='/dashboard'>
          Dashboard
        </NavLink>
      </li>

      <li className="nav-item">
        <a className='nav-link' href="#!">
          Cerrar Sesión
        </a>
      </li>

    </>
  )

  const guestLinks = (
    <>
      <li className="nav-item">
        <NavLink className='nav-link' to='/login'>
          Login
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className='nav-link' to='/register'>
          Register
        </NavLink>
      </li> 
    </>
  )

  // const location = useLocation();
  //   const hideNavbarOnRoutes = ['/login', '/register'];

  //   if (hideNavbarOnRoutes.includes(location.pathname)) {
  //       return null; // No renderizar el Navbar en las rutas especificadas
  //   }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">

          <Link className="navbar-brand" to='/home'>Talktec App</Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">

              { isAuthenticated ? authLinks : guestLinks }
            </ul>
          </div>

        </div>
      </nav>
    </>
  )
}