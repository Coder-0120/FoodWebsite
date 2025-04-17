import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const MyOrder = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderData = async () => {
      const userEmail = localStorage.getItem("userEmail");
      if (!userEmail) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/api/myOrderData", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userEmail }),
        });

        const data = await response.json();
        console.log("Raw order data from API:", data);

        let orders = [];

        // Access the correct nested structure
        if (Array.isArray(data.orderdata?.order_data)) {
          orders = data.orderdata.order_data;
        } else {
          console.warn("Unexpected format of orderdata:", data.orderdata);
        }

        setOrderData(orders);
      } catch (error) {
        console.error("Error fetching order data:", error);
        setOrderData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  const groupOrdersByDate = (orders) => {
    const flatOrders = orders.flat(); // Handle nested arrays
    const grouped = {};
    let currentDate = "";

    flatOrders.forEach((item) => {
      if (item.Order_date) {
        currentDate = item.Order_date;
        if (!grouped[currentDate]) grouped[currentDate] = [];
      } else if (item.name && item.qty && item.price) {
        const dateKey = currentDate || "Unknown Date";
        if (!grouped[dateKey]) grouped[dateKey] = [];
        grouped[dateKey].push(item);
      }
    });

    return grouped;
  };

  const backgroundStyle = {
    background: "linear-gradient(#ffe0b2)",
    color: "#4e342e",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  };

  const contentWrapper = {
    flex: 1,
    paddingTop: "100px",
    paddingBottom: "40px",
  };

  const cardStyle = {
    background: "#fffaf0",
    borderRadius: "20px",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.08)",
    border: "1px solid #ffe0b2",
    transition: "transform 0.3s ease",
    color: "#4e342e",
  };

  const hoverCardStyle = {
    transform: "scale(1.03)",
  };

  const titleStyle = {
    color: "#d84315",
    fontWeight: "700",
    fontSize: "1.2rem",
  };

  const labelStyle = {
    color: "#6d4c41",
    fontWeight: "600",
  };

  if (loading) {
    return (
      <div style={backgroundStyle}>
        <Navbar />
        <div className="container text-center mt-5 pt-5">
          <h2 style={{ color: "#ff7043" }}>🍔 Preparing your tasty orders...</h2>
        </div>
        <Footer />
      </div>
    );
  }

  const groupedOrders = groupOrdersByDate(orderData);

  return (
    <div style={backgroundStyle}>
      <Navbar />
      <div style={contentWrapper} className="container">
        {Object.keys(groupedOrders).length > 0 ? (
          Object.entries(groupedOrders)
            .sort((a, b) => new Date(b[0]) - new Date(a[0]))
            .map(([date, items], index) => (
              <div key={index} className="mb-5">
                <div className="text-center mb-3">
                  <h4 style={{ color: "#e65100", fontWeight: "600" }}>
                    📅 Order Date: {date}
                  </h4>
                  <hr style={{ borderColor: "#ffd180" }} />
                </div>
                <div className="row">
                  {items.map((item, idx) => (
                    <div key={idx} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                      <div
                        className="card p-3"
                        style={cardStyle}
                        onMouseEnter={(e) =>
                          Object.assign(e.currentTarget.style, hoverCardStyle)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.transform = 'scale(1)')
                        }
                      >
                        <div className="card-body text-center">
                          <h5 className="card-title" style={titleStyle}>
                             {item.name}
                          </h5>
                          <p className="card-text">
                            <span style={labelStyle}>Quantity:</span> {item.qty}
                          </p>
                          <p className="card-text">
                            <span style={labelStyle}>Size:</span> {item.size}
                          </p>
                          <p className="card-text">
                            <span style={labelStyle}>Total:</span> ₹{item.price}/-
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
        ) : (
          <div className="text-center mt-5">
            <h3 style={{ color: "#ff7043", fontWeight: "600" }}>
              🍟 No previous orders found. Grab a snack!
            </h3>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyOrder;
