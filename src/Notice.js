import React, { useState } from "react";

function Alert() {
  return (
    <>
      <div className="alert alert-info shadow-lg">
        <div className="text-white">
          <span>
            <i className="fa-solid fa-circle-info"></i>
          </span>
          <span> New software update available.</span>
        </div>
      </div>
    </>
  );
}

function Notice() {
  return (
    <>
      <Alert />
      <hr />
      <Alert />
    </>
  );
}

export default Notice;
