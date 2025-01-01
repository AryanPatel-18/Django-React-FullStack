import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Register from "./pages/Register.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"

function Logout() { 
    // For clearing out the refresh and the access tokens 
    localStorage.clear()
    return <Navigate to = "/login" />
}


// This is done so that the local storage is cleared first before a new account is created to prevent clash of access token and refresh tokens that could possible cause an error
function RegisterAndLogout(){
    localStorage.clear()
    return <Register/> 
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          exact path="/"
          element = {
            // This is done so that you cannot access the home page unless you have the access and the refresh tokens that are generated efrom the protected route file
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>}
        />
        
        <Route exact path="/login" element = {<Login />} />
        <Route exact path="/logout" element = {<Logout />} />
        <Route exact path="/register" element ={ <RegisterAndLogout />}></Route>
        <Route exact path="*" element ={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
