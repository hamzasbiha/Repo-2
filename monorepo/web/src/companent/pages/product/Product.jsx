import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { addtocart, updateCartItemQuantity } from "../../../redux/cartSlice";
import "./Product.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchOneProdcut } from "../../../redux/products/productSlice";
import { Blurhash } from "react-blurhash";
import { iterate } from "localforage";

const Product = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.user.user);
  const [ImageLoad, setImageLoad] = useState(false);
  const cartlist = useSelector((state) => state.cart.cart);
  const [selecteImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.product.SingleProduct);
  console.log(selectedProduct);
  useEffect(() => {}, [id]);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchOneProdcut(id));
    const img = new Image();
    img.onload = () => {
      setImageLoad(true);
    };
    // if  (selectedProduct &&  selectedProduct.images.lenght !== 0) {
    //   setImageLoad(false);
    // }

    img.src = selectedProduct.images;
  }, [id]);

  const handleImageSelect = (index) => {
    setSelectedImage(index);
  };

  const getItemQuantityInCart = (itemId) => {
    const itemInCart = cartlist.find((item) => item.id === itemId);
    return itemInCart ? itemInCart.QTE : 1;
  };
  const handleDecreaseQuantity = (item) => {
    if (item.QTE > 1) {
      dispatch(
        updateCartItemQuantity({
          id: item.id,
          QTE: item.QTE - 1,
        })
      );
    }
  };

  const handleIncreaseQuantity = (item) => {
    if (getItemQuantityInCart(selectedProduct.id) === 1) {
      dispatch(
        addtocart({ ...selectedProduct, QTE: quantity }, selectedProduct.id)
      );
    } else {
      const currentQuantity = getItemQuantityInCart(item.id);
      if (currentQuantity < item.stock) {
        dispatch(
          updateCartItemQuantity({
            id: item.id,
            QTE: currentQuantity + 1,
          })
        );
      }
    }
  };
  console.log(cartlist);
  return (
    <div className="product">
      <div className="wrapper">
        <div className="left">
          <div className="left-product">
            <div className="row-image">
              {/* {!ImageLoad &&
                selectedProduct.images === Array.isArray &&
                selectedProduct.images.map((item, index) => {
                  return (
                    <div key={index} onClick={() => handleImageSelect(index)}>
                      <img alt="" src={item} />
                    </div>
                  );
                })} */}
              {ImageLoad &&
                selectedProduct.images.map((item, index) => {
                  return (
                    <div key={item.id}>
                      <img
                        alt=""
                        src={item}
                        onClick={() => setSelectedImage(index)}
                      />
                    </div>
                  );
                })}
            </div>
            <div className="main-image">
              <div>
                {ImageLoad && (
                  <img
                    alt=""
                    src={selectedProduct.images[selecteImage]}
                    // loading="lazy"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="title">
            <h1>{selectedProduct.title} </h1>
          </div>
          <div className="category">
            <div className="row">
              <div>
                <span>Catgoire : </span>
              </div>
              <div className="cato">{selectedProduct.category} </div>
            </div>
          </div>
          <div className="priceForCompany">
            <div className="row">
              <div>
                <span>Prix : </span>
              </div>
              <div className="cato">
                {selectedProduct.priceForPersonal}.00 TND{" "}
              </div>
            </div>
          </div>
          <div className="quantity">
            <div className="row">
              <div>
                <span>Stock : </span>
              </div>
              <div className="cato">{selectedProduct.stock} </div>
            </div>
          </div>
          <div className="add-cart-dec">
            <button onClick={() => handleDecreaseQuantity(selectedProduct)}>
              -
            </button>
            <span>{getItemQuantityInCart(selectedProduct.id)}</span>
            <button onClick={() => handleIncreaseQuantity(selectedProduct)}>
              +
            </button>
          </div>
          <div className="add-cart">
            <button
              onClick={() => {
                dispatch(
                  addtocart(
                    { ...selectedProduct, QTE: quantity },
                    selectedProduct.id
                  )
                );
              }}
            >
              Ajoute au pannier
            </button>
          </div>
        </div>
      </div>
      <div className="divier-spon"></div>
      <div className="bottom">
        <div className="divier"></div>
        <div>
          <h1>Description</h1>
          <p>{selectedProduct.content} </p>
        </div>
        <div>
          <h2>Features</h2>
          <ul>
            <li>{selectedProduct.content}</li>
          </ul>
        </div>
        <div>
          <h2>Quintity</h2>
          <ul>
            <li>25 kg</li>
          </ul>
        </div>
        <div className="similar">
          <h1>Similar Products</h1>
        </div>
      </div>
    </div>
  );
};

export default Product;
