import { Link } from "react-router-dom";
import logo from "../../assets/BoxShopLogo.png";
import "./sidebar.css";

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <ul className="links">
        <li>
          <Link to="/catalog">Catalogo</Link>
        </li>
        <li>
          <Link to="/last-product">Ultimo Producto</Link>
        </li>
        <li>
          <Link to="/counter">Cantidades</Link>
        </li>
        <li>
          <Link to="/users">Usuarios</Link>
        </li>
        <li>
          <Link to="/categories">Categorías</Link>
        </li>
      </ul>
    </div>
  );
};