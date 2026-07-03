import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LogOut,
} from "lucide-react";

function DashboardLayout({
  title = "Dashboard",
  welcomeText = "Welcome",
  menuItems = [],
  activePage,
  setActivePage,
  children,
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* ================= MOBILE TOPBAR ================= */}

      <header className="fixed md:hidden top-0 left-0 right-0 z-50 bg-white border-b shadow-sm">
        <div className="h-16 px-4 flex items-center justify-between">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <Menu size={24} />
          </button>

          <div className="text-center">
            <h2 className="font-bold text-blue-600">GYM ERP</h2>

            <p className="text-xs text-gray-500">{title}</p>
          </div>

          <div className="w-10" />
        </div>
      </header>

      {/* ================= MOBILE OVERLAY ================= */}

      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* ================= MOBILE SIDEBAR ================= */}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-2xl transition-transform duration-300 md:hidden
        ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Sidebar Header */}

        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-blue-600">GYM ERP</h2>

            <p className="text-sm text-gray-500 mt-1">{title}</p>
          </div>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X size={22} />
          </button>
        </div>

        {/* Sidebar Menu */}

        <div className="flex flex-col h-[calc(100%-92px)]">
          <ul className="flex-1 overflow-y-auto p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <li
                  key={item.key}
                  onClick={() => {
                    setActivePage(item.key);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200
                  ${
                    activePage === item.key
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  <Icon
                    size={20}
                    className={activePage === item.key ? "text-white" : ""}
                  />

                  <span className="font-medium">{item.label}</span>
                </li>
              );
            })}
          </ul>

          {/* Logout */}

          <div className="border-t p-4">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl py-3 flex items-center justify-center gap-2 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>
      {/* ================= DESKTOP SIDEBAR ================= */}

      <aside className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-white border-r shadow-lg flex-col z-30">
        {/* Logo */}

        <div className="h-20 flex items-center px-6 border-b">
          <div>
            <h2 className="text-2xl font-bold text-blue-600">GYM ERP</h2>

            <p className="text-sm text-gray-500">{title}</p>
          </div>
        </div>

        {/* Menu */}

        <div className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-2 px-3">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <li
                  key={item.key}
                  onClick={() => setActivePage(item.key)}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300
                  ${
                    activePage === item.key
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                  }`}
                >
                  <Icon
                    size={20}
                    className={
                      activePage === item.key
                        ? "text-white"
                        : "group-hover:text-blue-600"
                    }
                  />

                  <span className="font-medium">{item.label}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Logout */}

        <div className="border-t p-4">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white rounded-xl py-3 flex items-center justify-center gap-2 transition-all"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* ================= MAIN AREA ================= */}

      <div className="flex-1 md:ml-64 flex flex-col h-screen">
        {/* Desktop Header */}

        <header className="hidden md:flex sticky top-0 z-20 h-20 bg-white border-b shadow-sm px-8 items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {menuItems.find((item) => item.key === activePage)?.label ||
                title}
            </h1>

            <p className="text-gray-500 mt-1">{welcomeText}</p>
          </div>
        </header>

        {/* ================= CONTENT ================= */}

        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          <div className="p-4 md:p-8">
            <div className="bg-white rounded-2xl shadow-sm min-h-full p-4 md:p-6">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;