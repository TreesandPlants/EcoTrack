import { useState } from "react";
import api from "../services/api";
import GlassCard from "../components/GlassCard";
import AnimatedButton from "../components/AnimatedButton";
import AuthInput from "../components/auth/AuthInput";
import PasswordInput from "../components/auth/PasswordInput";
import AuthLayout from "../components/auth/AuthLayout";
import loginImage from "../assets/auth/login-illustration.jpeg";
import toast from "react-hot-toast";

function Register() {

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.full_name || !form.email || !form.password) {
  toast.error("Please fill all required fields.");
  return;
}

if (form.password.length < 8) {
  toast.error(
    "Password must contain at least 8 characters."
  );
  return;
}

if (
  form.confirmPassword &&
  form.password !== form.confirmPassword
) {
  toast.error("Passwords do not match.");
  return;
}

    try {

      const response = await api.post(
        "/auth/register",
        form
      );
      
      alert(response.data.message);

    } catch (error) {

      alert("Registration Failed");

      console.log(error);
    }
  };

  return (
    <AuthLayout
    image={loginImage}
    
    title="Create an Account"
    
    subtitle="Entering into the world of Prevention of Disasters."
    
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <GlassCard>
        <h1 className="text-3xl font-bold text-center mb-6">
          Register
        </h1>

        <AuthInput
          id="Full Name"
          name="full_name"
          type="text"
          placeholder="Enter your full name"
          className="w-full border p-3 mb-4 rounded"
          value={form.full_name}
          onChange={handleChange}
        />

        <AuthInput
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <PasswordInput
  label="Password"
  name="password"
  value={form.password}
  onChange={handleChange}
  placeholder="Create a password"
/>

<PasswordInput
  label="Confirm Password"
  name="confirmpassword"
  value={form.confirmpassword}
  onChange={handleChange}
  placeholder="Confirm your password"
/>

        <AnimatedButton
          className="w-full bg-green-700 text-white p-3 rounded my-5"
        >
          Register
        </AnimatedButton>

        </GlassCard>

      </form>

    </AuthLayout>
  );
}

export default Register;