import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import * as icon from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import "./delivery.scss";
import { fetchallcart } from "../../../redux/cartSlice";
const Delivery = () => {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("access");
  const order = useSelector((state) => state.cart.orders);

  useEffect(() => {
    dispatch(fetchallcart(token));
  }, [token]);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "email", headerName: "email", width: 130 },
    {
      field: "shippingAddress",
      headerName: "Shipping Address",
      width: 130,
      valueGetter: (params) => `${params.row.adresse}`,
    },
    { field: "ville", headerName: "ville", width: 130 },
    { field: "phone", headerName: "phone", width: 130 },
    {
      field: "accountType",
      headerName: "accountType",
      width: 130,
      valueGetter: (params) => `${params.row.User.accountType}`,
    },
    {
      field: "title",
      headerName: "number of items",
      width: 130,
      valueGetter: (params) => {
        const items = params.row.order_Items.length;
        return items;
      },
    },
    {
      field: "codepos",
      headerName: "code postal",
      width: 130,
    },
    {
      field: "status",
      headerName: "status",
      width: 130,
    },
    {
      field: "Ref",
      headerName: "Ref",
      valueGetter: (params) => {
        const items = params.row.order_Items.map((item) => item.id);
        return items;
      },
      width: 180,
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
        return (
          <div className="cellAction">
            <Link className="link" to={`order/${params.row.id}`}>
              <div className="viewButton">View</div>
            </Link>
            <Link className="link" to={`/edit-order/${params.row.id}`}>
              <div className="editButton">Edit</div>
            </Link>
          </div>
        );
      },
    },
  ];
 
  return (
    <div className="delivery">
      <div className="delivery-container">
        <div className="top-delivery">
          <h1>Delivery</h1>
          <icon.RoomService />
        </div>
        <div className="bottom">
          <DataGrid
            className="data-client-grid"
            rows={order}
            columns={columns.concat(actionColums)}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 8 },
              },
            }}
            pageSizeOptions={[5, 10]}
            // checkboxSelection
          />
        </div>
      </div>
    </div>
  );
};

export default Delivery;
