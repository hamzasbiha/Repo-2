import React, { useEffect, useState } from "react";
import ListFilters from "./ListFilter/ListFilters";
import ProdcutGrid from "./ListProdcuts/ProdcutGrid";
import "./ProdcutLayout.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchProdcuts } from "../../../../redux/products/productSlice";
import { useParams } from "react-router-dom";
import PagniteBottom from "./BottomPagnite/pagniteBottom";
const ProdcutLayout = () => {
  const dispatch = useDispatch();
  const [pages, setPages] = useState({});
  const [currentPages, setCurrentPage] = useState(1);
  const data = useSelector((state) => state.product.Product);
  const [filteredData, setFilteredData] = useState(data);
  const [sortedData, setSortedData] = useState([]); // Initialize with the initial data
  const catgo = useParams();
  const filter = {
    category: catgo.category,
  };
  useEffect(() => {
    dispatch(fetchProdcuts(filter));
    handleFilterChange();
  }, [catgo]);

  const handleFilterChange = (selecFilt) => {
    const filt = data.filter(
      (item) =>
        selecFilt?.includes(item.typefood) || selecFilt?.includes(item.market)
    );
    setFilteredData(filt);
  };

  return (
    <div className="ProdcutLayout">
      <div className="wrapper">
        <div className="left">
          <ListFilters
            data={data}
            onFilterChange={handleFilterChange}
            sortedData={sortedData}
            setSortedData={setSortedData}
          />
        </div>
        <div className="right">
          <ProdcutGrid
            data={data}
            filtTypFod={filteredData}
            pages={pages}
            setPages={setPages}
            setCurrentPage={setCurrentPage}
            currentPages={currentPages}
            sortedData={sortedData}
          />
        </div>
      </div>
      <PagniteBottom pages={pages} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default ProdcutLayout;
