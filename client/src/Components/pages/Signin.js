import React, {useState} from "react";
import bgmage from "../assets/background.webp";
import {NavLink, useNavigate} from "react-router-dom";

function Signin() {
  const history = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [Typing, setTyping] = useState(false);

  const [validition, setValidition] = useState({
    username: "",
    password: "",
  });

  //console.log(validition);

  const data = (e) => {
    /* console.log(e.target.value); */
    const {name, value} = e.target;

    // User is typing, set typing to true
    setTyping(true);
    // Clear error message when user starts typing
    setErrorMessage("");
    setValidition(() => {
      return {
        ...validition,
        [name]: value,
      };
    });
  };

  const onHeandel = async (e) => {
    e.preventDefault();
    const {username, password} = validition;
    if (username === "") {
      alert("Please enter your Username");
    } else if (password === "") {
      alert("Please enter your password");
    } else if (password.length < 6) {
      alert("Password must be 6 charcter");
    } else {
      //console.log("User log in succesfull");
      const data = await fetch("/Signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const res = await data.json();
      //console.log(res);

      if (res.status === 201) {
        history("/content");
        //alert("User registation done");

        localStorage.setItem("usersdatatoken", res.result.token);
        setValidition({
          ...validition,
          username: "",
          password: "",
        });
      } else {
        // Password didn't match, show error message
        setErrorMessage("Invalid username or password. Please try again.");
      }
    }
  };

  return (
    <div className=" flex">
      <div className=" hidden sm:block sm:bg-[#C8E1FF] sm:w-9/12  sm:h-screen ">
        <h1 className=" px-12 pt-12 font-DancingScript text-3xl font-extrabold  text-[#EA4B8B]">
          dribbble
        </h1>
        <h1 className=" px-12  text-gray-500 font-bold text-2xl">
          Discover the world's top
        </h1>
        <h1 className=" px-12  text-gray-500 font-bold text-2xl">
          Designers & creatives
        </h1>
        <img src={bgmage} className=" mt-" alt="bgimage" />
        <p className="  text-gray-500 mt-10 px-12"> Art by sudarsan sarkar</p>
      </div>
      <div className=" p-8  w-screen">
        <p className=" hidden sm:block text-end">
          Create a account!{" "}
          <NavLink to="/" className=" text-blue-700">
            Sign up
          </NavLink>
        </p>
        <div className=" flex flex-col sm:items-center">
          <form className=" sm:w-[400px] ">
            <h1 className=" font-bold text-2xl py-10">Sign up to Dribbble</h1>
            <div className=" sm:flex sm:gap-4"></div>
            <p className=" font-bold">UserName</p>
            <input
              onChange={data}
              value={validition.username}
              className=" cursor-pointer h-10 w-full bg-gray-200 px-4 mt-1 mb-2 rounded"
              type="text"
              name="username"
              autoComplete="current-username"
              placeholder="Enter your username"
            />
            <p className=" font-bold">Password</p>
            <input
              onChange={data}
              value={validition.password}
              className=" cursor-pointer h-10 w-full bg-gray-200 px-4 mt-1 mb-2 rounded"
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="6+ characters"
            />
            <div className=" h-6">
              {errorMessage && (
                <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
              )}
            </div>
            <button
              onClick={onHeandel}
              className=" bg-[#EA4B8B] mb-4 p-1 rounded-md w-40 text-center text-white"
            >
              Sign in
            </button>
            <p className=" hidden sm:block text-xs">
              This site is protected byCaptcha and the Google
            </p>
            <p className=" hidden sm:block text-xs">
              Privacy Policy and Terms of Service apply
            </p>
            <p className=" sm:hidden">
              Create a account!{" "}
              <NavLink to="/" className=" text-blue-700">
                Sign up
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signin;
