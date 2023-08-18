import React, { useState, useEffect } from "react";
import Axios from "axios";
import NavBar from "../components/NavBar";
import DateSelector from "../components/DateSelector";
import Listing from "../components/Listing";
import "../styles.css";
import CreateListingDialog from "../components/CreateListingDialog";

const categories = ["Football", "Basketball", "Volleyball", "Handball"];

export default function Home() {
  const [loggedUserId, setLoggedUserId] = useState(null);
  useEffect(() => {
    Axios.get("http://localhost:3001/login", { withCredentials: true })
      .then((response) => {
        if (response.data.loggedIn === false) {
          window.location.href = "./login";
        } else {
          setLoggedUserId(response.data.user[0].id);
        }
      })
      .catch((error) => {
        console.error("Error checking login status:", error);
      });
  }, []);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Football");
  const [selectedMode, setMode] = useState("enroll");

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div>
      <NavBar
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        setMode={setMode}
      />
      {selectedMode === "enroll" || selectedMode === "my" ? (
        <div className="text-center listing-options-row">
          <button
            className="btn btn-primary create-listing-button"
            onClick={openPopup} // Open the PopupDialog
          >
            Create a Listing
          </button>
          {selectedMode === "enroll" && <DateSelector />}
        </div>
      ) : null}
      <div className="container-fluid text-center">
        <Listing selectedMode={selectedMode} />

        {/* Pass down the state and functions to the PopupDialog */}
        <CreateListingDialog
          isOpen={isPopupOpen}
          closeDialog={closePopup}
          loggedUserId={loggedUserId}
        />
      </div>
    </div>
  );
}
