import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { applyTheme } from "./utils/theme";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/Register";
import Calculator from "./pages/Calculator";
import ProtectedRoute from "./components/ProtectedRoute";
import History from "./pages/History";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import About from "./pages/About";
import Help from "./pages/Help";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";
import Achievements from "./pages/Achievements";
import PageTransition from "./components/PageTransition";
import AnimatedBackground from "./components/AnimatedBackground";
import LoadingScreen from "./components/LoadingScreen";
import CinematicLoader from "./components/CinematicLoader";
import Report from "./pages/Report";
import ScrollToTop from "./components/ScrollToTop";
import AuthInitializer from "./components/AuthInitializer";
import PreferenceInitializer
  from "./components/PreferenceInitializer";

function AnimatedRoutes() {

  const location = useLocation();

  return (

    <AnimatePresence mode="wait">

      <Routes
        location={location}
        key={location.pathname}
      >

        {/* All your routes go here */}

      </Routes>

    </AnimatePresence>

  );

}

function App() {
  const [loading, setLoading] = useState(true);

useEffect(() => {

  const savedTheme =
      localStorage.getItem("theme") ||
      "light";

    applyTheme(savedTheme);

  }, []);

useEffect(() => {

  const timer = setTimeout(() => {

    setLoading(false);

  }, 3500);

  return () => clearTimeout(timer);

}, []);

if (loading) {

  return <CinematicLoader />;

}

  return (
    <BrowserRouter>
    <PreferenceInitializer/>
    <ScrollToTop/>
    <AnimatedBackground/>
    <Routes>
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />

        <Route path="/register" element={<PageTransition><Register /></PageTransition>} />

        <Route path="*" element={<div className="min-h-screen dark:bg-gray-950 text-gray-900 dark:text-gray-200 transition-colors duration-300">
        <Routes>
        <Route path="/" element={<PageTransition><Layout><Home /></Layout></PageTransition>} />

        <Route path="/calculator" element={<PageTransition><Layout><Calculator /></Layout></PageTransition>}/>
        
        <Route path="/history" element={<ProtectedRoute><PageTransition><Layout><History /></Layout></PageTransition></ProtectedRoute>}/>

        <Route path="/dashboard" element={<ProtectedRoute><PageTransition><Layout><Dashboard /></Layout></PageTransition></ProtectedRoute>}/>

        <Route path="/profile" element={<ProtectedRoute><PageTransition><Layout><Profile /></Layout></PageTransition></ProtectedRoute>} />

        <Route path="/settings" element={<PageTransition><Layout><Settings /></Layout></PageTransition>} />

        <Route path="/about" element={<PageTransition><Layout><About /></Layout></PageTransition>} />

        <Route path="/help" element={<PageTransition><Layout><Help /></Layout></PageTransition>} />

        <Route
path="/report"
element={<ProtectedRoute><Report/></ProtectedRoute>}
/>
        <Route
  path="/achievements"
  element={
    <Layout>
      <Achievements />
    </Layout>
  }
/>
<Route path="*" element={<NotFound />}/></Routes></div>}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;