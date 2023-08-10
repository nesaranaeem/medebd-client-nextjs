"use client"; // This is a client component 👈🏽
import React from "react";
import Link from "next/link";

const Footer = () => {
  const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE || "Your Site Title";

  return (
    <footer className="bg-gray-800 py-4 border-t-2 border-indigo-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center md:justify-between">
          {/* Footer Logo */}
          <Link href="/">
            <div className="flex items-center">
              {/* <img
                className="block h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt="Logo"
              /> */}
            </div>
          </Link>

          {/* Footer Links */}
          <div className="hidden md:flex space-x-4">
            <FooterLink title="Home" path="/" />
            <FooterLink title="About Us" path="/about" />
            <FooterLink title="Contact" path="/contact" />
            <FooterLink title="Privacy Policy" path="/privacy-policy" />
          </div>
        </div>

        {/* Copyright Text */}
        <div className="text-center mt-4 text-white text-sm">
          &copy; {new Date().getFullYear()} {siteTitle}. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ title, path }) => {
  return (
    <Link href={path} passHref>
      <div className="cursor-pointer text-white hover:text-gray-400">
        {title}
      </div>
    </Link>
  );
};

export default Footer;
