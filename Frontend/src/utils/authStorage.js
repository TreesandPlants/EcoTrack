export const getStorage = () => {

return localStorage.getItem("token")

? localStorage

: sessionStorage;

};