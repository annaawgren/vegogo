import React from "react";

/**
 * Coffe, salads, plates, rawfood
 */
function PlaceTypes({ foodTypes }) {
  let types = foodTypes.map(type => (
    <li key={type.key} className="PlaceItem-features-item">
      {type.name}
    </li>
  ));

  if (types && types.length) {
    types = (
      <div className="PlaceItem-features">
        {/* <h3 className="PlaceItem-features-title">Food to find</h3> */}
        <ul className="PlaceItem-features-items">{types}</ul>
      </div>
    );
  }

  return types;
}

export default PlaceTypes;
