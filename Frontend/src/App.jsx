import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import LandingPage from "./Screens/LandingPage";
import HomePage from "./Screens/HomePage"; 
import EditorPage from "./Screens/EditorPage";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth0();
  return isAuthenticated ? children : <Navigate to="/" />;
};

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="App">
      <Routes>
        {/* If the user is authenticated, show HomePage, otherwise show LandingPage */}
        <Route path="/" element={isAuthenticated ? <HomePage /> : <LandingPage />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/editor"
          element={
            <ProtectedRoute>
              <EditorPage />
            </ProtectedRoute>
          }
        />

      </Routes>
    </div>
  );
}

export default App;
