import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css'; // Assuming you have a CSS file for styling
import uzlogo from '../assets/uzlogo.png'; // Adjust the path as necessary
export default function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="sidebar-logo-container">
        <img src={uzlogo} alt="Logo"  />
      </div>
      <div className='sidebar-title-container'>
        <h2 className="sidebar-title">Water Valve Control System</h2>

      </div>
      
      
      <div className='sidebar-links'>
        <ul>
        <li>
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/statistics" className={({ isActive }) => (isActive ? 'active' : '')}>
            Statistics
          </NavLink>
        </li>
        <li>
          <NavLink to="/account" className={({ isActive }) => (isActive ? 'active' : '')}>
            Account
          </NavLink>
        </li>
      </ul>

      </div>
      
    </nav>
  );
}
