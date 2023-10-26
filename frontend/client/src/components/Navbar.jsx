import { arrows, display, feedback, help, logo, logout, profile, search, setting } from '../importImages';
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import './styles/navbar-styles.css'

export function Navbar() {

  const { isAuthenticated } = useSelector((state) => state.user);
  
  const authLinks = (
    <>
    <nav>
      <Link className="nav-left" to='/home'>
        <img src={logo} alt="Logo-TalkTec" className="logo" />  
        <h2>TalkTec</h2>
      </Link>

      <div className="search-box">
          <img src={search} />
          <input type="text" placeholder="Search" />
      </div>

      <div className="nav-right">

        <div className="nav-user-icon online"> {/* modificar onclick = onclick="settingsMenuToggle()" */}
          <img src={profile} />
        </div>
          
        {/* settings menu */}
        
        <div className="settings-menu">

          <div id="dark-btn" className="dark-btn">
            <span></span>
          </div>

          <div className="settings-menu-inner">
            <div className="user-profile">
              <img src={profile} />
                <div>
                  <p>Diego Ferrer</p>
                  <a href="#">See your profile</a>
                </div>
            </div>

            <hr />

            <div className="user-profile">
              <img src={feedback} />
                <div>
                  <p>Give Feedback</p>
                  <a href="#">Help us to improve the new design</a>
                </div>
            </div>

            <hr />

            <div className="settings-links">
              <img src={setting} className="settings-icon" />
              <a href="#">Settings & Privacy <img src={arrows} width="10px" /></a>
            </div>

            <div className="settings-links">
              <img src={help} className="settings-icon" />
                <a href="#">Help & Support<img src={arrows} width="10px" /></a>
            </div>

            <div className="settings-links">
              <img src={display} className="settings-icon" />
              <a href="#">Display & Accessibility <img src={arrows} width="10px" /></a>
            </div>

            <div className="settings-links">
              <img src={logout} className="settings-icon" />
              <a href="#">Logout<img src={arrows} width="10px" /></a>
            </div>


          </div>
            
        </div>
       
      </div>
        
    </nav>
    </>
  )

  return (
    <>
      {isAuthenticated && authLinks }
    </>
  )
}