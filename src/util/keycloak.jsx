import Keycloak from "keycloak-js";

const initOptions = {
  url: "http://localhost:8080/",
  realm: "ebank-test-realm",
  clientId: "ebank-app-client",
  onLoad: "login-required",
  checkLoginIframe: false,
};

const keycloak = new Keycloak(initOptions);

export default keycloak;
