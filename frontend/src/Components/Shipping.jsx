import React, { useState } from "react";
import styles from "../Styles/UserRegistration.module.css";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../Actions/cart";
// import MetaData from "../layout/MetaData";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import { Country, State, City } from "country-state-city";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import BadgeIcon from "@mui/icons-material/Badge";
import * as Yup from "yup";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Button as MuiButton } from "@mui/material";

const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [fullName, setFullName] = useState(shippingInfo.fullName);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState("Pakistan");
  const [zipCode, setZipCode] = useState(shippingInfo.zipCode);
  const [contactNumber, setContactNumber] = useState(
    shippingInfo.contactNumber
  );
  const [formErrors, setFormErrors] = useState({});

  const shippingSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    contactNumber: Yup.string()
      .matches(/^03[0-9]{2}-?[0-9]{7}$/, "Invalid contact number")
      .required("Phone number is required"),
      
    city: Yup.string().required("City is required"),
    zipCode: Yup.string()
      .matches(/^\d{5}$/, "Invalid zip code")
      .required("Zip code is required"),
    address: Yup.string().required("Address is required"),
  });
  const shippingSubmit = async (e) => {
    e.preventDefault();

    try {
      await shippingSchema.validate(
        {
          fullName,
          contactNumber,
          city,
          zipCode,
          address,
        },
        { abortEarly: false }
      );
      dispatch(
        saveShippingInfo({
          address,
          fullName,
          city,
          state,
          country,
          zipCode,
          contactNumber,
        })
      );
      navigate("/cart");
    } catch (err) {
      const errors = {};
      err.inner.forEach((e) => {
        errors[e.path] = e.message;
      });
      setFormErrors(errors);
    }
  };

  return (
    <>
      <div className={styles.LoginSignUpContainer}>
        <div className={styles.LoginSignUpBox}>
          <h2 className={styles.updateProfileHeading}>Shipping Details</h2>

          <form
            className={styles.updateProfileForm}
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <h2>CONTACT INFO:</h2>
            <div>
              <p>Enter Your Full Name </p>
              {formErrors.fullName && (
                <section className={styles.errorMsg}>
                  <ErrorOutlineIcon /> {formErrors.fullName}
                </section>
              )}
            </div>
            <div>
              <BadgeIcon />
              <input
                type="text"
                placeholder="Full-Name"
                // required
                className={formErrors.fullName ? `${styles.redBorder}` : ""}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <p>Enter Your Contact Number</p>
              {formErrors.contactNumber && (
                <section className={styles.errorMsg}>
                  <ErrorOutlineIcon /> {formErrors.contactNumber}
                </section>
              )}
            </div>
            <div>
              <PhoneIcon />
              <input
                type="number"
                placeholder="e.g: 0300 3908279"
                // required
                className={
                  formErrors.contactNumber ? `${styles.redBorder}` : ""
                }
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                size="10"
              />
            </div>
            <span>
              *You may receive text messages or calls related to order confirmation and
              shipping updates.
            </span>
            <h2>ADDRESS INFO:</h2>
            <div>
              <p>Select Your Country</p>
            </div>
            <div>
              <PublicIcon />
              <select
                value={country}
                defaultValue={`Pakistan`}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Pakistan</option>
                {/*  {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))} */}
              </select>
            </div>
            <div>
              <p>Select Your State</p>
            </div>
            {country && (
              <div>
                <TransferWithinAStationIcon />

                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry("PK").map((item) => (
                      <option key={item.isoCode} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
            <div className={styles.cityZipcodeLabel}>
              <section>
                <p> Enter Your City Name</p>
                {formErrors.city && (
                  <p className={styles.errorMsg}>
                    <ErrorOutlineIcon /> {formErrors.city}
                  </p>
                )}
              </section>

              <section>
                <p>Enter Your Zip Code</p>
                {formErrors.zipCode && (
                  <p className={styles.errorMsg}>
                    <ErrorOutlineIcon /> {formErrors.zipCode}
                  </p>
                )}
              </section>
            </div>
            <div className={styles.cityZipcode}>
              <LocationCityIcon />
              <input
                style={{ width: "50%" }}
                type="text"
                placeholder="e.g: Karachi"
                // required
                className={formErrors.city ? `${styles.redBorder}` : ""}
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />

              <PinDropIcon className={styles.cityZipcodeSvg} />
              <input
                type="number"
                style={{ width: "50%" }}
                className={formErrors.zipCode ? `${styles.redBorder}` : ""}
                placeholder="Pin Code"
                // required
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
              />
            </div>
            <div>
              <p>Enter Your Complete Address </p>
              {formErrors.address && (
                <section className={styles.errorMsg}>
                  <ErrorOutlineIcon /> {formErrors.address}
                </section>
              )}
            </div>
            <div>
              <HomeIcon />
              <input
                type="text"
                className={formErrors.address ? `${styles.redBorder}` : ""}
                placeholder="e.g: House no./ Building / Street / Area"
                // required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <span>
              *To ensure a seamless delivery experience, kindly provide accurate
              and complete address information.
            </span>

            <div></div>
            <MuiButton
              type="submit"
              // disabled={loading ? false : true}
              className={styles.updateProfileBtn}
              // value="Continue"
              // endIcon={<ShoppingCartCheckoutIcon />}
              // onClick={checkoutHandler}
            >
              Confirm Details
            </MuiButton>
            {/* <input
              type="submit"
              value="Continue"
              className={styles.updateProfileBtn}
              disabled={state ? false : true}
            /> */}
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;

// import { useState } from 'react';

// import countriesData from '../Assets/CityData.json';// Replace with the actual countries data

// function Shipping() {
//   const [selectedProvince, setSelectedProvince] = useState(null);
//   const [selectedDistrict, setSelectedDistrict] = useState(null);

//   const handleProvinceSelect = (provinceName) => {
//     setSelectedProvince(provinceName);
//     setSelectedDistrict(null); // Reset district selection when a new province is selected
//   };

//   const handleDistrictSelect = (districtName) => {
//     setSelectedDistrict(districtName);
//   };

//   return (
//     <div>
//       <h2>Select a province:</h2>
//       <select value={selectedProvince} onChange={(e) => handleProvinceSelect(e.target.value)}>
//         <option value="">Select a province</option>
//         {countriesData.countries.map((country) => (
//           country.provinces.map((province) => (
//             <option key={province.name} value={province.name}>
//               {province.name}
//             </option>
//           ))
//         ))}
//       </select>

//       {selectedProvince && (
//         <div>
//           <h2>Select a district:</h2>
//           <select value={selectedDistrict} onChange={(e) => handleDistrictSelect(e.target.value)}>
//             <option value="">Select a district</option>
//             {countriesData.countries.map((country) => (
//               country.provinces.filter((province) => province.name === selectedProvince)
//               .map((province) => (
//                 province.districts.map((district) => (
//                   <option key={district.name} value={district.name}>
//                     {district.name}
//                   </option>
//                 ))
//               ))
//             ))}
//           </select>
//         </div>
//       )}

//       {selectedDistrict && (
//         <div>
//           <h2>Select a city:</h2>
//           <select>
//             <option value="">Select a city</option>
//             {countriesData.countries.map((country) => (
//               country.provinces.filter((province) => province.name === selectedProvince)
//               .map((province) => (
//                 province.districts.filter((district) => district.name === selectedDistrict)
//                 .map((district) => (
//                   district.cities.map((city) => (
//                     <option key={city} value={city}>
//                       {city}
//                     </option>
//                   ))
//                 ))
//               ))
//             ))}
//           </select>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Shipping;
