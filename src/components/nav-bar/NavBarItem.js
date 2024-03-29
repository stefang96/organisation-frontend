import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { isLogin } from "../../middleware/auth";
import getLoggedUser from "../../utils/getLoggedUser";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import StatusModal from "../payments/forms/StatusModal";
import ChangePassword from "../auth/ChangePassword";

const NavBarItem = (props) => {
  const loggedUser = getLoggedUser();
  const [statusModal, setStatusModal] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [userData, setUserData] = useState({ active: null, id: null });

  useEffect(() => {}, [props.loggedIn, props.loggedActive]);
  let privateItems = [
    { className: "nav-item", name: "News", to: "/news" },
    { className: "nav-item", name: "Organisations", to: "/organisation" },
  ];

  if (loggedUser)
    if (loggedUser.role === "super_admin") {
      privateItems = [
        { className: "nav-item", name: "News", to: "/news" },
        { className: "nav-item", name: "Organisations", to: "/organisation" },
        { className: "nav-item", name: "Members", to: "/members" },
      ];
    } else if (loggedUser.role === "admin") {
      privateItems = [
        { className: "nav-item", name: "News", to: "/news" },
        { className: "nav-item", name: "Members", to: "/members" },
        {
          className: "nav-item",
          name: "My Organisaton",
          to: "/my-organisation/" + loggedUser.organisation.id,
        },
        {
          className: "nav-item",
          name: "My Profile",
          to: "/my-profile/" + loggedUser.id,
        },
        { className: "nav-item", name: "Payments", to: "/payments" },
      ];
    } else if (loggedUser.role === "member") {
      privateItems = [
        { className: "nav-item", name: "News", to: "/news" },
        { className: "nav-item", name: "Status", to: "/members" },
        {
          className: "nav-item",
          name: "My Organisaton",
          to: "/my-organisation/" + loggedUser.organisation.id,
        },
        {
          className: "nav-item",
          name: "My Profile",
          to: "/my-profile/" + loggedUser.id,
        },
      ];
    }
  const publicItems = [
    {
      className: "glyphicon glyphicon-log-in",
      name: "Sign In",
      to: "/sign-in",
    },
    { className: " ", name: "Sign Up", to: "/sign-up" },
  ];

  const changeStatusModal = () => {
    setStatusModal(!statusModal);
  };

  const changeUserData = (userActive = null, userId = null) => {
    setStatusModal(!statusModal);
    setUserData({ active: userActive, id: userId });
  };

  const changePasswordModal = () => {
    setChangePassword(!changePassword);
  };

  return (
    <>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
      <Modal
        show={statusModal}
        dialogClassName="modal-30w"
        aria-labelledby="example-custom-modal-styling-title"
        onHide={changeStatusModal}
      >
        <StatusModal
          changeModal={changeStatusModal}
          active={userData.active}
          id={userData.id}
        />
      </Modal>

      <Modal
        show={changePassword}
        dialogClassName="modal-30w"
        aria-labelledby="example-custom-modal-styling-title"
        onHide={changePasswordModal}
      >
        <ChangePassword changeModal={changePasswordModal} />
      </Modal>

      <ul className="nav navbar-nav navbar-right">
        {privateItems.map((item) => {
          if (item.name !== "Status") {
            return (
              <li key={item.name} className={`${item.className} navbar-brand`}>
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
                    changeUserData(loggedUser.active, loggedUser.id)
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
                  <span className={item.className}></span> {item.name}
                </NavLink>
              </li>
            );
          })
        ) : (
          <>
            {loggedUser.role === "admin" ? "" : ""}
            <li className=" navbar-brand dropdown">
              <span
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {loggedUser.firstName + " " + loggedUser.lastName}
              </span>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <NavLink
                    className="dropdown-item"
                    to={"/my-profile/" + loggedUser.id}
                  >
                    My profile
                  </NavLink>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => changePasswordModal()}
                  >
                    Change password
                  </button>
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

const mapSateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    loggedActive: state.auth.loggedActive,
  };
};

export default connect(mapSateToProps)(NavBarItem);
