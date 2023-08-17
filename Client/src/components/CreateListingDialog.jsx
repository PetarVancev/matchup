import React from "react";

import LocationSearch from "./LocationSearch";
import StarSelector from "./StarSelector";

const API_KEY = "AIzaSyAjqMqKlnq_taZcPrgqJjSN-JgZddRrP8c";

const CreateListingDialog = ({ isOpen, closeDialog }) => {
  return (
    <div>
      {isOpen && (
        <div className="dialog-overlay">
          <div className="dialog-content">
            <h3>Create a listing</h3>
            <select
              id="sports"
              name="sports"
              className="form-control sport-select"
            >
              <option value="football">Football</option>
              <option value="basketball">Basketball</option>
              <option value="volleyball">Volleyball</option>
              <option value="handball">Handball</option>
            </select>
            <StarSelector className="skillGroupSelect" />
            <LocationSearch apiKey={API_KEY} />
            <input type="datetime-local" class="form-control" required />
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              min="0"
              step="1"
              placeholder="Enter Price in EUR"
              required
            />
            <input
              type="number"
              className="form-control"
              id="noPeople"
              name="noPeople"
              min="2"
              max="50"
              step="1"
              placeholder="Enter the number of people"
              required
            />
            <textarea
              class="form-control"
              rows="3"
              placeholder="Additional information(not mandatory)"
            ></textarea>
            <div className="row text-center">
              <input type="submit" className="btn btn-primary submit-button" />
            </div>
            <button className="btn-close btn btn-primary" onClick={closeDialog}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateListingDialog;
