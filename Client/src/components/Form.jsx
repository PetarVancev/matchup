import React, { useState } from "react";
import StarSelector from "./StarSelector";
import DropdownInput from "./DropdownInput";

function Form(props) {
  const [selectedOption, setSelectedOption] = useState("Select an Option");
  const sports = ["Football", "Basketball", "Volleyball", "Handball"];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  return (
    <form className="form">
      {props.registered === false && (
        <div>
          <input type="text" placeholder="Name" />
          <input type="text" placeholder="Surname" />
          <input type="tel" placeholder="Phone Number" />
          <DropdownInput
            options={sports}
            selectedOption={selectedOption}
            onChange={handleOptionSelect}
          />
          <StarSelector>Your skill group</StarSelector>
        </div>
      )}
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />

      <button type="submit" className="btn btn-primary">
        {props.registered ? "Login" : "Register"}
      </button>
      {props.registered != false && (
        <div className="row">
          <button className="btn btn-primary forgot-pass">
            Forgot Password
          </button>
        </div>
      )}
    </form>
  );
}

export default Form;
