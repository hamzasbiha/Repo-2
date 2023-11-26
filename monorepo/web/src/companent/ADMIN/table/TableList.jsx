import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import "./table.scss";

const TableList = () => {
  const prod = useSelector((state) => state.product.Product);
  const [totalstocks, setTotalStocks] = useState(0);
  // Get the current month and year
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  // Filter products created within the current month
  const prodFiltered = prod.filter((product) => {
    const createdAtDate = new Date(product.createdAt);
    const productMonth = createdAtDate.getMonth();
    const productYear = createdAtDate.getFullYear();
    return productMonth === currentMonth && productYear === currentYear;
  });
  useEffect(() => {
    const calculateTotalStock = () => {
      let totalstock = 0;
      prod.forEach((item) => {
        totalstock += item.stock;
      });
      return totalstock; // Return the total stock
    };

    // Call the function and update the state
    setTotalStocks(calculateTotalStock());
  }, [prod]);

  return (
    <div className="table">
      <TableContainer component={Paper} className="table-data">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Tracking Id</TableCell>
              <TableCell></TableCell>
              <TableCell className="tableCell">Name</TableCell>
              <TableCell className="tableCell">Category</TableCell>
              <TableCell className="tableCell">PriceForCompany</TableCell>
              <TableCell className="tableCell">PriceForPersonal</TableCell>
              <TableCell className="tableCell">Typefood</TableCell>
              <TableCell className="tableCell">
                Stock&nbsp;(total&nbsp;{totalstocks})
              </TableCell>
              <TableCell className="tableCell">published</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prodFiltered.slice(0, 4).map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row" className="tableCell">
                  {row.id}
                </TableCell>
                <TableCell component="th" scope="row" className="tableCell">
                  <div className="cellwrapper">
                    <img
                      alt="row"
                      src={row.mainimg}
                      style={{
                        width: "52px",
                        height: "52px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </TableCell>
                <TableCell component="th" scope="row" className="tableCell">
                  {row.title}
                </TableCell>
                <TableCell className="tableCell">{row.category}</TableCell>
                <TableCell className="tableCell">
                  {row.priceForCompany}TND
                </TableCell>
                <TableCell className="tableCell">
                  {row.priceForPersonal}TND
                </TableCell>
                <TableCell className="tableCell">{row.typefood}</TableCell>
                <TableCell className="tableCell">{row.stock}</TableCell>
                {row.published ? (
                  <TableCell className="tableCell ">
                    <div className="puplish pub">Public</div>
                  </TableCell>
                ) : (
                  <TableCell className="tableCell ">
                    <div className="puplish prv">Private</div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableList;
