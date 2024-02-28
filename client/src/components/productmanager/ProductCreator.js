import React, { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import { FaCirclePlus } from "react-icons/fa6";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import { RiImageAddLine } from "react-icons/ri";
import { FaArrowCircleRight } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function ProductCreator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [product_details, setProductDetails] = useState("");
  const [image_url, setImage_url] = useState([""]);
  const [pricingOptions, setPricingOptions] = useState([
    { name: "", price: "", api_key: "", available_quantity: "" },
  ]);
  const [product_type, setProduct_type] = useState("");
  const [product_location, setProduct_location] = useState("");
  const [activeTab, setActiveTab] = useState("ProductDetails");
  const [priceOptionCount, setPriceOptionCount] = useState(1);

  const createProduct = async () => {
    const productInformation = {
      title,
      description,
      product_details,
      image_url,
      product_type,
      product_location,
      pricingOptions,
    };

    try {
      const response = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productInformation),
      });

      if (response.ok) {
        console.log("Product added successfully");
        setTitle("");
        setDescription("");
        setProductDetails("");
        setImage_url([""]);
        setPricingOptions([
          { name: "", price: "", api_key: "", available_quantity: "" },
        ]);
        setProduct_type("");
        setProduct_location("");
        setPriceOptionCount(1);
      } else {
        console.error("Failed to add the product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
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
      { name: "", price: "", api_key: "", available_quantity: "" },
    ]);
    setPriceOptionCount((prevCount) => prevCount + 1);
  };

  const removePricingOption = (index) => {
    if (pricingOptions.length > 1) {
      const newPricingOptions = [...pricingOptions];
      newPricingOptions.splice(index, 1);
      setPricingOptions(newPricingOptions);
      setPriceOptionCount((prevCount) => prevCount - 1);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleAddPricingOption = () => {
    setActiveTab("PricingOptions");
  };

  const inputWidth = "60%";

  const addButton = {
    width: "30%",
    backgroundColor: "white",
    color: "black",
    borderRadius: "5px",
    border: "none",
  };

  const addImageButton = {
    width: "16%",
    backgroundColor: "white",
    border: "5px solid #333B51",
    color: "#333B51",
    borderRadius: "15px",
    fontWeight: "bold",
  };

  const removeImageButton = {
    width: "16%",
    marginTop: "10px",
    marginBottom: "30px",
    padding: "5px",
    backgroundColor: "black",
    borderRadius: "5px",
    color: "white",
    border: "none",
    borderRadius: "15px",
    cursor: "pointer",
  };

  const removePriceButton = {
    width: "20%",
    marginTop: "10px",
    marginBottom: "30px",
    padding: "5px",
    backgroundColor: "black",
    borderRadius: "5px",
    color: "white",
    border: "none",
    cursor: "pointer",
  };

  const inputFieldsDetails = {
    width: inputWidth,
    backgroundColor: "#EAEAEE",
    borderRadius: "5px",
    border: "none",
    borderBottom: "3px solid #FAFAFA",
    marginTop: "10px",
    marginBottom: "10px",
  };

  const inputFieldsPrice = {
    width: "150%",
    backgroundColor: "#EAEAEE",
    borderRadius: "5px",
    border: "none",
    borderBottom: "3px solid #FAFAFA",
  };

  const createButton = {
    width: "100%",
    marginBottom: "10px",
    backgroundColor: "#333B51",
    color: "white",
    borderRadius: "20px",
    padding: "5px",
    cursor: "pointer",
  };

  const productTypeButton = {
    width: inputWidth,
    textAlign: "left",
    fontWeight: "bold",
    marginBottom: "10px",
    backgroundColor: "white",
    color: "#333B51",
    borderRadius: "10px",
    border: "5px solid #333B51",
    padding: "10px",
    cursor: "pointer",
  };

  const goToPriceOptionButton = {
    backgroundColor: "#333B51",
    color: "white",
    padding: "5px 10px",
    borderRadius: "10px",
    border: "2px solid #333B51",
    boxShadow: "10px 10px 10px rgba(0, 0, 0, 0.1)",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "15px",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontWeight: "bold",
        marginTop: "30px",
        marginBottom: "100px",
        gap: "20px",
        fontSize: "30px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
        <button
          onClick={() => handleTabChange("ProductDetails")}
          style={{
            border: "none",
            borderBottom:
              activeTab === "ProductDetails" ? "3px solid #333B51" : "none",
            backgroundColor: "white",
          }}
        >
          Product Details
        </button>
        <button
          onClick={() => handleTabChange("PricingOptions")}
          style={{
            border: "none",
            borderBottom:
              activeTab === "PricingOptions" ? "3px solid #333B51" : "none",
            backgroundColor: "white",
          }}
        >
          Pricing Options
        </button>
      </div>
      {activeTab === "ProductDetails" && (
        <div style={{ width: "100%", textAlign: "center" }}>
          <label
            style={{
              width: inputWidth,
              textAlign: "left",
              fontSize: "40px",
              marginBottom: "20px",
              marginTop: "10px",
              fontSize: "35px",
            }}
          >
            {" "}
            <Tooltip
              title="Define the fundamental details of the product."
              placement="left"
            >
              <div>
                Product Details <HiOutlineInformationCircle />
              </div>
            </Tooltip>
          </label>
          <div style={{ fontSize: "20px" }}>
            <label
              htmlFor="description"
              style={{
                width: inputWidth,
                textAlign: "left",
                marginBottom: "10px",
              }}
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={inputFieldsDetails}
            />
            <label
              htmlFor="description"
              style={{
                width: inputWidth,
                textAlign: "left",
                marginBottom: "10px",
              }}
            >
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={inputFieldsDetails}
            />

            <label
              htmlFor="productDetails"
              style={{
                width: inputWidth,
                textAlign: "left",
                marginBottom: "10px",
              }}
            >
              <Tooltip
                title="Please input any extra details into this field. The information will be displayed in a collapsible format."
                placement="left"
              >
                <div>
                  Product Details <HiOutlineInformationCircle />
                </div>
              </Tooltip>
            </label>
            <textarea
              id="product_details"
              value={product_details}
              onChange={(e) => setProductDetails(e.target.value)}
              style={inputFieldsDetails}
            />
            <div>
              <label
                htmlFor="image_url"
                style={{ width: inputWidth, textAlign: "left" }}
              >
                <Tooltip
                  title="Please ensure that your images are hosted externally. You can then add the URLs here. Arrange them in the preferred order of appearance."
                  placement="left"
                >
                  <div>
                    Image URL <HiOutlineInformationCircle />
                  </div>
                </Tooltip>
              </label>
              {image_url.map((url, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    style={inputFieldsDetails}
                  />
                  {index > 0 && (
                    <button
                      onClick={() => handleRemoveImage(index)}
                      style={removeImageButton}
                    >
                      Remove <MdDelete style={{ fontSize: "20px" }} />
                    </button>
                  )}
                </div>
              ))}
              <button onClick={handleAddImage} style={addImageButton}>
                Add Image <RiImageAddLine />
              </button>
            </div>
            <label
              htmlFor="product_type"
              style={{
                width: inputWidth,
                textAlign: "left",
                marginBottom: "10px",
              }}
            >
              <Tooltip
                title="Choosing product types helps categorise your products for better organisation."
                placement="left"
              >
                <div>
                  Product Type <HiOutlineInformationCircle />
                </div>
              </Tooltip>
            </label>
            <select
              name="product_type"
              value={product_type}
              onChange={(e) => setProduct_type(e.target.value)}
              style={productTypeButton}
            >
              <option value="">Select Product Type</option>
            </select>
            <label
              htmlFor="product_location"
              style={{
                width: inputWidth,
                textAlign: "left",
                marginBottom: "10px",
              }}
            >
              <Tooltip
                title="Selecting a product location determines where the products will be displayed."
                placement="left"
              >
                <div>
                  Product Location <HiOutlineInformationCircle />
                </div>
              </Tooltip>
            </label>
            <select
              name="product_location"
              value={product_type}
              onChange={(e) => setProduct_location(e.target.value)}
              style={productTypeButton}
            >
              <option value="">Select Product Location</option>
              <option value="Home Page">Home Page</option>
              <option value="Product Page">Product Page</option>
            </select>
          </div>
          <button
            onClick={handleAddPricingOption}
            style={goToPriceOptionButton}
          >
            Add Pricing Option{" "}
            <FaArrowCircleRight
              style={{ fontSize: "30px", marginLeft: "10px" }}
            />
          </button>
        </div>
      )}
      {activeTab === "PricingOptions" && (
        <div style={{ width: "60%", textAlign: "center" }}>
          <div>
            {pricingOptions.map((option, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
                  marginTop: "10px",
                  fontSize: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <label style={{ fontSize: "35px" }}>
                    <Tooltip
                      title="Your products can offer multiple pricing options, each presented as a dropdown selection."
                      placement="left"
                    >
                      <div>
                        {`Price Option: ${index + 1}`}{" "}
                        <HiOutlineInformationCircle />
                      </div>
                    </Tooltip>
                  </label>
                  <button onClick={addPricingOption} style={addButton}>
                    Add <FaCirclePlus style={{ fontSize: "30px" }} />
                  </button>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    textAlign: "left",
                    marginTop: "30px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "15px",
                    }}
                  >
                    <label>Name</label>
                    <input
                      type="text"
                      value={option.name}
                      onChange={(e) =>
                        handlePricingOptionChange(index, "name", e.target.value)
                      }
                      style={inputFieldsPrice}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "15px",
                      marginLeft: "225px",
                    }}
                  >
                    <label>Price</label>
                    <input
                      type="number"
                      value={option.price}
                      onChange={(e) =>
                        handlePricingOptionChange(
                          index,
                          "price",
                          e.target.value
                        )
                      }
                      style={inputFieldsPrice}
                    />
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "15px",
                    }}
                  >
                    <label>
                      <Tooltip
                        title="Each pricing option should have its own API key, which you can set on Stripe. This is crucial for accurately recognizing what customers are purchasing. If you enter incorrect API keys, customers may be charged incorrect prices without your knowledge, as Stripe will charge the amount defined by the specific API key entered, potentially leading to discrepancies in charges."
                        placement="left"
                      >
                        <div>
                          API-Key <HiOutlineInformationCircle />
                        </div>
                      </Tooltip>
                    </label>
                    <input
                      type="text"
                      value={option.api_key}
                      onChange={(e) =>
                        handlePricingOptionChange(
                          index,
                          "api_key",
                          e.target.value
                        )
                      }
                      style={inputFieldsPrice}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      marginBottom: "15px",
                      marginLeft: "225px",
                    }}
                  >
                    <label>
                      <Tooltip
                        title="Remember to update your stock in the product editor. This pricing option will become unavailable when your customers purchase all the stock allocated for this pricing option."
                        placement="left"
                      >
                        <div>
                          Stock
                          <HiOutlineInformationCircle />
                        </div>
                      </Tooltip>
                    </label>
                    <input
                      type="number"
                      value={option.available_quantity}
                      onChange={(e) =>
                        handlePricingOptionChange(
                          index,
                          "available_quantity",
                          e.target.value
                        )
                      }
                      style={inputFieldsPrice}
                    />
                  </div>
                </div>
                {index > 0 && (
                  <button
                    onClick={() => removePricingOption(index)}
                    style={removePriceButton}
                  >
                    Remove <MdDelete style={{ fontSize: "20px" }} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "left",
              gap: "15px",
              marginTop: "20px",
            }}
          >
            <button onClick={createProduct} style={createButton}>
              Create product
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductCreator;
