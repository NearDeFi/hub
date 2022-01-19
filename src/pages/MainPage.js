import React, { useState } from "react";
import Dashboard from "../components/Dashboard/Dashboard";

export default function MainPage(props) {
  const [address, setAddress] = useState(
    "0x05b693a7Ee103F9b0a3914ae73b41B6694F61e57"
  );

  const onAddressChange = (e) => {
    setAddress(e.target.value);
  };

  return (
    <div>
      <div className="container">
        <div className="row mb-3">
          <label htmlFor="eth-address">Aurora address:</label>
          <input
            name="eth-address"
            className="form-control"
            type="text"
            placeholder="0x1234..."
            value={address}
            onChange={onAddressChange}
          />
        </div>
        <div className="row mb-3">
          <Dashboard address={address} />
        </div>
      </div>
    </div>
  );
}
