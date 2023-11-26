import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector, useDispatch } from "react-redux";
import { fetchclient } from "../../../redux/admin/adminSlice";
import { Link } from "react-router-dom";
import "./client-list.scss";

const Clientlist = () => {
  const client = useSelector((state) => state.admin.clients);
  console.log(client);
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
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
    { field: "firstname", headerName: "First name", width: 130 },
    { field: "lastname", headerName: "Last name", width: 130 },
    { field: "email", headerName: "email", width: 130 },
    { field: "phonenumber", headerName: "phone", width: 130 },
    { field: "accountType", headerName: "accountType", width: 130 },
    {
      field: "verification",
      headerName: "verification",
      width: 130,
      renderCell: (params) => {
        const isVerified = params.row.verification;
        return isVerified === "verify" ? (
          <span className="verified">Verified</span>
        ) : (
          <span className="notverified">Not Verified</span>
        );
      },
    },
  ];
  const actionColums = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
         <Link className="link" to={`order/${params.row.id}`}>
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];
  return (
    <div className="client-list">
      <DataGrid
        className="data-client-grid"
        rows={client}
        columns={columns.concat(actionColums)}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default Clientlist;
