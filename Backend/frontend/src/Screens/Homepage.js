import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";

const Homepage = () => {
  const [search, setsearch] = useState("");
  const [foodcat, setfoodcat] = useState([]);
  const [fooditem, setfooditem] = useState([]);

  const loaddata = async () => {
    let response = await fetch("http://localhost:3000/api/fooddata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setfooditem(response.food_Items);
    setfoodcat(response.food_category);
  };

  useEffect(() => {
    loaddata();
  }, []);

  return (
    <div id="homepage"
      style={{
        background: "#ffe0b2",
        minHeight: "100vh",
        color: "#4e342e",
        overflowX: "hidden", // Fix unwanted horizontal scroll on mobile
        paddingTop: "70px",
      }}
    >
      <Navbar />

      {/* Carousel */}
      <div className="carousel-container">
        <div
          id="carouselExampleCrossfade"
          className="carousel slide carousel-fade position-relative"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://wallpaperaccess.com/full/1306253.jpg"
                className="d-block w-100"
                alt="Burger"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://www.myyellowplate.com/wp-content/uploads/2021/07/WOW-MOMOS-IN-DELHI-1536x1024.jpg"
                className="d-block w-100"
                alt="Momos"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://www.homestratosphere.com/wp-content/uploads/2020/05/Pasta-with-tomato-sauce-5-29-6-min.jpg"
                className="d-block w-100"
                alt="Chowmein"
              />
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleCrossfade"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleCrossfade"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>

          {/* Search input */}
          <div
            className="position-absolute bottom-0 start-50 translate-middle-x w-100 d-flex justify-content-center mb-3"
            style={{ zIndex: 10, opacity: ".8" }}
          >
            <input
              type="text"
              className="form-control w-50"
              placeholder="Search for food..."
              style={{
                backgroundColor: "#fff3e0",
                border: "2px solid #ff7043",
                color: "#4e342e",
              }}
              value={search}
              onChange={(e) => setsearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Food Categories */}
      <div className="container py-4">
        {foodcat.length > 0 ? (
          foodcat.map((data) => (
            <div className="row mb-4" key={data._id}>
              <div
                className="fs-3 m-3"
                style={{
                  color: "#ff7043",
                  fontWeight: "bold",
                }}
              >
                {data.CategoryName}
              </div>
              <hr />
              <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
                {fooditem.length > 0 ? (
                  fooditem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filteritems) => (
                      <div
                        key={filteritems._id}
                        className="col-12 col-md-6 col-lg-3"
                      >
                        <Card
                          foodItem={filteritems}
                          foodoption={filteritems.options[0]}
                        />
                      </div>
                    ))
                ) : (
                  <div>No data</div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>
            <h4>No Categories Available</h4>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Homepage;
