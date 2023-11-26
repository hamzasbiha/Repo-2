import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CancelRounded from "@mui/icons-material/CancelRounded";
import "./Search.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SearchBar = ({ setShowSearch, showSearch }) => {
  const [term, setTerm] = useState("");
  const data = useSelector((state) => state.product.Product);
  const filteredProducts = data.filter((product) =>
    product.title.toLowerCase().includes(term.toLowerCase())
  );
  console.log(filteredProducts);
  return (
    <div className={`search ${showSearch ? "visible" : ""}`}>
      <div className="wrapper">
        <span className="searchbtn">
          <SearchIcon />
        </span>
        <input
          type="search"
          placeholder="Rechercher"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          autoComplete=""
        />
        <span
          className="cancelbtn"
          onClick={() => {
            setShowSearch(false);
          }}
        >
          <CancelRounded />
        </span>
      </div>
      <div className="recomd">
        {term && (
          <div className="recomd-content">
            <div className="recomd-scrollable">
              {filteredProducts.map((item) => (
                <Link
                  key={item.id}
                  className="link"
                  to={`/produit/${item.id}`}
                  onClick={() => {
                    setShowSearch(false);
                    setTerm("");
                  }}
                >
                  <div className="item">
                    <div className="left">
                      <img src={item.images[0]} alt="" />
                    </div>
                    <div className="right">
                      <h1>{item.title}</h1>
                      {/* <p>{item.content} </p> */}
                    </div>
                    <div className="right">
                      <h1>{item.priceForPersonal}</h1>
                      <p> stock :{item.stock} </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
