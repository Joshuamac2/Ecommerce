import React, { useState } from "react";
import ProductEditor from "./ProductEditor";
import { Carousel } from "react-responsive-carousel";
import { IoMdArrowDropdown } from "react-icons/io";

const ProductCardManager = ({ product, onEdit, pricingOptions }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleEdit = () => {
    setIsEditing(true);
    onEdit(product.product_id);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  let imageUrls = [];

  if (product.image_url && typeof product.image_url === "string") {
    try {
      imageUrls = JSON.parse(product.image_url);

      if (!Array.isArray(imageUrls)) {
        imageUrls = [];
      }
    } catch (error) {
      console.error("Error parsing image URLs:", error);
      imageUrls = [];
    }
  }

  const editButton = {
    backgroundColor: "#333B51",
    color: "white",
    borderRadius: "10px",
    border: "2px solid #333B51",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "15px",
    marginBottom: "15px",
  };

  const productCardStyle = {
    margin: "10px",
    height: "100%",
    overflow: "hidden",
  };

  const imgStylestyle = {
    width: "70%",
    height: "400px",
  };

  const productAttribute = {
    textAlign: "left",
    fontWeight: "bold",
    marginTop: "5px",
    backgroundColor: "white",
    color: "#333B51",
    borderRadius: "10px",
    border: "5px solid #333B51",
    boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.1)",
    padding: "5px",
    cursor: "pointer",
  };

  const addToCart = {
    backgroundColor: "#333B51",
    color: "white",
    padding: "5px 20px",
    borderRadius: "10px",
    border: "2px solid #333B51",
    boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.1)",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "15px",
  };

  return (
    <div style={{ padding: "50px", ...productCardStyle, fontWeight: "bold" }}>
      {isEditing ? (
        <ProductEditor product={product} onSave={() => setIsEditing(false)} />
      ) : (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button type="button" onClick={handleEdit} style={editButton}>
              Edit
            </button>
          </div>
          <div />
          <Carousel showThumbs={false} autoPlay infiniteLoop>
            {Array.isArray(imageUrls) ? (
              imageUrls.map((urls, index) => (
                <div key={index}>
                  {Array.isArray(urls) ? (
                    urls.map((url, idx) => (
                      <img
                        key={idx}
                        src={url}
                        style={imgStylestyle}
                        alt={`Product Image ${index + 1}`}
                      />
                    ))
                  ) : (
                    <img
                      src={urls}
                      style={imgStylestyle}
                      alt={`Product Image ${index + 1}`}
                    />
                  )}
                </div>
              ))
            ) : (
              <div>
                <img
                  src={imageUrls}
                  style={imgStylestyle}
                  alt="Product Image"
                />
              </div>
            )}
          </Carousel>
          <div>
            <div>
              <h4 style={{ fontWeight: "bold", marginTop: "10px" }}>
                {product.title}
              </h4>
              <p
                style={{
                  fontWeight: "bold",
                  marginTop: "10px",
                  color: "darkgray",
                  height: "100px",
                  overflow: "hidden",
                  wordWrap: "break-word",
                  flexGrow: 1,
                }}
              >
                {product.description}
              </p>
              <hr />
            </div>
            <div style={{ fontWeight: "bold" }}>
              <p>
                Product Attribute:
                {pricingOptions && pricingOptions.length > 0 && (
                  <div className="dropdown">
                    <button
                      onClick={toggleDropdown}
                      className="dropdown-toggle"
                      style={productAttribute}
                    >
                      {isOpen ? "Hide Pricing Options" : "Show Pricing Options"}
                    </button>
                    <div
                      className={
                        isOpen ? "dropdown-menu show" : "dropdown-menu"
                      }
                      style={productAttribute}
                    >
                      {pricingOptions.map((option, index) => (
                        <p key={index} className="text-dark">
                          {option.name}: ${option.price}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </p>
              <button style={addToCart}> Add to cart</button>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                  fontSize: "20px",
                  marginTop: "20px",
                  color: "black",
                  overflow: "hidden",
                  wordWrap: "break-word",
                  flexGrow: 1,
                }}
                onClick={toggleExpand}
              >
                <span>Product Details</span>
                <IoMdArrowDropdown />
              </div>
              <div
                style={{ borderBottom: "1px solid gray", marginTop: "5px" }}
              ></div>
              {isExpanded && <div>{product.product_details}</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCardManager;
