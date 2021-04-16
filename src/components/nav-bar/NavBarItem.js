import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { isLogin } from "../../middleware/auth";
import getLoggedUser from "../../utils/getLoggedUser";
import { Modal, Alert } from "react-bootstrap";
import Status from "../member/forms/Status";

const NavBarItem = (props) => {
  const loggedUser = getLoggedUser();
  const [statusModal, setStatusModal] = useState(false);
  const [userData, setUserData] = useState({ active: null, id: null });
  let privateItems = [
    { class: "nav-item", name: "News", to: "/news" },
    { class: "nav-item", name: "Organisations", to: "/organisation" },
  ];

  if (loggedUser)
    if (loggedUser.role === "super_admin") {
      privateItems = [
        { class: "nav-item", name: "News", to: "/news" },
        { class: "nav-item", name: "Organisations", to: "/organisation" },
        { class: "nav-item", name: "Members", to: "/members" },
      ];
    } else if (loggedUser.role === "admin") {
      privateItems = [
        { class: "nav-item", name: "News", to: "/news" },
        { class: "nav-item", name: "Members", to: "/members" },
        { class: "nav-item", name: "Payments", to: "/payments" },
        {
          class: "nav-item",
          name: "My Profile",
          to: "/members/" + loggedUser.id,
        },
      ];
    } else if (loggedUser.role === "member") {
      privateItems = [
        { class: "nav-item", name: "News", to: "/news" },
        { class: "nav-item", name: "Status", to: "/members" },
        {
          class: "nav-item",
          name: "My Profile",
          to: "/members/" + loggedUser.id,
        },
      ];
    }
  const publicItems = [
    { class: "glyphicon glyphicon-log-in", name: "Login", to: "/login" },
    { class: " ", name: "Register", to: "/register" },
  ];

  const changeStatusModal = (userActive = null, userId = null) => {
    setStatusModal(!statusModal);
    setUserData({ active: userActive, id: userId });
  };

  return (
    <>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
      <Modal
        size="lg"
        backdrop="static"
        keyboard={false}
        show={statusModal}
        onHide={changeStatusModal}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Status active={userData.active} id={userData.active} />
      </Modal>

      <ul className="nav navbar-nav navbar-right">
        {privateItems.map((item) => {
          if (item.name !== "Status") {
            return (
              <li key={item.name} className={`${item.class} navbar-brand`}>
                <NavLink className="nav-link  " to={item.to}>
                  {item.name}
                </NavLink>
              </li>
            );
          } else if (loggedUser) {
            return (
              <li key={"Status"} className="navbar-brand">
                <button
                  onClick={() =>
                    changeStatusModal(loggedUser.active, loggedUser.id)
                  }
                  className={`btn ${
                    loggedUser.active
                      ? "btn-outline-status-active"
                      : "btn-outline-status-inactive"
                  }   w-150 `}
                >
                  {loggedUser.active ? "ACTIVE" : "IN ACTIVE"}
                </button>
              </li>
            );
          }
        })}

        {!isLogin() ? (
          publicItems.map((item) => {
            return (
              <li key={item.name} className="navbar-brand">
                <NavLink
                  to={item.to}
                  className=" nav-link btn btn-outline-app w-150 "
                >
                  {" "}
                  <span className={item.class}></span> {item.name}
                </NavLink>
              </li>
            );
          })
        ) : (
          <>
            {loggedUser.role === "admin" ? "" : ""}
            <li className=" navbar-brand dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {loggedUser.firstName + " " + loggedUser.lastName}
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <NavLink
                    className="dropdown-item"
                    to={"/members/" + loggedUser.id}
                  >
                    My profile
                  </NavLink>
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/change-password">
                    Change password
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <NavLink className="dropdown-item" to="/logout">
                    Logout
                  </NavLink>
                </li>
              </ul>
            </li>
          </>
        )}
      </ul>
    </>
  );
};

export default NavBarItem;
