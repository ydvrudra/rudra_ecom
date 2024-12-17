import React from "react";
import rudra from "../../../images/rsz_rudra.jpg";
import { Button, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import MetaData from "../MetaData";

const AboutUs = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/rudra.ydv_";
  };

  return (
  <>
  <MetaData title="About - Rudra"/>
    <div className="flex flex-col items-center py-10 px-4 bg-gray-50">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">About Us</h2>

      <div className="flex flex-col md:flex-row items-center md:space-x-10 space-y-8 md:space-y-0 bg-white p-6 md:p-10 border shadow-lg w-full max-w-4xl">
        {/* Founder Section */}
        <div className="flex flex-col items-center text-center md:w-1/2">
          <Avatar
            className="w-32 h-32 mb-4"
            src={rudra}
            alt="Founder"
          />
          <h2 className="text-2xl font-bold text-gray-900">Rudra Yadav</h2>
          <h2 className="text-red-600 text-sm font-medium">Mern Stack Developer</h2>
          <Button
            onClick={visitInstagram}
            color="primary"
            className="mt-3 text-blue-600 hover:text-blue-800"
          >
            Visit Instagram
          </Button>
          <p className="text-gray-900 mt-4 px-4">
            This is a sample website made by @Rudrayadav with the purpose to
            teach MERN Stack.
          </p>
        </div>

        {/* Social Section */}
        <div className="flex flex-col items-center md:w-1/2 space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Our Brands</h2>
          <div className="flex space-x-6">
            <a
              href="https://www.youtube.com/channel/@rudrapratapyadav1990"
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 hover:text-red-700 transition duration-200"
            >
              <YouTubeIcon style={{ fontSize: 40 }} />
            </a>
            <a
              href="https://instagram.com/rudra.ydv_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-800 transition duration-200"
            >
              <InstagramIcon style={{ fontSize: 40 }} />
            </a>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default AboutUs;
