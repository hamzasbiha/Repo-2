import React from "react";
import "./PagniteTop.scss";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
const PagniteTop = ({ pages, setCurrentPage }) => {
  const handleChange = (e, p) => {
    // console.log(e, p);
    setCurrentPage(p);
  };
  return (
    <div className="PagniteTop">
      <div className="pagn">
        <Stack spacing={2}>
          <Pagination
            count={pages.npages}
            onChange={handleChange}
            hidePrevButton
            hideNextButton
          />
        </Stack>
      </div>
    </div>
  );
};

export default PagniteTop;
