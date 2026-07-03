import React, { useState, useEffect } from "react";
import Hero from "./homeComponents/Hero";
import Stats from "./homeComponents/Stats";
import Features from "./homeComponents/Features";
import Dashboard from "./homeComponents/Dashboard";
import Testimonials from "./homeComponents/Testimonials";
import FAQ from "./homeComponents/FAQ";
import Contact from "./homeComponents/Contact";

export default function Home() {
  const [activePage, setActivePage] = useState("home");
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [activePage]);
  return (
    <>
      <Hero />
      <Stats />
      <Features />
      <Dashboard />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
