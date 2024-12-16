import React from "react";
import { Button } from "@material-ui/core";
import MetaData from "../../MetaData";

const ContactUs = () => {
  return (
   <>
   <MetaData title="Contact - Rudra"/>
   <div className="flex flex-col items-center justify-center lg:h-screen h-96 bg-gray-50 p-4">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Contact Us</h2>

      <div className="bg-white p-6 border border-gray-300 shadow-xl text-center w-full max-w-md">
        <p className="text-sm text-gray-800 mb-4">
          Feel free to reach out for any inquiries!
        </p>

        <a href="mailto:rudrapratapyadav141@gmail.com" className="w-full">
          <Button
            variant="contained"
            color="primary"
            className="w-full py-2 bg-blue-600 text-white hover:bg-blue-700 transition duration-200"
          >
            Contact: rudrapratapyadav141@gmail.com
          </Button>
        </a>
      </div>
    </div>
   </>
  );
};

export default ContactUs;
