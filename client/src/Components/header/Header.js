import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faBars,
  faXmark,
  faBriefcase,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

function Header(props) {
  const [showMenu, setShowMenu] = useState(false);
  const [imageData, setImageData] = useState(null);
  const ID = props.userId;

  useEffect(() => {
    if (ID) {
      sendIdToBackend(ID);
    }
  }, [ID]);

  const sendIdToBackend = async (userId) => {
    try {
      const response = await fetch("/sendId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userId}),
      });

      if (response.ok) {
        //console.log("ID sent to backend successfully.");
        const data = await response.json();
        //console.log("Received image data:", data.img);
        setImageData(data.img);
      } else {
        console.error("Failed to send ID to backend.");
      }
    } catch (error) {
      console.error("Error sending ID to backend:", error);
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <div className=" flex border-b-2 p-4 w-full  justify-between">
      <div className=" flex gap-4 sm:gap-6">
        <h1 className=" cursor-pointer font-DancingScript font-bold text-2xl sm:text-3xl">
          dribbble
        </h1>
        <button onClick={toggleMenu} className=" sm:hidden">
          <FontAwesomeIcon icon={showMenu ? faXmark : faBars} />
        </button>

        <ul
          className={`sm:flex sm:flex-row gap-4 items-center ${
            showMenu
              ? "absolute w-full py-4 px-4 left-0 top-14 bg-slate-200"
              : "hidden"
          }`}
        >
          <li className=" flex justify-center sm:hidden">
            <div className="relative">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className=" cursor-pointer absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 pl-3"
              />
              <input
                type="search"
                name=""
                id=""
                placeholder="search"
                className="pl-10 py-1 pr-4 rounded-lg border bg-[#F2F5F4] border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
          </li>
          <Link to="/">
            <li className=" text-center sm:py-0 py-2 sm:hover:underline underline-offset-8 font-medium sm:text-[#74727C]">
              Inspration
            </li>
          </Link>
          <Link to="/">
            <li className=" text-center sm:py-0 py-2 sm:hover:underline underline-offset-8 font-medium sm:text-[#74727C]">
              Find Work
            </li>
          </Link>
          <Link to="/">
            <li className=" text-center sm:py-0 py-2 sm:hover:underline underline-offset-8 font-medium sm:text-[#74727C]">
              {" "}
              learn Design
            </li>
          </Link>
          <Link to="/">
            <li className=" text-center sm:py-0 py-2 sm:hover:underline underline-offset-8 font-medium sm:text-[#74727C]">
              Go Pro
            </li>
          </Link>
          <Link to="/">
            <li className=" text-center sm:py-0 py-2 sm:hover:underline underline-offset-8 font-medium sm:text-[#74727C]">
              Hire Designers
            </li>
          </Link>
        </ul>
      </div>
      <div className=" flex gap-2 items-center px-1">
        <div className="relative hidden sm:block">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className=" cursor-pointer absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-400 pl-3"
          />
          <input
            type="search"
            name=""
            id=""
            placeholder="search"
            className="pl-10 py-1 pr-4 rounded-lg border bg-[#F2F5F4] border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        <FontAwesomeIcon icon={faBriefcase} className=" cursor-pointer" />
        <img className=" w-8 rounded-full" src={imageData} alt="User" />
        <button className=" text-xs sm:text-base bg-[#E94A89] hover:bg-[#E94A89] sm:w-24 w-14  h-8 rounded-lg  text-white">
          Upload
        </button>
      </div>
    </div>
  );
}

export default Header;
