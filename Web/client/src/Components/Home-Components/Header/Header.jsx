import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {

  const [open, setOpen] = useState(false);

  const links = [
    {
      id: 1,
      link: "Home",
      to: "/",
    },
    
    {
      id: 2,
      link: "Pricing",
      to:"/pricing",
    },
    {
      id: 3,
      link: "About Us",
      to: "/about-us",
    },
    {
      id: 4,
      link: "Contact Us",
      to: "/contact",
    },
    {
      id: 5,
      link: "Login",
      to:"/login",
      className:"mr-10 bg-gray-500 text-white px-6 ml-1 hover:bg-gray-600 hover:text-white",
    },
  ];

  return (
    <div>
      <div
        style={{ fontFamily: "Dancing Script" }}
        className="px-8 shadow-xl flex justify-between fixed top-0 z-50 items-center text-blue-700 w-full h-20 bg-white "
      >
        <div>
          <h1 className="text-3xl md:text-5xl md:ml-10 cursor-pointer"><Link to="/">VisuMeet</Link></h1>
        </div>
        <ul className="hidden md:flex">
          {links.map(({ id, to, link, className }) => (
            <Link
              key={id}
              to = {to}
              className={`px-4 duration-500 cursor-pointer hover:scale-105 py-2
              text-2xl font-bold hover:text-blue-800 hover:bg-blue-50 rounded-2xl ${className}`}
            >
              {link}
            </Link>
          ))}
        </ul>

        <div
          onClick={() => setOpen(!open)}
          className="cursor-pointer z-50 md:hidden"
        >
          {open ? <FaTimes className="text-white" size={20} /> : <FaBars size={20} />}
        </div>

        {open && (
          <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-gray-600 to-gray-800">
            {links.map(({ id, to, link }) => (
              <Link
                key={id}
                to= {to}
                className="px-4 py-6 duration-500 cursor-pointer hover:scale-105 
            text-4xl font-bold text-white hover:underline rounded-2xl"
              >
                {link}
              </Link>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  // );
};

export default Header;

// 29:00
