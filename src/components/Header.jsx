import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import open from "../assets/open.png";
import close from "../assets/close.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const handleOutsideClick = (event) => {
      const target = event.target;
      if (
        !target.closest(".hamburger-menu") &&
        !target.closest(".open-menu-btn")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div>
      <div className="quicksand bg-black text-white flex items-center justify-between pl-8 pr-8 p-4">
        <div className="logo w-full">
          <h2 className="text-center lg:text-left">IQLIPSE</h2>
        </div>
        <img
          src={open}
          alt="open menu"
          className="lg:hidden open-menu-btn"
          onClick={() => setIsOpen(!isOpen)}
        />
        <nav className="quicksand flex items-center justify-center hidden lg:block">
          <ul className="nav-links flex flex-row gap-4 text-md">
            <li className="hover:underline">
              <Link to="/">Home</Link>
            </li>
            <li className="hover:underline">
              <Link to="#trends" onClick={() => window.scrollTo(0, document.body.scrollHeight)}>Trends</Link>
            </li>
            <li className="hover:underline">
              <Link to="https://www.iqlipse.studio/">About</Link>
            </li>
            <li className="hover:underline">
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <div
          className={`fixed top-0 right-0 h-full bg-black text-white p-4 w-10/12 lg:w-1/3 transition-transform duration-300 transform ${
            isOpen ? "translate-x-0" : "translate-x-full"
          } hamburger-menu`}
        >
          <h1 className="julius text-2xl text-center p-4 underline">
            LOST YOUR WAY?
          </h1>
          <div className="absolute top-4 right-4">
            <img
              src={close}
              alt="close menu"
              onClick={() => setIsOpen(!isOpen)}
              className="h-8 w-8 cursor-pointer m-2"
            />
          </div>
          <div className="h-full flex flex-col justify-around">
            <ul className="h-fit flex flex-col justify-between">
              <div className="p-4 julius text-center">
                <Link
                  to="/home"
                  className="block m-4 bg-[#404040] p-3 rounded hover:bg-[#303030] cursor-pointer"
                >
                  Home
                </Link>
                <Link
                  to="/search"
                  className="block m-4 bg-[#404040] p-3 rounded hover:bg-[#303030] cursor-pointer"
                >
                  Search
                </Link>
                <a
                  href="https://www.iqlipse.studio/"
                  className="block m-4 bg-[#404040] p-3 rounded hover:bg-[#303030] cursor-pointer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contact Us
                </a>
              </div>
            </ul>
            <div className="julius">
              <Link
                to="/profile"
                className="block text-center m-4 bg-[#404040] p-3 rounded hover:bg-[#303030] cursor-pointer"
              >
                <button className="julius">Profile</button>
              </Link>
              <a
                href="/login"
                className="block text-center m-4 bg-red-600 p-3 rounded hover:bg-red-700 cursor-pointer"
              >
                <button>Logout</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
