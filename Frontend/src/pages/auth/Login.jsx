import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthInput from "../../components/auth/AuthInput";
import SocialLoginButton from "../../components/auth/SocialLoginButton";

import loginImage from "../../assets/auth/login-illustration.jpeg";

import PasswordInput from "../../components/auth/PasswordInput";

import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { applyUserPreferences } from "../../utils/preferences";
import { applyTheme } from "../../utils/theme";

import api from "../../services/api";

import { GoogleLogin } from "@react-oauth/google";

function Login() {

  console.log(loginImage);

  const navigate = useNavigate();

  const { i18n } = useTranslation();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({

    email: "",

    password: ""

  });

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  const handleLogin = async (e) => {
  e.preventDefault();

  if (!form.email || !form.password) {
    toast.error("Please fill all fields.");
    return;
  }

  try {
    setLoading(true);

    const response = await api.post(
      "/auth/login",
      form
    );

    const { token, user } = response.data;

    // =====================================
    // STORE USER INFORMATION
    // =====================================

    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "userId",
      user.id
    );

    localStorage.setItem(
      "full_name",
      user.full_name
    );

    localStorage.setItem(
      "email",
      user.email
    );

    localStorage.setItem(
      "picture",
      user.picture || ""
    );

    // =====================================
    // APPLY USER PREFERENCES
    // =====================================

    await applyUserPreferences(user);

    // =====================================
    // LOGIN SUCCESS
    // =====================================

    toast.success("Login Successful");

    navigate("/dashboard");

  } catch (err) {

    console.error(
      "Normal Login Error:",
      err
    );

    toast.error(
      err.response?.data?.message ||
      "Login Failed"
    );

  } finally {

    setLoading(false);

  }
};

  const handleGoogleSuccess = async (credentialResponse) => {

    try {

        const response = await api.post(
            "/google/login",
            {
                credential:
                    credentialResponse.credential
            }
        );

        const { token, user } = response.data;

        localStorage.setItem("token", token);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("full_name", user.full_name);
        localStorage.setItem("email", user.email);
        localStorage.setItem("picture", user.picture);

        await applyUserPreferences(user);
      
        toast.success("Welcome " + user.full_name);

        navigate("/dashboard");

    }

    catch(err){

        console.log(err);

        toast.error("Google Login Failed");

    }

};


  return (

<AuthLayout
image={loginImage}

title="Sign in to EcoTrack"

subtitle="Track your carbon footprint and continue your green journey."

>

<GoogleLogin
    onSuccess={handleGoogleSuccess}
    onError={() => toast.error("Google Login Failed")}
/>

<div className="flex items-center my-8">

<hr className="flex-1"/>

<span className="mx-4 text-gray-400">

OR

</span>

<hr className="flex-1"/>

</div>

<form
onSubmit={handleLogin}
className="space-y-5"
>

<AuthInput

label="Email"

type="email"

name="email"

placeholder="Enter your email"

value={form.email}

onChange={handleChange}

/>

<PasswordInput
  label="Password"
  name="password"
  value={form.password}
  onChange={handleChange}
  placeholder="Enter password"
/>

<div className="flex justify-between items-center mb-6">

<label className="flex items-center gap-2 text-gray-800">

<input type="checkbox"/>

Remember me

</label>

<Link

to="/forgot-password"

className="text-green-700 hover:underline"

>

Forgot Password?

</Link>

</div>

<button
type="submit"
disabled={loading}
className="
w-full

h-14

rounded-xl

bg-green-600

hover:bg-green-700

transition

font-semibold

text-lg

text-white

disabled:opacity-60
"
>

{

loading

?

"Signing in..."

:

"Sign In"

}

</button>

</form>

<p className="text-center mt-8">

Don't have an account?

{" "}

<Link

to="/register"

className="text-green-700 font-semibold"

>

Create one

</Link>

</p>

</AuthLayout>

  );

}

export default Login;