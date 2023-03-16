import { BrowserRouter, Routes, Route } from "react-router-dom";
import History from "./pages/History";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import { ReactKeycloakProvider } from "@react-keycloak/web";

import keycloak from "./util/keycloak";

function App() {
  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <BrowserRouter>
        <Routes>
          <Route path="/:id?" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="history/:id" element={<History />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ReactKeycloakProvider>
  );
}

export default App;
