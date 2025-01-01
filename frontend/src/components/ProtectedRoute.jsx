import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useState, useEffect, use } from "react";
import Loader from "../components/LoadingIndicator.jsx"

function ProtectedRoute({children}){
    const [isAuthorized, setIsAuthorized] = useState(null)


    // This use effect hook is used when fetching data from an api
    useEffect(() =>{
        // Calling the auth function and if we catch any errors set the authorization to false
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refreshToken = async () =>{
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        
        // Trying the send the refresh token to the backend at the path that is used to create new access tokens 
        try{    
            // here refresh and access are the two variables that can be used with the help of django jwt authentication
            const res = await api.post("api/token/refresh/", {
                refresh : refreshToken
            }); 
            if (res.status === 200){
                // setting the newly fetched access token to the location of the expired access token
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                setIsAuthorized(true)
            }else{
                setIsAuthorized(false)
            }
        }catch (error) {
            console.log(error)
            setIsAuthorized(false)
        }
    }


    // Check if the access token is there or not and if it is valid or not, if it is not valid you could call the refresh function to get a new access token
    const auth = async () =>{
        const token = localStorage.getItem(ACCESS_TOKEN)
        if(!token){
            setIsAuthorized(false)
            return 
        }

        // This is for decoding the token and checking the validity 
        const decode = jwtDecode(token) 
        const tokenExpiration = decode.exp // Here the exp stands for expiration
        const now = Date.now()/1000 // This is to get the date in seconds

        // Checking if the current time is greater then the updated time for the access token
        if(tokenExpiration < now){
            await refreshToken() // calls the function to get a new access token
        }else{
            setIsAuthorized(true)
        }
    }


    if (isAuthorized == null){
        return <Loader />
    }
    return isAuthorized?children : <Navigate to="/login" />

}

export default ProtectedRoute