import React, { useState, useEffect } from "react";
import Card from "./Card";

const Home = () => {
  const [data, setData] = useState({});
  const [userName, setUserName] = useState("");
  const [debouncedUserName, setDebouncedUserName] = useState("");
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedUserName(userName);
    }, 1000);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [userName]);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${debouncedUserName}`
      );

      if (!response.ok) {
        throw new Error("User not found");
      }
      const jsonData = await response.json();
      console.log(jsonData);
      setData(jsonData);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [debouncedUserName]);

  const handleInputChange = (e) => {
    setUserName(e.target.value);
  };
  // console.log(data);

  return (
    <div className="container p-3 w-100 h-100">
      <form>
        <input
          type="text"
          placeholder="Enter User Name"
          className="form-control"
          value={userName}
          onChange={handleInputChange}
        />
      </form>
      {loader ? (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <div class="spinner-border text-light" role="status">
            <span class="sr-only"></span>
          </div>
        </div>
      ) : (
        <Card user={data} />
      )}
    </div>
  );
};

export default Home;
