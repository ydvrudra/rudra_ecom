import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updateProduct,getproductDetails } from "../../actions/ProductAction";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import {  UPDATE_PRODUCT_RESET } from "../../constants/ProductConstant";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {

  const { error,product } = useSelector((state) => state.productDetails);
  const { loading, error:updateError,isUpdated } = useSelector((state) => state.newProduct);
  
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const {id} = useParams();


  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  
  
  // For file uploads
  //const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  //const [imagesPreview, setImagesPreview] = useState([]);

  // For URL uploads
  const [imageUrls, setImageUrls] = useState([]);
  const [urlInput, setUrlInput] = useState("");

  const categories = [
    "Laptop",
    "Smart Phones",
    "Watches",
    "Footwear",
    "Men",
    "Women",
    "Kids",
    "Camera",
  ];


  const productId = id;

   useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getproductDetails(productId));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    navigate,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    // Append URL images to form data
    imageUrls.forEach((url) => {
      myForm.append("images[]", JSON.stringify({ url }));
    });

    // Append file-based images to form data
    // images.forEach((image) => {
    //   myForm.append("images[]", image);
    // });

    dispatch(updateProduct(productId ,myForm));
  };

  // Handle file-based image upload
  // const updateProductImagesChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   setImages([]);
  //   setImagesPreview([]);
  //   setOldImages([]);

  //   files.forEach((file) => {
  //     const reader = new FileReader();

  //     reader.onload = () => {
  //       if (reader.readyState === 2) {
  //         setImagesPreview((old) => [...old, reader.result]);
  //         setImages((old) => [...old, reader.result]); 
  //       }
  //     };

  //     reader.readAsDataURL(file);
  //   });
  // };


  const addImageUrlHandler = () => {
    if (urlInput) {
      setImageUrls([...imageUrls, urlInput]);
      setUrlInput(""); // Clear the input field
    }
  };

  return (
    <>
      <MetaData title="Update Product" />
      <div className="flex flex-col sm:flex-row bg-gray-100">
        <SideBar />
        <div className="flex-grow p-6">
          <form
            className="bg-white shadow-lg p-4 max-w-lg mx-auto border border-gray-400"
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1 className="text-2xl font-bold text-gray-700 mb-6">
              Update Product
            </h1>

            {/* Product Name */}
            <div className="flex items-center mb-4">
              <SpellcheckIcon className="mr-2 text-gray-500" />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-500 rounded-md"
              />
            </div>

            {/* Price */}
            <div className="flex items-center mb-4">
              <AttachMoneyIcon className="mr-2 text-gray-500" />
              <input
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border border-gray-500 rounded-md"
              />
            </div>

            {/* Description */}
            <div className="flex items-center mb-4">
              <DescriptionIcon className="mr-2 text-gray-500" />
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="3"
                className="w-full p-2 border border-gray-500 rounded-md"
              ></textarea>
            </div>

            {/* Category */}
            <div className="flex items-center mb-4">
              <AccountTreeIcon className="mr-2 text-gray-500" />
              <select
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            {/* Stock */}
            <div className="flex items-center mb-4">
              <StorageIcon className="mr-2 text-gray-500" />
              <input
                type="number"
                placeholder="Stock"
                required
                value={Stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full p-2 border border-gray-500 rounded-md"
              />
            </div>

            {/* Image URL Upload Option */}
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Upload via URL</h2>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Enter Image URL"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="w-full p-2 border border-gray-500 rounded-md"
                />
                <button
                  type="button"
                  onClick={addImageUrlHandler}
                  className="p-2 bg-customOrange-tomato hover:bg-customOrange-tomatohover text-white rounded-md"
                >
                  Add
                </button>
              </div>
              <div className="flex gap-3 mb-2 overflow-auto">
                { oldImages && oldImages.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt="Old Product Preview"
                    className="w-20 h-20 object-cover border border-gray-400"
                  />
                ))}
              </div>
              
              <div className="flex gap-3 mb-2 overflow-auto">
                {imageUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt="URL Image Preview"
                    className="w-20 h-20 object-cover border border-gray-400"
                  />
                ))}
              </div>
            </div>

            {/* File Upload Option */}
            {/* <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Upload via Files</h2>
              <input
                type="file"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
                className="w-full p-2 border border-gray-500 rounded-md"
              />
             

              <div className="flex gap-3 mb-2 overflow-auto">
                {imagesPreview.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="Product Preview"
                    className="w-20 h-20 object-cover border border-gray-400"
                  />
                ))}
              </div>
            </div> */}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading ? true : false}
              className="w-full bg-customOrange-tomato text-white py-2 px-4 hover:bg-customOrange-tomatohover transition duration-500"
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;
