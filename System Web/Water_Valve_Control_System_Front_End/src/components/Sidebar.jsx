import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <h2 className="sidebar-title">Water Valve Control System</h2>
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
    </nav>
  );
}
