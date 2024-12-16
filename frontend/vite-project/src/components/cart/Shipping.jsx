import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from '../../actions/CartAction';
import MetaData from "../layout/MetaData";
import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { Country, State } from "country-state-city";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "./CheckoutSteps";

const Shipping = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };

  return (
    <Fragment>
      <MetaData title="Shipping Details" />

      <CheckoutSteps activeStep = {0}/>

      <div className="flex justify-center items-center sm:min-h-screen h-[40rem] bg-gray-100">
        <div className="bg-white shadow-md rounded-lg border border-gray-400 p-6 w-full max-w-md my-10">
          <h2 className="text-xl font-semibold uppercase mb-6 text-center">Shipping Details</h2>

          <form
            className="space-y-4"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <HomeIcon className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Address"
                required
                className="flex-1 p-2 outline-none"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <LocationCityIcon className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="City"
                required
                className="flex-1 p-2 outline-none"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <PinDropIcon className="text-gray-500 mr-2" />
              <input
                type="number"
                placeholder="Pin Code"
                required
                className="flex-1 p-2 outline-none"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <PhoneIcon className="text-gray-500 mr-2" />
              <input
                type="number"
                placeholder="Phone Number"
                required
                className="flex-1 p-2 outline-none"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div className="flex items-center border border-gray-300 rounded-md p-2">
              <PublicIcon className="text-gray-500 mr-2" />
              <select
                required
                className="flex-1 p-2 outline-none w-full"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div className="flex items-center border border-gray-300 rounded-md p-2">
                <TransferWithinAStationIcon className="text-gray-500 mr-2" />
                <select
                  required
                  className="flex-1 p-2 outline-none w-full"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              type="submit"
              value="Continue"
              className="w-full bg-customOrange-tomato text-white font-bold py-2 hover:bg-customOrange-tomatohover transition duration-200"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
