import React, { useState } from "react";
import NavBar from "../components/NavBar";
import DateSelector from "../components/DateSelector";
import Listing from "../components/Listing";
import "../styles.css";
import CreateListingDialog from "../components/CreateListingDialog";

const categories = ["Football", "Basketball", "Volleyball", "Handball"];

export default function Home() {
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
        <CreateListingDialog isOpen={isPopupOpen} closeDialog={closePopup} />
      </div>
    </div>
  );
}
