import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen top-0 p-8">
      <h1 className="text-4xl font-bold text-center mb-10 ">
        Task Management System
      </h1>
      {children}
    </div>
  );
};

export default Layout;
