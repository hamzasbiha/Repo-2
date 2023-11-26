import React, { useEffect, useState } from "react";
import { ArrowForwardIos } from "@mui/icons-material";
import image from "../../../../../assets/banner/angryCat.jpg";
import { RestartAlt } from "@mui/icons-material";
import "./listfilters.scss";
const ListFilters = ({ data, onFilterChange, sortedData, setSortedData }) => {
  const minPrice = Math.min(...data.map((item) => item.priceForPersonal));
  const maxPrice = Math.max(...data.map((item) => item.priceForPersonal));
  const [showingMarket, setShoingMarket] = useState(false);
  const [showCats, setShowCats] = useState(false);
  const [showDogs, setShowDogs] = useState(false);
  const [showBirds, setShowBrids] = useState(false);
  const [selectedTypefoods, setSelectedTypefoods] = useState([]);
  const [maxPriceItem, setMaxPriceItem] = useState(0);
  const [isChecked, setISChecked] = useState(false);
  const [sort, setSort] = useState(null);

  const handleShowing = (listName) => {
    if (listName === "Chien") {
      setShowDogs(!showDogs);
    } else if (listName === "Chats") {
      setShowCats(!showCats);
    } else if (listName === "Oiseaux") {
      setShowBrids(!showBirds);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;
    setSelectedTypefoods((prevSelectedTypefoods) => {
      if (isChecked) {
        return [...prevSelectedTypefoods, value];
      } else {
        return prevSelectedTypefoods.filter((item) => item !== value);
      }
    });
  };
  const applyPriceFilter = () => {
    const filteredData = data.filter(
      (item) => item.priceForPersonal <= maxPriceItem
    );
    setSortedData(filteredData);
  };

  const handleSortByPrice = (sort) => {
    if (data.length !== 0) {
      sortedData = [...data].sort((a, b) => {
        if (sort === "desc") {
          return (
            a.priceForPersonal - b.priceForPersonal &&
            a.priceForCompany - b.priceForCompany
          );
        } else if (sort === "asc") {
          return (
            b.priceForPersonal - a.priceForPersonal &&
            b.priceForCompany - a.priceForCompany
          );
        } else {
          return 0;
        }
      });
      setSortedData(sortedData);
    }
  };
  const handleRestFilters = () => {
    setMaxPriceItem(false);
    setShowBrids(false);
    setShowCats(false);
    setShowDogs(false);
    setShoingMarket(false);
    setSort(null);
    setISChecked(false);
    setSelectedTypefoods([]);
  };
  useEffect(() => {
    handleSortByPrice(sort);
    setMaxPriceItem(maxPrice);
    onFilterChange(selectedTypefoods);
  }, [selectedTypefoods, sort, maxPrice]);
  const handleCheckrest = (e) => {
    if (e.target.checked) {
      setISChecked(!isChecked);
    }
  };
  return (
    <div className="list-filter">
      <div className="wrapper-listfilter">
        <div className="top-image">
          <img alt="" src={image} />
          <h1
            style={{
              color: "orange",
              cursor: "pointer",
            }}
          >
            Feed Your Pet ?{" "}
          </h1>
        </div>
        {/* FILTER BY CATGORY DOGS */}
        <div className="list-filter-item">
          <div className="top-filter-item">
            <h1>Dogs</h1>
            <div onClick={() => handleShowing("Chien")}>
              <ArrowForwardIos
                className={`Arrow-filter ${showDogs ? "Showing-Chien" : ""}`}
              />
            </div>
          </div>
          {showDogs &&
            [
              ...new Set(
                data
                  .filter((item) => item.category === "Chien")
                  .map((item) => item.typefood)
              ),
            ].map((typefood) => {
              return (
                <div key={typefood} className="list">
                  <input
                    type="checkbox"
                    value={typefood}
                    id={typefood} // Use a unique identifier for id
                    name="chien"
                    onChange={handleChange}
                  />
                  <label htmlFor={typefood}>{typefood}</label>
                </div>
              );
            })}
        </div>
        {/* FILTER BY CATGORY CATS */}
        <div
          className="list-filter-item"
          style={{
            transition: "all 0.5s ease",
          }}
        >
          <div className="top-filter-item">
            <h1>Cats</h1>
            <div onClick={() => handleShowing("Chats")}>
              <ArrowForwardIos
                className={`Arrow-filter ${showCats ? "Showing-Chat" : ""}`}
              />
            </div>
          </div>
          {showCats &&
            [
              ...new Set(
                data
                  .filter((item) => item.category === "Chats")
                  .map((item) => item.typefood)
              ),
            ].map((typefood) => {
              return (
                <div key={typefood} className="checkbox-list">
                  <input
                    type="checkbox"
                    value={typefood}
                    id={typefood} // Use a unique identifier for id
                    name="Chats"
                    onChange={handleChange}
                  />
                  <label htmlFor={typefood}>{typefood}</label>
                </div>
              );
            })}
        </div>
        {/* FILTER BY CATGORY BIRDS */}
        <div className="list-filter-item">
          <div className="top-filter-item">
            <h1>Birds</h1>
            <div onClick={() => handleShowing("Oiseaux")}>
              <ArrowForwardIos
                className={`Arrow-filter ${showBirds ? "Showing-Oiseaux" : ""}`}
              />
            </div>
          </div>
          {showBirds &&
            [
              ...new Set(
                data
                  .filter((item) => item.category === "Oiseaux")
                  .map((item) => item.typefood)
              ),
            ].map((typefood) => {
              return (
                <div key={typefood}>
                  <input
                    type="checkbox"
                    value={typefood}
                    id={typefood} // Use a unique identifier for id
                    name="Oiseaux"
                    onChange={handleChange}
                  />
                  <label htmlFor={typefood}>{typefood}</label>
                </div>
              );
            })}
        </div>
        {/* FILTER BY CATGORY MARKETS */}
        <div className="list-filter-item">
          <div className="top-filter-item">
            <h1>Market</h1>
            <div onClick={() => setShoingMarket(!showingMarket)}>
              <ArrowForwardIos
                className={`Arrow-filter ${
                  showingMarket ? "Showing-showingMarket" : ""
                }`}
              />
            </div>
          </div>
          {showingMarket &&
            [...new Set(data.map((item) => item.market))].map((market) => {
              return (
                <div key={market}>
                  <input
                    type="checkbox"
                    value={market}
                    id={market} // Use a unique identifier for id
                    name="market"
                    onChange={handleChange}
                  />
                  <label htmlFor={market}>{market}</label>
                </div>
              );
            })}
        </div>
        {/*SORT BY PRICE PRODUCTS */}
        <div className="list-filter-item">
          <h1>Sort By Price </h1>
          <div className="filter-radio">
            <div>
              <input
                type="radio"
                id="asc"
                name="date"
                value={"asc"}
                checked={isChecked}
                onChange={(e) => setSort("asc")}
              />
              <label htmlFor="last">highest first</label>
            </div>
            <div>
              <input
                type="radio"
                id="desc"
                name="date"
                value={"desc"}
                checked={isChecked}
                onChange={(e) => setSort("desc")}
                onClick={handleCheckrest}
              />
              <label htmlFor="old">Lowest first</label>
            </div>
          </div>
        </div>
        {/*FILTER BY PRICE FROM THE SELECTED PRICE TO LOWEST*/}
        <div className="list-filter-item">
          <h1>filter by price </h1>
          <div className="filter-radio">
            <div>
              <span>{minPrice}</span>
              <input
                type="range"
                id="priceRange"
                name="priceRange"
                min={minPrice}
                max={maxPrice}
                value={maxPriceItem}
                onChange={(e) => setMaxPriceItem(parseFloat(e.target.value))}
              />
              {maxPriceItem !== "-Infinity" ? (
                <span>{maxPriceItem}</span>
              ) : (
                <span>Loading</span>
              )}
              <div>
                <button onClick={applyPriceFilter}>Apply</button>
              </div>
            </div>
            <div className="rest-filer">
              <b> Reset FIlter</b>
              <span onClick={handleRestFilters}>
                <RestartAlt />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListFilters;
