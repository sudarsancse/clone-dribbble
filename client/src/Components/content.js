import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Header from "./header/Header";
import Footer from "./header/Footer";

function Content() {
  const history = useNavigate();

  const contentValid = async () => {
    let token = localStorage.getItem("usersdatatoken");
    //console.log(token);
    const res = await fetch("/validUser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorozition: token,
      },
    });
    const data = await res.json();
    //console.log(data);
    if (data.status === 401 || !data) {
      //console.log(" error page redirect");
      history("*");
    } else {
      console.log("user verify");
      history("/content");
    }
  };

  useEffect(() => {
    contentValid();
  }, []);

  return (
    <>
      <Header />
      <div className=" flex justify-center items-center h-96">
        <h1 className=" text-center text-8xl ">content</h1>
      </div>
      <Footer />
    </>
  );
}

export default Content;
