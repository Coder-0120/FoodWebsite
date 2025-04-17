import React, { useState, useEffect } from 'react';
import { useCart, useDispatchCart } from '../Components/ContextReducer';

export default function Cart() {
  const [orderSuccess, setOrderSuccess] = useState(false);
  const data = useCart();
  const dispatch = useDispatchCart();

  const handleCheckOut = async () => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      alert("User email not found. Please log in again.");
      return;
    }

    const response = await fetch("http://localhost:3000/api/Orderdata", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });

    if (response.status === 200) {
      dispatch({ type: "DROP" });
      setOrderSuccess(true);
    }
  };

  const totalPrice = data.reduce((total, food) => total + food.price, 0);

  if (data.length === 0) {
    return (
      <div className='container text-center mt-5'>
        <div className='fs-3 text-red fw-bold'>
          {orderSuccess ? "🎉 Order Placed Successfully!" : "🛒 Your Cart is Empty!"}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="table-responsive rounded-3 overflow-hidden">
        <table className="table table-hover align-middle bg-black shadow-sm">
          <thead className="table-success text-center text-uppercase">
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Size</th>
              <th scope='col'>Amount</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td className='fw-semibold'>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>₹{food.price}</td>
                <td>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => dispatch({ type: "REMOVE", index })}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-4 px-2">
        <h4 className="text-red fw-bold">Total: ₹{totalPrice}/-</h4>
        <button
          className="btn btn-success btn-lg mt-3 mt-md-0"
          onClick={handleCheckOut}
        >
          🧾 Checkout
        </button>
      </div>
    </div>
  );
}
