import React from "react";

const LaunchItem = ({ article, details, launchYear, missionName, flightNumber, imgsrc }) => {
  return (
    <a href={article} target="_blank">
      <div className="launch-list-div">
        <img src={imgsrc} className="launch-list-img" />
        <section className="launch-list-text-con">
          <p className="launch-list-text-header">{flightNumber}: {missionName} ({launchYear})</p>
          <p className="launch-list-text-details">{details}</p>
        </section>
      </div>
    </a>
  );

};

export default LaunchItem;
