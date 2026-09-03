function AuthButton({

children,

onClick,

type="button"

}){

return(

<button

type={type}

className="auth-btn"

onClick={onClick}

>

{children}

</button>

);

}

export default AuthButton;