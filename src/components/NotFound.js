import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div>
      <h3>404 ERROR</h3>
      <Link to="/home">Return to Home Page</Link>
    </div>
  );
}

export default PageNotFound;
