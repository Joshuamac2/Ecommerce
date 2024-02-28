import React, { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaCirclePlus } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { RiImageAddLine } from "react-icons/ri";

function ProductEditor({ product, onSave, onDelete }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [product_details, setProductDetails] = useState("");
  const [image_url, setImage_url] = useState(
    product.image_url ? [product.image_url] : []
  );
  const [productType, setProductType] = useState("");
  const [product_location, setProduct_location] = useState("");
  const [pricingOptions, setPricingOptions] = useState([]);

  useEffect(() => {
    if (product) {
      setTitle(product.title || "");
      setDescription(product.description || "");
      setProductDetails(product.product_details || "");
      setImage_url(
        product.image_url
          ? product.image_url
              .replace("[", "")
              .replace("]", "")
              .split('","')
              .map((url) => url.replace(/"/g, ""))
          : []
      );
      setProductType(product.product_type || "");
      setProduct_location(product.product_location || "");
      setPricingOptions(product.pricingOptions || []);
    }
  }, [product]);

  const handleSave = () => {
    const updatedProductInformation = {
      title,
      description,
      product_details,
      image_url: JSON.stringify(image_url),
      product_type: productType,
      product_location: product_location,
      pricingOptions,
    };

    fetch(`http://localhost:4000/api/products/${product.product_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProductInformation),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        onSave(updatedProductInformation);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleDelete = async () => {
    const confirmDeletion = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDeletion) {
      try {
        const response = await fetch(
          `http://localhost:4000/api/products/${product.product_id}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          onDelete(product.product_id);
          console.log("Product deleted successfully");
        } else {
          console.error("Failed to delete product");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleAddImage = () => {
    setImage_url([...image_url, ""]);
  };

  const handleImageChange = (index, value) => {
    const newImageUrls = [...image_url];
    newImageUrls[index] = value;
    setImage_url(newImageUrls);
  };

  const handleRemoveImage = (index) => {
    const newImageUrls = [...image_url];
    newImageUrls.splice(index, 1);
    setImage_url(newImageUrls);
  };

  const handlePricingOptionChange = (index, field, value) => {
    const newPricingOptions = [...pricingOptions];
    newPricingOptions[index][field] = value;
    setPricingOptions(newPricingOptions);
  };

  const addPricingOption = () => {
    setPricingOptions([
      ...pricingOptions,
      { name: "", price: "", api_key: "" },
    ]);
  };

  const removePricingOption = (index) => {
    const newPricingOptions = [...pricingOptions];
    newPricingOptions.splice(index, 1);
    setPricingOptions(newPricingOptions);
  };

  const addPriceOption = {
    backgroundColor: "#333B51",
    color: "white",
    borderRadius: "10px",
    border: "1px solid #333B51",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "15px",
    marginBottom: "15px",
    marginLeft: "64%",
  };

  const addImageButton = {
    width: "35%",
    backgroundColor: "white",
    border: "5px solid #333B51",
    color: "#333B51",
    borderRadius: "15px",
    fontWeight: "bold",
    marginBottom: "20px",
  };

  const removeImageButton = {
    width: "35%",
    backgroundColor: "black",
    border: "5px solid #333B51",
    color: "white",
    borderRadius: "15px",
    fontWeight: "bold",
    marginBottom: "20px",
  };

  const removePriceButton = {
    width: "16%",
    marginTop: "10px",
    marginBottom: "20px",
    backgroundColor: "black",
    borderRadius: "5px",
    color: "white",
    border: "none",
    cursor: "pointer",
  };

  const deleteButton = {
    backgroundColor: "#EC1D24",
    color: "white",
    border: "2px solid #EC1D24",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "15px",
    marginBottom: "15px",
  };

  const saveButton = {
    backgroundColor: "#0ED08F",
    color: "white",
    border: "2px solid #0ED08F",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "15px",
    marginBottom: "15px",
  };
  console.log(image_url);

  return (
    <div md="3" lg="3" className="mb-5 ml-1 mr-5">
      <div
        style={{
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          marginTop: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            fontWeight: "bold",
          }}
        >
          <div style={{ flex: 1 }}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label small-text">
                Title
              </label>
              <input
                type="text"
                id="title"
                className="form-control small-text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label small-text">
                Description
              </label>
              <textarea
                id="description"
                className="form-control small-text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="product_details" className="form-label small-text">
                Product Details
              </label>
              <textarea
                id="product_details"
                className="form-control small-text"
                value={product_details}
                onChange={(e) => setProductDetails(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="product_type" className="form-label small-text">
                Product type
              </label>
              <select
                id="product_type"
                className="form-select small-text"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
              >
                <option value="">Select product type</option>
              </select>
            </div>
            <div className="mb-5">
              <label
                htmlFor="product_location"
                className="form-label small-text"
              >
                Product Location
              </label>
              <select
                id="product_location"
                className="form-select small-text"
                value={product_location}
                onChange={(e) => setProduct_location(e.target.value)}
              >
                <option value="">Select product type</option>
                <option value="Home Page">Home Page</option>
                <option value="Product Page">Product Page</option>
              </select>
            </div>
            <div>
              <label>Image URLs</label>
              {image_url.map((url, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <input
                    type="text"
                    className="form-label small-text"
                    style={{ width: "100%", marginTop: "10px" }}
                    value={url}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                  />
                  {index > 0 && (
                    <button
                      onClick={() => handleRemoveImage(index)}
                      style={removeImageButton}
                    >
                      Remove <MdDelete />
                    </button>
                  )}
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <button onClick={handleAddImage} style={{ ...addImageButton }}>
                  Add Image <RiImageAddLine />
                </button>
              </div>
            </div>
            {pricingOptions.map((option, index) => (
              <div style={{ fontWeight: "bold" }}>
                <div style={{ display: "flex", alignItems: "right" }}>
                  <div style={{ fontSize: "20px" }}>{`Price Option: ${
                    index + 1
                  }`}</div>
                  <button onClick={addPricingOption} style={addPriceOption}>
                    Add <FaCirclePlus />
                  </button>
                </div>
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    textAlign: "left",
                    gap: "55px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "left",
                      width: "45%",
                    }}
                  >
                    <label>Name</label>
                    <input
                      type="text"
                      placeholder={`Option ${index + 1} Name`}
                      value={option.name}
                      onChange={(e) =>
                        handlePricingOptionChange(index, "name", e.target.value)
                      }
                      style={{ marginRight: "10px" }}
                    />
                    <label>Price</label>
                    <input
                      type="number"
                      placeholder={`Option ${index + 1} Price`}
                      value={option.price}
                      onChange={(e) =>
                        handlePricingOptionChange(
                          index,
                          "price",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      textAlign: "left",
                      width: "45%",
                    }}
                  >
                    <label>Stock</label>
                    <input
                      type="text"
                      placeholder={`Option ${index + 1} Available Quantity`}
                      value={option.available_quantity}
                      onChange={(e) =>
                        handlePricingOptionChange(
                          index,
                          "available_quantity",
                          e.target.value
                        )
                      }
                    />
                    <label>API Key</label>
                    <input
                      type="text"
                      placeholder={`Option ${index + 1} API Key`}
                      value={option.api_key}
                      onChange={(e) =>
                        handlePricingOptionChange(
                          index,
                          "api_key",
                          e.target.value
                        )
                      }
                    />
                  </div>
                </div>
                <button
                  onClick={() => removePricingOption(index)}
                  style={removePriceButton}
                >
                  Remove <MdDelete />
                </button>
              </div>
            ))}
          </div>
          <hr className="my-0" />
          <div style={{ display: "flex", alignItems: "right", gap: "10px" }}>
            <button onClick={handleSave} style={saveButton}>
              Save <FaSave />
            </button>
            <button type="button" onClick={handleDelete} style={deleteButton}>
              Delete Product <IoIosWarning />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductEditor;
