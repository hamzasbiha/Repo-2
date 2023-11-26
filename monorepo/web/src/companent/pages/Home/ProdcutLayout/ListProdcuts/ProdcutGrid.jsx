import { useEffect, useState } from "react";
import "./ProductGrid.scss";
import GridItem from "./Grid/GridItem";
import PagniteTop from "../PagniteTop/PagniteTop";
import Empty from "../PagniteTop/Empty";
const ProdcutGrid = ({
  data,
  pages,
  setPages,
  currentPages,
  setCurrentPage,
  filtTypFod,
  sortedData,
}) => {
  const recordPages = 12;
  const lastindex = currentPages * recordPages;
  const firstIndex = lastindex - recordPages;
  const recordes =
    filtTypFod.length !== 0
      ? filtTypFod.slice(firstIndex, lastindex)
      : sortedData.length !== 0
      ? sortedData.slice(firstIndex, lastindex)
      : data.slice(firstIndex, lastindex);
  const npages = Math.ceil(data.length / recordPages);
  const numbers = [...Array(npages + 1).keys()].slice(1);

  useEffect(() => {
    setPages({
      npages: npages,
      numbers: numbers,
    });
  }, [npages]);

  return (
    <>
      <PagniteTop pages={pages} setCurrentPage={setCurrentPage} />
      <div className="list-grid">
        <div className="grid-col">
          {recordes.map((item) => {
            return <GridItem item={item} key={item.id} />;
          })}
        </div>
      </div>
      <Empty />
    </>
  );
};

export default ProdcutGrid;
