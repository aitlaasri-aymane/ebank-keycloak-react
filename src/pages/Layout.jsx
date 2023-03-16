import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  faArrowRightFromBracket,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useKeycloak } from "@react-keycloak/web";
import toast, { Toaster } from "react-hot-toast";

const Layout = () => {
  const { keycloak } = useKeycloak();
  const [title, setTitle] = useState("");

  return (
    <div className="h-full">
      <div className="absolute h-[50vh] bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 w-full shadow-2xl"></div>
      <div className="container mx-auto w-full flex flex-col h-full justify-center items-center">
        <h1 className="text-neutral-300 mb-2 text-4xl z-[1]">{title}</h1>
        <Toaster />

        {keycloak.authenticated ? (
          <>
            <Outlet context={[title, setTitle]} />
            <button
              className="btn absolute top-5 right-5"
              onClick={() => keycloak.logout()}
            >
              Logout{` ${keycloak.tokenParsed.preferred_username}`}
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                className="ml-3"
              />
            </button>
          </>
        ) : (
          <button className="btn z-10" onClick={() => keycloak.login()}>
            Login
            <FontAwesomeIcon icon={faArrowRightToBracket} className="ml-3" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Layout;
