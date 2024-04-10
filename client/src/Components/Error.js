import React from "react";
import Header from "./header/Header";
import Footer from "./header/Footer";

function Error() {
  return (
    <>
      <Header />
      <div className=" flex flex-col justify-center items-center h-96">
        <h1 className=" text-center text-8xl text-red-500">Error</h1>
        <p> 404 page not found</p>
      </div>
      <Footer />
    </>
  );
}

export default Error;
