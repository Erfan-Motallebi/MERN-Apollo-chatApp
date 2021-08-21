import React, { useState } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AiFillWechat } from "react-icons/ai";
import { useContext } from "react";
import { authContext } from "../utils/context/context";

const MenuBar = () => {
  const pathname = window.location.pathname; // reactive router path
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const { user, logout } = useContext(authContext);

  const handleItemClick = (e, { name }) => setActiveItem(name);
  return (
    <div>
      {user?.username ? (
        <Menu secondary pointing stackable color="violet" size="massive">
          <Menu.Item>
            <AiFillWechat className="aiChat" />
          </Menu.Item>
          <Menu.Item
            name={user.username}
            active
            icon="user"
            as={Link}
            to={{ pathname: "/" }}
          />

          <Menu.Menu position="right">
            <Menu.Item
              name="logout"
              onClick={logout}
              as={Link}
              to={{ pathname: "/login" }}
            />
          </Menu.Menu>
        </Menu>
      ) : (
        <Menu secondary pointing stackable color="violet" size="massive">
          <Menu.Item>
            <AiFillWechat className="aiChat" />
          </Menu.Item>
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={handleItemClick}
            icon="home"
            as={Link}
            to={{ pathname: "/" }}
          />

          <Menu.Menu position="right">
            <Menu.Item
              name="login"
              active={activeItem === "login"}
              onClick={handleItemClick}
              icon="sign-in"
              as={Link}
              to={{ pathname: "/login" }}
              replace={true}
            />
            <Menu.Item
              name="register"
              active={activeItem === "register"}
              onClick={handleItemClick}
              icon="registered"
              as={Link}
              to={{ pathname: "/register" }}
            />
          </Menu.Menu>
        </Menu>
      )}
    </div>
  );
};

export default MenuBar;
