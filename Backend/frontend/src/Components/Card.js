import React, { useEffect, useRef, useState } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";

const Card = (props) => {
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef();

  const option = props.foodoption;
  const priceoptions = Object.keys(option);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [finalPrice, setFinalPrice] = useState(0);

  const foodItem = props.foodItem;

  useEffect(() => {
    if (size && option[size]) {
      const price = parseInt(option[size]) || 0;
      setFinalPrice(price * qty);
    }
  }, [qty, size, option]);

  const handleAddToCart = async () => {
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
    console.log("Cart after adding item:", data);
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, [priceoptions]);

  return (
    <div className="d-flex justify-content-center">
      <div
        className="card shadow-sm mb-4 card-hover"
        style={{
          width: "18rem",
          maxHeight: "390px",
          borderRadius: "16px",
          background: "#fffaf0",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
        }}
      >
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="..."
          style={{
            height: "180px",
            objectFit: "cover",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
        />
        <div className="card-body">
          <h5 className="card-title">
            {props.foodItem.name || "No Name Provided"}
          </h5>

          <div className="container w-100 d-flex justify-content-between align-items-center px-0">
            <select
              className="m-2 bg-success text-white rounded px-2 py-1"
              onChange={(e) => setQty(e.target.value)}
              value={qty}
            >
              {Array.from(Array(6), (_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <select
              className="m-2 bg-success text-white rounded px-2 py-1"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
              value={size}
            >
              {priceoptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>

            <div className="fs-5 text-success fw-bold">Rs {finalPrice}/-</div>
          </div>

          <hr />

          <div className="text-center">
            <button
              className="btn btn-outline-success"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Inline style or use a separate CSS file */}
      <style>{`
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default Card;
