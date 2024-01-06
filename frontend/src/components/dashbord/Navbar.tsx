
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const buttonRef = useRef(null);
  
    const displayResponsiveMenu = () => {
      setIsOpen(!isOpen);
    };
  
    const handleOutsideClick = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        event.target !== buttonRef.current
      ) {
        setIsOpen(false);
      }
    };
  
    useEffect(() => {
      document.addEventListener('mousedown', handleOutsideClick);
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }, []);
  
    return (
      <nav>
        <div className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
          <div className="flex items-center flex-shrink-0 text-white mr-6">
                         
            <span className="font-semibold text-xl tracking-tight ml-2">
              Random User App
            </span>
          </div>
          <div className="block lg:hidden">
            <button
              ref={buttonRef}
              onClick={displayResponsiveMenu}
              className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
            >
              {isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-3 h-3"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="fill-current h-3 w-3"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Menu</title>
                  <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                </svg>
              )}
            </button>
          </div>
          <div
            className="w-full lg:block flex-grow lg:flex lg:items-center lg:w-auto hidden"
            ref={menuRef}
          >
            <div className="text-lg lg:flex-grow">
              <Link
                to="/users"
                className="block mt-4 lg:mt-0 text-teal-200 hover:text-white mr-4"
              >
                Users
              </Link>
            </div>
          </div>
        </div>
        {isOpen ? (
          <div className="flex items-center justify-between flex-wrap bg-teal-500 pl-6 pt-2 pb-2">
            <ul>
              <li>
                <Link
                  to="/users"
                  className="block lg:mt-0 text-teal-200 hover:text-white mr-4"
                >
                  Users
                </Link>
              </li>
            </ul>
          </div>
        ) : null}
      </nav>
    );
  };
  
  export default NavBar;