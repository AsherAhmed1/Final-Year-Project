import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import classNames from "classnames";

const Header = () => {
  const [fOpen, fSetOpen] = useState(false);
  const dropdownRef = useRef(null);

  const links = [
    {
      id: 1,
      link: "Profile",
      to: "#",
    },
    {
      id: 2,
      link: "Logout",
      to: "#",
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        fSetOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [fOpen]);

  return (
    <div>
      <div>
        <div
          style={{ fontFamily: "Dancing Script" }}
          className="px-8 shadow-xl flex justify-between fixed top-0 z-50 items-center text-blue-700 w-full h-20 bg-white "
        >
          <div>
            <h1 className="text-3xl md:text-5xl md:ml-10 cursor-pointer">
              <Link to="/">VisuMeet</Link>
            </h1>
          </div>

          {/* For drop down menu */}

          {fOpen && (
            <ul
              ref={dropdownRef}
              className="flex flex-col justify-center items-center absolute top-0 right-10 mt-20 w-40 bg-white"
            >
              {links.map(({ id, to, link }) => (
                <Link
                  key={id}
                  to={to}
                  className="px-4 py-3 duration-500 cursor-pointer hover:scale-105 
            text-2xl font-bold text-blue-600 hover:underline rounded-2xl"
                >
                  {link}
                </Link>
              ))}
            </ul>
          )}

          <div className="text-2xl mx-10">
            <div
              onClick={() => fSetOpen(!fOpen)}
              className="cursor-pointer z-50 flex items-center "
            >
              <div>Name</div>
              {fOpen ? (
                <RiArrowDropUpLine size={20} />
              ) : (
                <RiArrowDropDownLine size={20} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
