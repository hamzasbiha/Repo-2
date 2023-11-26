import React, { useEffect, useState } from "react";
import defImage from "../../../assets/gif/default.png";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DriveFolderUpload from "@mui/icons-material/DriveFolderUpload";
import { useDispatch } from "react-redux";
import { addProductApi } from "../../../redux/products/productSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Add.scss";

const AddingNewProdcut = () => {
  const token = sessionStorage.getItem("access");
  const dispatch = useDispatch();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [published, setPublished] = React.useState("");
  const [Category, setCategory] = useState("");
  const [selectedimg, setSelectedImage] = useState(0);
  const [ArraImage, setArraImage] = useState([]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    const selectedFileArray = Array.from(files);
    console.log(files);
    setSelectedFiles(selectedFileArray);
  };
  const handleChange = (event) => {
    setPublished(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const stock = formData.get("stock");
    const porductVal = Object.fromEntries(formData);
    const finalVal = {
      ...porductVal,
      category: Category,
      images: ArraImage,
      published: published,
      stock: parseInt(stock),
    };
    dispatch(addProductApi({ token: token, product: finalVal })).then(
      (action) => {
        if (action.type === "product/create/fulfilled") {
          toast.success("Congralation you add new product to your shop", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error("Something Went wrong come back later !", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    );
  };

  useEffect(() => {
    if (selectedFiles.length > 0) {
      const handleImageUpload = async () => {
        try {
          const uploadedImages = [];
          for (const file of selectedFiles) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("upload_preset", "bgze1za2");
            const response = await axios.post(
              "https://api.cloudinary.com/v1_1/drywnffrv/image/upload",
              formData
            );
            uploadedImages.push(response.data.secure_url);
          }
          setArraImage(uploadedImages);
        } catch (error) {
          console.error(`Error uploading images to Cloudinary:`, error);
        }
      };
      handleImageUpload();
    }
  }, [selectedFiles]);

  return (
    <div className="add">
      <div className="add-container">
        <ToastContainer />
        <div className="top">
          <h1>Add New Product</h1>
        </div>
        <div className="bottom-add">
          <div className="left-add">
            <div className="mainimg">
              <img
                alt=""
                src={
                  ArraImage && ArraImage.length !== 0
                    ? ArraImage[selectedimg]
                    : defImage
                }
              />
            </div>
            <div className="row-imgs">
              {ArraImage?.length !== 0 ? (
                ArraImage?.map((item, index) => {
                  console.log(item);
                  return (
                    <div key={index}>
                      <img
                        alt=""
                        src={item}
                        onClick={() => setSelectedImage(index)}
                      />
                    </div>
                  );
                })
              ) : (
                <div className="row-imgs">
                  <img alt="" src={defImage} />
                  <img alt="" src={defImage} />
                  <img alt="" src={defImage} />
                </div>
              )}
            </div>
          </div>
          <div className="right-add">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="file">
                  Image : <DriveFolderUpload className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  name="images"
                  multiple
                  style={{
                    display: "none",
                  }}
                  onChange={handleFileChange}
                />
              </div>
              <div className="formInput">
                <label>title</label>
                <input type="text" id="title" name="title" />
              </div>
              <div className="formInput">
                <label>description</label>
                <input type="text" id="content" name="content" />
              </div>
              <div className="formInput">
                <label>Market</label>
                <input type="text" id="market" name="market" />
              </div>
              <div className="formInput">
                <label>type food</label>
                <input type="text" id="typefood" name="typefood" />
              </div>
              <div className="formInput">
                <label>Qunatite</label>
                <input type="text" id="quantity" name="quantity" />
              </div>
              <div className="formInput">
                <label>Price For Company</label>
                <input
                  type="text"
                  id="priceForCompany"
                  name="priceForCompany"
                />
              </div>
              <div className="formInput">
                <label>Price For Personal</label>
                <input
                  type="text"
                  id="priceForPersonal"
                  name="priceForPersonal"
                />
              </div>
              <div className="formInput">
                <label>stock</label>
                <input
                  type="text"
                  inputMode="numeric"
                  id="stock"
                  name="stock"
                />
              </div>
              <div className="formInput">
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Category
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={Category}
                    onChange={handleCategoryChange}
                    label="Age"
                  >
                    <MenuItem value={"Chats"}>Chats</MenuItem>
                    <MenuItem value={"Chien"}>Chien</MenuItem>
                    <MenuItem value={"Oiseaux"}>Oiseaux</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label">
                    Visiblity
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={published}
                    onChange={handleChange}
                    label="Age"
                  >
                    <MenuItem value={"Private"}>private</MenuItem>
                    <MenuItem value={"Public"}>publish</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <button type="submit">Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddingNewProdcut;
