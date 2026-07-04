import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaArrowRight,
  FaBars,
  FaDumbbell,
  FaSignOutAlt,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isLoggedIn = sessionStorage.getItem("token");
  const isDashboard = location.pathname.startsWith("/dashboard");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };
  const navLinks = [
    {
      name: "Login",
      path: "/login",
    },
    {
      name: "Register",
      path: "/register",
    },
  ];

  return (
    <>
      <motion.header
        initial={{
          y: -80,
        }}
        animate={{
          y: 0,
        }}
        transition={{
          duration: 0.45,
        }}
        className={`fixed inset-x-0 top-0 z-[999] transition-all duration-300 ${
          scrolled
            ? "bg-secondary/95 backdrop-blur-2xl border-b border-white/10 shadow-lg shadow-black/30"
            : "bg-secondary/40 backdrop-blur-xl"
        }`}
      >
        <div className="content">
          <div className="flex h-24 items-center justify-between">
            {/* Logo */}

            <Link to="/" className="flex items-center gap-4 shrink-0">
              <div className="center h-14 w-14 rounded-card bg-primary shadow-button text-white">
                <FaDumbbell className="text-xl" />
              </div>

              <div>
                <h2 className="text-3xl font-black leading-none text-white">
                  GYM
                  <span className="text-primary">PRO</span>
                </h2>

                <p className="mt-1 text-[11px] uppercase tracking-[5px] text-white/40">
                  Gym ERP
                </p>
              </div>
            </Link>

            {/* Right */}

            <div className="hidden lg:flex items-center gap-4">
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className="font-semibold text-white/70 transition hover:text-white"
                  >
                    Sign In
                  </Link>

                  <Link
                    to="/register"
                    className="button-primary flex items-center gap-3"
                  >
                    Get Started
                    <FaArrowRight />
                  </Link>
                </>
              ) : (
                <>
                  {!isDashboard && (
                    <Link
                      to="/dashboard"
                      className="button-secondary border-white/10 bg-white/5 text-white flex items-center gap-3"
                    >
                      <FaUserCircle />
                      Dashboard
                    </Link>
                  )}

                  <button
                    onClick={logout}
                    className="button-primary flex items-center gap-3"
                  >
                    <FaSignOutAlt />
                    Logout
                  </button>
                </>
              )}
            </div>

            {/* Mobile */}

            <button
              onClick={() => setMenuOpen(true)}
              className="lg:hidden center h-12 w-12 rounded-card border border-white/10 bg-white/5 text-white"
            >
              <FaBars />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[998] bg-black/70 backdrop-blur-sm"
            />

            <motion.aside
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              transition={{
                duration: 0.3,
              }}
              className="fixed right-0 top-0 z-[999] flex h-screen w-[88%] max-w-sm flex-col border-l border-white/10 bg-secondary"
            >
              <div className="flex items-center justify-between border-b border-white/10 p-6">
                <div className="flex items-center gap-3">
                  <div className="center h-12 w-12 rounded-card bg-primary text-white">
                    <FaDumbbell />
                  </div>

                  <div>
                    <h2 className="text-2xl font-black text-white">
                      GYM
                      <span className="text-primary">PRO</span>
                    </h2>

                    <p className="text-[11px] uppercase tracking-[4px] text-white/40">
                      Gym ERP
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setMenuOpen(false)}
                  className="center h-10 w-10 rounded-card border border-white/10 text-white"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="flex flex-1 flex-col px-6 py-8">
                <div className="space-y-2">
                  {navLinks.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-card px-5 py-4 text-lg font-semibold text-white/70 transition hover:bg-white/5 hover:text-white block"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="mt-auto border-t border-white/10 pt-6">
                  {!isLoggedIn ? (
                    <div className="space-y-4">
                      <Link
                        to="/login"
                        onClick={() => setMenuOpen(false)}
                        className="button-secondary w-full flex justify-center border-white/10 bg-white/5 text-white"
                      >
                        Sign In
                      </Link>

                      <Link
                        to="/register"
                        onClick={() => setMenuOpen(false)}
                        className="button-primary w-full flex justify-center items-center gap-3"
                      >
                        Get Started
                        <FaArrowRight />
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {!isDashboard && (
                        <Link
                          to="/dashboard"
                          onClick={() => setMenuOpen(false)}
                          className="button-secondary w-full flex justify-center items-center gap-3 border-white/10 bg-white/5 text-white"
                        >
                          <FaUserCircle />
                          Dashboard
                        </Link>
                      )}

                      <button
                        onClick={() => {
                          logout();
                          setMenuOpen(false);
                        }}
                        className="button-primary w-full flex justify-center items-center gap-3"
                      >
                        <FaSignOutAlt />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
