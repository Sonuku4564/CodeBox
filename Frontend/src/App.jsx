import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./Screens/Global/LandingPage"


function App() {
  return (
    <>
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
    </>
  )
}

export default App
