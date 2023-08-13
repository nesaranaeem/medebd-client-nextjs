"use client"; // This is a client component 👈🏽
import React, { useState, useEffect, useRef } from "react";
import { Transition } from "@headlessui/react";
import { FaBars, FaXmark, FaSun, FaMoon } from "react-icons/fa6";
import Link from "next/link";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItemsList = [
    {
      title: "Medicines",
      path: "/medicines",
      items: [
        { title: "Generics", path: "/medicines/generics" },
        { title: "Brand Names", path: "/medicines/brand-names" },
        { title: "Indication", path: "/medicines/indication" },
        { title: "All Medicines", path: "/medicines" },
      ],
    },
    { title: "Doctors", path: "/doctors" },
    { title: "Hospitals", path: "/hospitals" },
  ];

  useEffect(() => {
    // You can implement your dark mode toggle functionality here
  }, [darkMode]);

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center">
              <img
                className="block h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Logo"
              />
            </div>
          </Link>

          {/* Light and Dark Mode Toggle (Centered) */}
          <div className="flex items-center justify-center flex-grow">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-md text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {darkMode ? (
                <FaSun className="h-8 w-8" aria-hidden="true" />
              ) : (
                <FaMoon className="h-8 w-8" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Desktop Menu (Right side) */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItemsList.map((item, index) =>
              item.items ? (
                <DropdownMenu
                  key={index}
                  title={item.title}
                  items={item.items}
                  darkMode={darkMode}
                />
              ) : (
                <NavItem key={index} title={item.title} path={item.path} />
              )
            )}
          </div>

          {/* Mobile Menu */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? (
                <FaXmark className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FaBars className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <Transition
        show={isOpen}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div className="md:hidden" ref={ref}>
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {menuItemsList.map((item, index) =>
                item.items ? (
                  <DropdownMenuMobile
                    key={index}
                    title={item.title}
                    items={item.items}
                    darkMode={darkMode}
                  />
                ) : (
                  <NavItemMobile
                    key={index}
                    title={item.title}
                    path={item.path}
                  />
                )
              )}
            </div>
          </div>
        )}
      </Transition>
    </nav>
  );
};

const DropdownMenu = ({ title, items, darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={closeMenu}
      style={{ zIndex: 9999 }}
    >
      <div
        onClick={toggleMenu}
        className={`cursor-pointer px-3 py-2 text-sm font-medium text-white rounded-md focus:outline-none hover:bg-${
          darkMode ? "gray-700" : "gray-600"
        }`}
      >
        {title}
      </div>
      <Transition
        show={isOpen}
        as="div" // Use a <div> instead of a <Transition> wrapper
        enter="transition ease-out duration-100"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
        className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-1"
        style={{ zIndex: 9999 }}
      >
        {items.map((item, index) => (
          <Link href={item.path} passHref key={index}>
            <span // Use <a> instead of <div> as the link wrapper
              className={`block px-4 py-2 text-sm text-white hover:bg-${
                darkMode ? "gray-700" : "gray-600"
              }`}
            >
              {item.title}
            </span>
          </Link>
        ))}
      </Transition>
    </div>
  );
};

const DropdownMenuMobile = ({ title, items, darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div
        onClick={toggleMenu}
        className={`cursor-pointer block w-full px-3 py-2 text-base font-medium text-white rounded-md focus:outline-none hover:bg-${
          darkMode ? "gray-700" : "gray-600"
        }`}
      >
        {title}
      </div>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-75"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        {(ref) => (
          <div
            className="absolute left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-1"
            ref={ref}
            onClick={(e) => {
              // Prevent clicks within the dropdown from closing it
              e.stopPropagation();
            }}
          >
            {items.map((item, index) => (
              <Link href={item.path} passHref key={index}>
                {/* Replace <a> with <div> here */}
                <div
                  className={`block px-4 py-2 text-sm text-white hover:bg-${
                    darkMode ? "gray-700" : "gray-600"
                  }`}
                >
                  {item.title}
                </div>
              </Link>
            ))}
          </div>
        )}
      </Transition>
    </div>
  );
};

const NavItem = ({ title, path }) => {
  return (
    <Link href={path} passHref>
      <div className="cursor-pointer px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-gray-700">
        {title}
      </div>
    </Link>
  );
};

const NavItemMobile = ({ title, path }) => {
  return (
    <Link href={path} passHref>
      <div className="cursor-pointer block w-full px-3 py-2 text-base font-medium text-white rounded-md hover:bg-gray-700">
        {title}
      </div>
    </Link>
  );
};

export default NavBar;
