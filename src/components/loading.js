import React from "react";
import Spinnerr from "./Spinner.gif";
const Loading = () => {
  return (
    <div className="text-center">
      <img className="my-3" src={Spinnerr} alt="loading" />
    </div>
  );
};
export default Loading