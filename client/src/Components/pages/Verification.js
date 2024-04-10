import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Header from "../header/Header";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelopeCircleCheck} from "@fortawesome/free-solid-svg-icons";
import Footer from "../header/Footer";

function Verification() {
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [getData, setGetData] = useState({
    email: "",
    id: "",
  });

  //console.log(username);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const usernameFromParams = searchParams.get("username");
    setUsername(usernameFromParams);
    if (usernameFromParams) {
      sendUsernameToBackend(usernameFromParams);
    }
  }, [location]);

  const sendUsernameToBackend = async (username) => {
    try {
      const response = await fetch("/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username: username}),
      });

      if (response.ok) {
        // console.log("Username sent to backend successfully.");
        const data = await response.json();
        setGetData({email: data.email, id: data.id});
      } else {
        console.error("Failed to send username to backend.");
      }
    } catch (error) {
      console.error("Error sending username to backend:", error);
    }
  };

  return (
    <>
      <Header userId={getData.id} />
      <div className=" px-4 pb-6 sm:px-[450px]">
        <div className=" flex flex-col gap-3 justify-center text-center pt-8 sm:pt-20">
          <h1 className=" text-xl sm:text-3xl font-extrabold">
            Please verify your email....
          </h1>
          <FontAwesomeIcon
            icon={faEnvelopeCircleCheck}
            className=" h-16 text-gray-400"
          />
          <p className=" text-[#74727C] font-medium text-xs">
            Please verify your email address. We've sent a confirmation email
            to:
          </p>
          <h1 className=" font-extrabold">{getData.email} </h1>
          <p className=" text-[#74727C] font-medium text-xs">
            click the confirmation link in that email to using Dribbble,
          </p>
          <p className=" text-[#74727C] font-medium text-xs">
            Didn't receive the email? Check your spam folder, it may have been
            caught by a filter. if you still don't see it, you can
            <span className=" cursor-pointer text-[#EA4B8A]">
              {" "}
              resend the confirmation email.
            </span>
          </p>
          <p className=" text-[#74727C] font-medium text-xs">
            Wrong email address?{" "}
            <span className=" cursor-pointer text-[#EA4B8A]">Change it.</span>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Verification;
