import React from "react";
import "./pagniteBottom.scss";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
const PagniteBottom = ({ pages, setCurrentPage }) => {
  const handleChange = (e, p) => {
    // console.log(e, p);
    setCurrentPage(p);
  };
  return (
    <div className="pagniteBottom">
      <Stack spacing={2}>
        <Pagination
          count={pages.npages}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </Stack>
    </div>
  );
};

export default PagniteBottom;
