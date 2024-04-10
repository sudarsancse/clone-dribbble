import React, {useState} from "react";
import bgmage from "../assets/background.webp";
import {NavLink, useNavigate} from "react-router-dom";

function Signup() {
  const history = useNavigate();

  const [error, setError] = useState("");

  const [inpval, setInpval] = useState({
    fname: "",
    username: "",
    email: "",
    password: "",
    privacy: false,
  });

  /*  console.log(inpval); */

  const Setval = (e) => {
    //console.log(e.target.value);
    const {name, value, type, checked} = e.target;
    const val = type === "checkbox" ? checked : value;
    setInpval(() => {
      return {
        ...inpval,
        [name]: val,
      };
    });
    // user name error hide
    if (name === "username") {
      setError("");
    }
  };

  const handleFocus = () => {
    setError("");
  };

  const addUserData = async (e) => {
    e.preventDefault();
    const {fname, username, password, email} = inpval;

    if (fname === "") {
      alert("Please enter your Name");
    } else if (username === "") {
      alert("Please enter your Username");
    } else if (email === "") {
      alert("Please enter your email");
    } else if (!email.includes("@")) {
      alert("Please enter your correct email");
    } else if (password === "") {
      alert("Please enter your password");
    } else if (password.length < 6) {
      alert("Password must be 6 characters");
    } else if (!inpval.privacy) {
      alert("Please accept the privacy agreement");
    } else {
      //console.log("User register succesfully done");
      try {
        const data = await fetch("/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fname,
            username,
            password,
            email,
            privacy: inpval.privacy,
          }),
        });

        const res = await data.json();

        if (data.status === 201) {
          setInpval({
            ...inpval,
            fname: "",
            username: "",
            email: "",
            password: "",
            privacy: false,
          });
          history("/avater?username=" + res.username);
        } else if (data.status === 422) {
          setError(res.error);
        }
      } catch (error) {
        console.log("Error:", error);
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  //send data to next page

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
        <p className=" hidden sm:mb-6 sm:block text-end">
          Already a member?
          <NavLink to="/Signin" className=" text-blue-700 underline">
            {" "}
            Sign in
          </NavLink>
        </p>
        <div className=" flex flex-col sm:items-center">
          <form className=" sm:w-[400px] ">
            <div className=" h-20">
              <h1 className=" font-bold text-2xl py-1">Sign up to Dribbble</h1>
              {error && <p className="text-red-500 text-xs">{error}</p>}
            </div>

            <div className=" sm:flex sm:gap-4">
              <div>
                <p className=" font-bold">Name</p>
                <input
                  onChange={Setval}
                  value={inpval.fname}
                  className=" cursor-pointer h-10 w-full bg-gray-200 px-4 mt-1 mb-2 rounded"
                  type="text"
                  name="fname"
                  placeholder="Enter your name"
                  autoComplete="off"
                />
              </div>
              <div>
                <p className=" font-bold">Username</p>
                <input
                  onFocus={handleFocus}
                  onChange={Setval}
                  value={inpval.username}
                  className=" cursor-pointer h-10 w-full bg-gray-200 px-4 mt-1 mb-2 rounded"
                  type="text"
                  name="username"
                  autoComplete="current-username"
                  placeholder="Enter your username"
                />
              </div>
            </div>
            <p className=" font-bold">Email</p>
            <input
              onChange={Setval}
              value={inpval.email}
              className=" cursor-pointer h-10 w-full bg-gray-200 px-4 mt-1 mb-2 rounded"
              type="email"
              name="email"
              autoComplete="username"
              placeholder="Enter your username"
            />
            <p className=" font-bold">Password</p>
            <input
              onChange={Setval}
              value={inpval.password}
              className=" cursor-pointer h-10 w-full bg-gray-200 px-4 mt-1 mb-2 rounded"
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="6+ characters"
            />
            <div className=" flex mb-3">
              <div>
                <input
                  name="privacy"
                  onChange={Setval}
                  checked={inpval.privacy}
                  className=" cursor-pointer m-2"
                  type="checkbox"
                />
              </div>
              <p className=" text-sm">
                Creating an account means you're okay with our terms of service,
                Privacy, and our default Notification Setting,
              </p>
            </div>
            <button
              onClick={addUserData}
              className=" bg-[#EA4B8B] mb-4 p-1 rounded-md w-40 text-center text-white"
            >
              Create Account
            </button>
            <p className=" hidden sm:block text-xs">
              This site is protected by Captcha and the Google
            </p>
            <p className=" hidden sm:block text-xs">
              Privacy Policy and Terms of Service apply
            </p>
            <p className=" sm:hidden">
              Already a member?{" "}
              <NavLink to="/Signin" className=" text-blue-700 underline">
                {" "}
                Sign in
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
