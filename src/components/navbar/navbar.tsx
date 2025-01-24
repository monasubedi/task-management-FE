import { useRef } from "react";
import { BiMenu } from "react-icons/bi";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./navbar.css";

const Navbar = () => {
  const menuRef = useRef<HTMLDivElement>(null);
  const { logout } = useAuth();

  const handleOpenMenu = () => {
    if (menuRef.current) {
      menuRef.current.style.right = "0px";
    }
  };

  const handleCloseMenu = () => {
    if (menuRef.current) {
      menuRef.current.style.right = "-350px";
    }
  };

  return (
    <nav className="navbar">
      <div className="navbarWrapper">
        <Link to={"/"}>
          <div className="logo">Taskify</div>
        </Link>

        <div className="navItemsWrapper">
          <ul>
            <Link to={"/task-list"}>
              <li>My Tasks</li>
            </Link>
            <Link to={"/create-task"}>
              <li>Create a task</li>
            </Link>
            <Link to={"/settings"}>
              <li className="user">
                <span>M</span>
              </li>
            </Link>
          </ul>
          <div onClick={logout}>
            <button className="logout">Logout</button>
          </div>
        </div>
        <div className="navMenu" onClick={handleOpenMenu}>
          <BiMenu size={35} />
        </div>
        <div className="navItemsMobile" ref={menuRef}>
          <IoClose className="close" onClick={handleCloseMenu} size={35} />
          <div className="navItemsMobile__wrapper">
            <ul>
              <Link to={"/task-list"}>
                <li>My Tasks</li>
              </Link>
              <Link to={"/create-task"}>
                <li>Create a task</li>
              </Link>
              <Link to={"/settings"}>
                <li className="user">
                  <span>M</span>
                </li>
              </Link>
            </ul>
            <div onClick={logout}>
              <button className="logout">Logout</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
