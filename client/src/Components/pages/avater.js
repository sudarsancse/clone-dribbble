import React, {useState, useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

function Avater() {
  const history = useNavigate();
  const location = useLocation();
  const [username, setUserName] = useState("");
  const [uploadedData, setUploadedData] = useState({
    img: "",
    location: "",
  });
  const [previewUrl, setPreviewUrl] = useState(""); // For storing the URL of the preview image

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const userIDFromQuery = searchParams.get("username");
    setUserName(userIDFromQuery);
  }, [location]);

  const handleValue = (e) => {
    const {name, value, files} = e.target;

    if (name === "img" && files.length > 0) {
      // If input type is file and a file is selected
      const file = files[0];
      setUploadedData((prevState) => ({
        ...prevState,
        img: file, // Store the file itself in the state
      }));

      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result); // Set preview URL for displaying the selected image
      };
      reader.readAsDataURL(file); // Read the file as data URL
    } else {
      // For other input fields
      setUploadedData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const addUserdata = async (e) => {
    e.preventDefault();

    const {img, location} = uploadedData;

    if (location === "") {
      alert("Please enter your location");
    } else {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("location", location);
      formData.append("img", img);

      try {
        const data = await fetch("/avater", {
          method: "POST",
          body: formData,
        });
        const res = await data.json();

        if (res.message === "Avatar data updated successfully") {
          history(`/choice?username=${username}`);
        } else {
          // Handle error or display a message indicating data was not saved
          console.error("Avatar data was not saved successfully");
        }
        console.log(res);
      } catch (error) {
        console.error("Error:", error);
        // Handle error
      }
    }
  };

  return (
    <div>
      <div className="pt-10 sm:pt-12 px-4 sm:px-10 text-4xl font-extrabold text-[#F14A8D]">
        <h1 className="font-DancingScript cursor-pointer">dribbble</h1>
      </div>
      <div className="flex flex-col sm:items-center">
        <div className="sm:w-[40%]">
          <h1 className="sm:mb-4 text-center sm:text-start text-2xl sm:text-3xl font-bold">
            Welcome! let's create your profile
          </h1>
          <p className="text-[11px] text-center sm:text-start sm:text-sm ">
            Let others get to know you better! you can do these later
          </p>
        </div>
        <div className="px-2 mt-4 sm:mt-10 sm:w-[40%]">
          <h1 className="font-bold">Add an avatar</h1>
          <form>
            <div className="flex gap-8 mt-4 sm:mt-8 mb-5 ">
              <img
                className={`w-[25%] h-[25%] rounded-full ${
                  previewUrl ? "" : "border-dashed border-gray-500 border-2"
                }`}
                src={
                  previewUrl ||
                  "https://img.lovepik.com/element/45001/3052.png_860.png"
                }
                alt="avatar img"
              />
              <div className="py-4">
                <input
                  className=" cursor-pointer w-48 sm:w-60"
                  name="img"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleValue}
                />
                <p className="text-[11px] sm:text-xs mt-2">
                  {"> "}Or choose one of our defaults
                </p>
              </div>
            </div>
            <p className="font-bold mb-3">Add your location</p>
            <input
              value={uploadedData.location}
              onChange={handleValue}
              className=" cursor-pointer border-b-2 w-full p-1 sm:px-2"
              type="text"
              name="location"
              placeholder="Enter a location"
            />
            <div className="flex flex-col sm:items-start items-center mb-4 mt-4">
              <button
                className="bg-[#EA4B8A] w-48 p-2 rounded-lg text-white"
                onClick={addUserdata}
              >
                Next
              </button>
              <p className="text-[11px] mt-1"> or press RETURN</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Avater;
