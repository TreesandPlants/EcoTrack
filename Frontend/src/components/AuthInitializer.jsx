import { useEffect } from "react";

function AuthInitializer(){

useEffect(()=>{

const token=

localStorage.getItem("token")

||

sessionStorage.getItem("token");

if(token){

console.log("User already logged in");

}

},[]);

return null;

}

export default AuthInitializer;