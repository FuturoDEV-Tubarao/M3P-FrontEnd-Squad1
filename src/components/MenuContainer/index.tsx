import React from "react";

interface MenuContainerProps {
  currentPage: "home" | "dashboard";
  children: React.ReactNode;
}

const MenuContainer: React.FC<MenuContainerProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default MenuContainer;
