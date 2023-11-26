import React from "react";
import "./Announcement.scss";

const Announcement = () => {
  // useEffect(() => {
  //   // 👇️ scroll to top on page load
  //   window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  // }, []);

  return (
    <div className="announcement">
      <h1
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
      >
        Explorez les meilleurs produits
      </h1>
    </div>
  );
};

export default Announcement;
