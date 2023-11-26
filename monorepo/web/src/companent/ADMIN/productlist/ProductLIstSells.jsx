import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { fetchclient } from "../../../redux/admin/adminSlice";
import { useSelector, useDispatch } from "react-redux";
import "./productsells.scss";
import { Link, useParams } from "react-router-dom";
import {
  deleteProduct,
  fetchProdcuts,
} from "../../../redux/products/productSlice";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const ProductLIstSells = () => {
  const access = sessionStorage.getItem("access");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const disptach = useDispatch();
  const prod = useSelector((state) => state.product.Product);
  const loding = useSelector((state) => state.product.loding);
  const catgo = useParams();
  const filters = {
    category: catgo.category,
  };
  useEffect(() => {
    disptach(fetchclient(access));
    disptach(fetchProdcuts(filters)).then((action) => {
      if (fetchProdcuts.fulfilled.match(action)) {
        // The action was successful
        console.log("Products fetched successfully");
      } else if (fetchProdcuts.rejected.match(action)) {
        // Handle the error
        console.log("Error fetching products:", action.error.message);
      }
    });
  }, [disptach, access,loding]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "",
      headerName: "products",
      width: 70,
      sortable: false,
      description: "This column has a value getter and is not sortable.",
      filterable: false,
      renderCell: (params) => {
        return (
          <div className="cellImage">
            <img alt="cellImg" src={params.row.images[0]} />
          </div>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "createdAt",
      width: 150,
      renderCell: (params) => {
        const createdAt = new Date(params.value);
        return new Intl.DateTimeFormat("en-US").format(createdAt);
      },
    },
    {
      field: "updatedAt",
      headerName: "updatedAt",
      width: 150,
      renderCell: (params) => {
        const updatedAt = new Date(params.value);
        return new Intl.DateTimeFormat("en-US").format(updatedAt);
      },
    },
    { field: "title", headerName: "title", width: 130 },
    { field: "category", headerName: "category", width: 130 },
    { field: "priceForCompany", headerName: "priceForCompany", width: 70 },
    { field: "priceForPersonal", headerName: "priceForPersonal", width: 70 },
    { field: "stock", headerName: "stock", width: 30 },
    { field: "typefood", headerName: "typefood", width: 130 },
    {
      field: "verification",
      headerName: "verification",
      width: 130,
      renderCell: (params) => {
        const isVerified = params.row.published;
        return !isVerified ? (
          <span className="verified">Puplic</span>
        ) : (
          <span className="notverified">Private</span>
        );
      },
    },
  ];
  const actionColums = [
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      description: "This column has a value getter and is not sortable.",
      filterable: false,
      width: 200,
      renderCell: (params) => {
        const id = params.row.id;
        return (
          <div className="cellAction">
            <Link className="link" to={`products`}>
              <div className="viewButton">View</div>
            </Link>
            <Link
              className="link"
              to={`/profile-admin/update-product/${params.id}`}
            >
              <div className="editButton">Edit</div>
            </Link>
            <div className="deleteButton" onClick={handleOpen}>
              Delete
            </div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Text in a modal
                </Typography>
                <div className="modal-delete">
                  Are you sure you want to delete
                  <Button onClick={() => handleDeleteProduct(id)}>Yes</Button>
                  <Button onClick={handleClose}>NO</Button>
                </div>
              </Box>
            </Modal>
          </div>
        );
      },
    },
  ];
  const handleDeleteProduct = (id) => {
    // Dispatch the deleteProduct action
    disptach(deleteProduct({ token: access, id }));
    disptach(fetchProdcuts(filters));
    handleClose();
  };
  return (
    <div className="sells">
      <div className="data-title">
        Add New Products
        <Link className="link" to={"/profile-admin/ajoute"}>
          <span> Add New</span>
        </Link>
      </div>
      <div className="client-list">
        <DataGrid
          className="product-grid"
          rows={prod}
          columns={columns.concat(actionColums)}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
        />
      </div>
    </div>
  );
};

export default ProductLIstSells;
