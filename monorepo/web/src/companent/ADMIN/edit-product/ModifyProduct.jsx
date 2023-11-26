import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  fetchOneProdcut,
  updateProduct,
} from "../../../redux/products/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DriveFolderUpload from "@mui/icons-material/DriveFolderUpload";
import defImage from "../../../assets/gif/default.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./modifyProd.scss";

export const ModifyProduct = () => {
  const { id } = useParams();
  const token = sessionStorage.getItem("access");
  const selectedProduct = useSelector((state) => state.product.SingleProduct);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [published, setPublished] = useState(selectedProduct.published);
  const [Category, setCategory] = useState(selectedProduct.category);
  const [selectedimg, setSelectedImage] = useState(0);
  const [ArraImage, setArraImage] = useState([]);
  const dispatch = useDispatch();

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
      images: ArraImage.length !== 0 ? ArraImage : selectedProduct.images,
      published: published,
      stock: parseInt(stock),
    };
    console.log(finalVal);
    dispatch(updateProduct({ token: token, id: id, product: finalVal })).then(
      (action) => {
        if (action.type === "product/update/fulfilled") {
          toast.success("Product update", {
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
          toast.warn("Something Went wrong", {
            position: "bottom-right",
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

  const handleImageUpload = async () => {
    if (selectedFiles.length > 0) {
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
    }
  };
  useEffect(() => {
    handleImageUpload();
    dispatch(fetchOneProdcut(id));
  }, [dispatch, id]);
  const handleFileChange = (e) => {
    const files = e.target.files;
    const selectedFileArray = Array.from(files);
    console.log(files);
    setSelectedFiles(selectedFileArray);
  };
  console.log(selectedProduct);
  return (
    <div className="updating">
      <ToastContainer />
      <div className="add-container">
        <div className="top">
          <h1>Update Product</h1>
        </div>
        <div className="bottom-add">
          <div className="left-add">
            <div className="mainimg">
              <img
                alt=""
                src={
                  selectedProduct.images ? selectedProduct.images[0] : defImage
                }
              />
            </div>
            <div className="row-imgs">
              {false !== 0 ? (
                selectedProduct.images?.map((item, index) => {
                  return (
                    <div key={index}>
                      <img
                        alt=""
                        src={item.length !== 0 ? item : defImage}
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
                <input
                  type="text"
                  id="title"
                  name="title"
                  defaultValue={selectedProduct.title}
                />
              </div>
              <div className="formInput">
                <label>description</label>
                <textarea
                  type="text"
                  id="content"
                  name="content"
                  defaultValue={selectedProduct.content}
                />
              </div>
              <div className="formInput">
                <label>Market</label>
                <input
                  type="text"
                  id="market"
                  name="market"
                  defaultValue={selectedProduct.market}
                />
              </div>
              <div className="formInput">
                <label>type food</label>
                <input
                  type="text"
                  id="typefood"
                  name="typefood"
                  defaultValue={selectedProduct.typefood}
                />
              </div>
              <div className="formInput">
                <label>Qunatite</label>
                <input
                  type="text"
                  id="qunatite"
                  name="qunatite"
                  defaultValue={selectedProduct.qunatite}
                />
              </div>
              <div className="formInput">
                <label>Price For Company</label>
                <input
                  type="text"
                  id="priceForCompany"
                  name="priceForCompany"
                  defaultValue={selectedProduct.priceForCompany}
                />
              </div>
              <div className="formInput">
                <label>Price For Personal</label>
                <input
                  type="text"
                  id="priceForPersonal"
                  name="priceForPersonal"
                  defaultValue={selectedProduct.priceForPersonal}
                />
              </div>
              <div className="formInput">
                <label>stock</label>
                <input
                  type="text"
                  inputMode="numeric"
                  id="stock"
                  name="stock"
                  defaultValue={selectedProduct.stock}
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
                    defaultValue={selectedProduct.published}
                    value={published}
                    onChange={handleChange}
                    label="Age"
                  >
                    <MenuItem value={"private"}>private</MenuItem>
                    <MenuItem value={"publish"}>publish</MenuItem>
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
