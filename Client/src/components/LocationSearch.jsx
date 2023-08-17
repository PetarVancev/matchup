import React, { useState } from "react";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";

const libraries = ["places"];

const LocationSearch = ({ apiKey }) => {
  const [autocomplete, setAutocomplete] = useState(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading maps";

  return (
    <div>
      <Autocomplete onLoad={(auto) => setAutocomplete(auto)}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter location"
          onFocus={(e) => e.target.select()}
          required
        />
      </Autocomplete>
    </div>
  );
};

export default LocationSearch;
