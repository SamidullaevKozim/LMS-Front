import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const App = () => {
  const [token, setToken] = useState(null);
  const [decode, setDecode] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        setToken(storedToken);
        setDecode(jwtDecode(storedToken));
      } catch (err) {
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <Routes>
      {!token && (
        <>
          <Route
            path="/"
            element={<Login setToken={setToken} setDecode={setDecode} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </>
      )}

      {token && (
        <>
          <Route path="/layout/*" element={<Layout decode={decode} />} />
          <Route path="*" element={<Navigate to="/layout" />} />
        </>
      )}
    </Routes>
  );
};

export default App;