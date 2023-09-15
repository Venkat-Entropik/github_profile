import React from "react";
import "./card.css";
const Card = ({ user }) => {
  console.log("user", user);
  function formatDate(originalDateString) {
    if (originalDateString) {
      const date = new Date(originalDateString);

      if (!isNaN(date)) {
        const formattedDate = date.toISOString().slice(0, 10);
        return formattedDate;
      }
    }
  }

  return (
    <div className="card_container">
      {Object.keys(user).length === 0 ? (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <div class="spinner-border text-light" role="status">
            <span class="sr-only"></span>
          </div>
        </div>
      ) : (
        <div className="profile_Card">
          <div className="img_container">
            <img src={user?.avatar_url} alt="logo" className="img-fluid img" />
          </div>
          <h3 className="text-center text-light">{user?.name}</h3>
          <h5 className="text-center text-info">@{user?.login}</h5>
          <div className="d-flex justify-content-evenly">
            <h4 className="btn btn-secondary btn1 mt-2 ">
              No.of public repos : {user?.public_repos}
            </h4>
            <h4 className="btn btn-success btn1 mt-2">
              No. of public gists: {user?.public_gists}
            </h4>
          </div>
          <p className=" w-100 btn btn-danger mx-auto">
            Profile created at: {formatDate(user?.created_at)}
          </p>
        </div>
      )}
    </div>
  );
};
export default Card;
