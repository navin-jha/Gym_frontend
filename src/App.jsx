import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import ScrollToTop from "./Components/ui/ScrollToTop";

function App() {
  const location = useLocation();

  // Dashboard ke sabhi pages
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <ScrollToTop />

      {/* Public Website Header */}
      {!isDashboard && <Header />}

      <main
        className={`flex-1 overflow-x-hidden ${
          isDashboard ? "" : "pt-24 bg-gray-100"
        }`}
      >
        <Outlet />
      </main>

      {/* Public Website Footer */}
      {!isDashboard && <Footer />}
    </div>
  );
}

export default App;
