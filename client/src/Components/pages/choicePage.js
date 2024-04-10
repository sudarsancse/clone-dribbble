import React, {useState, useEffect} from "react";
import {NavLink, useNavigate, useLocation} from "react-router-dom";
import deginer from "../assets/deginer.jpg";
import Hire from "../assets/hire-diginer.jpg";
import inspration from "../assets/inspration.jpg";

function Choice() {
  const history = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [choiceData, setChoiceData] = useState({
    designer: false,
    HireDesigner: false,
    inspiration: false,
  });

  //console.log(choiceData);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const usernameFromParams = searchParams.get("username");
    setUsername(usernameFromParams);
  }, [location]);

  const setVal = (e) => {
    //console.log(e.target.value);
    const {name, value, type, checked} = e.target;
    const val = type === "checkbox" ? checked : value;
    setChoiceData(() => {
      return {
        ...choiceData,
        [name]: val,
      };
    });
  };

  const addUserData = async (e) => {
    e.preventDefault();
    const {designer, HireDesigner, inspiration} = choiceData;
    if (!designer && !HireDesigner && !inspiration) {
      alert("click at list one");
    } else {
      try {
        const data = await fetch("/choice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            designer,
            HireDesigner,
            inspiration,
            username,
          }),
        });

        const res = await data.json();
        console.log(res);
        if (data.status === 201) {
          setChoiceData({
            ...choiceData,
            designer: false,
            HireDesigner: false,
            inspiration: false,
            username: "",
          });
          history("/verification?username=" + res.username);
        } else if (data.status === 422) {
          console.log("catch block error");
        }
      } catch (error) {
        console.log("catch block error");
      }
    }
  };

  return (
    <div>
      <div className="pt-10 sm:pt-12 px-4 sm:px-10 text-4xl font-extrabold text-[#F14A8D]">
        <h1 className="font-DancingScript cursor-pointer ">dribbble</h1>
      </div>
      <div className=" mt-6">
        <h1 className=" text-center text-3xl font-extrabold mb-2">
          What brings you to Dribbble?
        </h1>
        <p className=" text-center text-xs p2">
          Select the option that can best discribe you. Don't worry, you can
          explore other options later
        </p>
      </div>
      <form>
        <div className=" flex flex-wrap mt-8 px-6 justify-center gap-4">
          <div className="cursor-pointer group flex flex-col items-center w-[300px] text-center p-4 border-2 rounded-[20px] hover:border-[#F14A8D]">
            <img
              src={deginer}
              className=" h-40 rounded-md overflow-hidden"
              alt="designer"
            />
            <h1 className=" font-extrabold text-xl mt-2 px-4 text-slate-800">
              I'm a designer looking to share my work
            </h1>
            <div className=" h-12">
              <p className=" text-center text-xs hidden group-hover:block px-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <label
              className="relative flex items-center p-3 rounded-full cursor-pointer"
              htmlFor="customStyle"
            >
              <input
                onChange={setVal}
                name="designer"
                type="checkbox"
                className="before:content[''] peer relative h-[20px] w-[20px] cursor-pointer appearance-none rounded-full border border-gray-900/20 bg-gray-900/10 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#F14A8D] checked:bg-[#F14A8D] checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
                id="customStyle"
              />
              <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
          </div>
          {/* box 2*/}
          <div className=" cursor-pointer group flex flex-col items-center w-[300px] text-center p-4 border-2 rounded-[20px] hover:border-[#F14A8D]">
            <img
              src={Hire}
              className="h-40 rounded-md overflow-hidden"
              alt="hire designer"
            />
            <h1 className=" font-extrabold text-xl mt-2 px-4 text-slate-800">
              I'm a looking to hire a designer
            </h1>
            <div className=" h-12">
              <p className=" text-center text-xs hidden group-hover:block px-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <label
              className="relative flex items-center p-3 rounded-full cursor-pointer"
              htmlFor="customStyle"
            >
              <input
                onChange={setVal}
                name="HireDesigner"
                type="checkbox"
                className="before:content[''] peer relative h-[20px] w-[20px] cursor-pointer appearance-none rounded-full border border-gray-900/20 bg-gray-900/10 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#F14A8D] checked:bg-[#F14A8D] checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
                id="customStyle"
              />
              <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
          </div>
          {/* box 3*/}
          <div className=" cursor-pointer group flex flex-col items-center w-[300px] text-center p-4 border-2 rounded-[20px] hover:border-[#F14A8D]">
            <img
              src={inspration}
              className="h-40 rounded-md overflow-hidden"
              alt="inspiration"
            />
            <h1 className=" font-extrabold text-xl mt-2 px-4 text-slate-800">
              I'm a looking for designer inspiration
            </h1>
            <div className=" h-12">
              <p className=" text-center text-xs hidden group-hover:block px-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <label
              className="relative flex items-center p-3 rounded-full cursor-pointer"
              htmlFor="customStyle"
            >
              <input
                onChange={setVal}
                name="inspiration"
                type="checkbox"
                className="before:content[''] peer relative h-[20px] w-[20px] cursor-pointer appearance-none rounded-full border border-gray-900/20 bg-gray-900/10 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#F14A8D] checked:bg-[#F14A8D] checked:before:bg-gray-900 hover:scale-105 hover:before:opacity-0"
                id="customStyle"
              />
              <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth="1"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
          </div>
        </div>
      </form>
      <div className=" flex justify-center mt-8 ">
        <button
          onClick={addUserData}
          className=" bg-[#F8B8D0] w-52 h-10 rounded-lg text-white hover:bg-[#EB4B8E]"
        >
          Finish
        </button>
      </div>
    </div>
  );
}

export default Choice;
