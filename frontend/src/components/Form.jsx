import { useState } from "react";
import api from "../api"
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"
import Loading from "../components/LoadingIndicator.jsx"

// The route would be the path that is needed to be followed
// The method tells the server that are we registering or logging in 
function Form({route, method}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const name = method === "login"?"login":"register"

    const handleSubmit = async (e) =>{
        // This will prevent the user from submitting the default form and also changes the default behaviour 
        setLoading(true);
        e.preventDefault();
        try{    
            const res = await api.post(route,{username, password})
            if(method === "login"){
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                navigate("/")
            }
            else{
                navigate("/login")
            }
        }catch(error){
            alert(error)
        }finally{
            setLoading(false)
        }
    }

    return <form onSubmit={handleSubmit} className = "form-container">
        <h1>{name}</h1>
        <input type="text" className="form-input" value={username} onChange={(e) =>setUsername(e.target.value)} placeholder="Username"/>
        <input type="password" className="form-input" value={password} onChange={(e) =>setPassword(e.target.value)} placeholder="Password"/>
        {loading?<Loading />:<></>}
        <button className = "form-button" type="submit">{name}</button>

    </form> 
}   

export default Form