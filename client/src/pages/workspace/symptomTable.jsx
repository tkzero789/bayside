import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Helmet, HelmetProvider } from "react-helmet-async";

import "./table.scss";

export default function SymptomTable({ userRole, userInfos }) {
  const [symptoms, setSymptoms] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/symptom/`)
      .then((res) => {
        const symptoms = res.data;
        setSymptoms(symptoms);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
  }, []);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const symptom = params.row;
        return (
          <div className="cellAction">
            <NavLink className="viewLink" to={`/symptom/${symptom.id}/view`}>
              <div className="viewButton">View</div>
            </NavLink>
            {symptom.status === "Request Edit" &&
              userRole === "head-doctor" && (
                <NavLink
                  className="viewLink"
                  to={`/symptom/${symptom.id}/edit`}
                >
                  <div className="editButton">Edit</div>
                </NavLink>
              )}
            {(symptom.status === "Pending Create" ||
              symptom.status === "Pending Update") &&
              userRole === "admin" && (
                <NavLink
                  className="viewLink"
                  to={`/symptom/approve/${symptom.id}`}
                >
                  <div className="checkButton">Approve</div>
                </NavLink>
              )}
          </div>
        );
      },
    },
  ];

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Symptom", width: 500 },
    {
      field: "doctorCreated",
      headerName: "Created by",
      width: 180,
      valueGetter: (params) => params.row.createInfos.doctorCreated,
    },
    {
      field: "doctorID",
      headerName: "Doctor ID",
      width: 120,
      valueGetter: (params) => params.row.createInfos.doctorID,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        const status = params.row.status.replace(" ", "-");
        return (
          <div className={`cellWithStatus ${status}`}>{params.row.status}</div>
        );
      },
    },
  ].concat(actionColumn);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Symptoms list</title>
        </Helmet>
      </HelmetProvider>
      <div className="datatable">
        <div className="datatableTitle">
          List of symptoms
          {userRole === "head-doctor" && (
            <NavLink to="/symptom/create" className="add-link ms-auto">
              Add symptom
            </NavLink>
          )}
        </div>
        <DataGrid
          className="datagrid"
          rows={symptoms}
          getRowId={(row) => row._id}
          getRowClassName={(params) =>
            `rowWithStatus ${params.row.status.replace(" ", "-")}`
          }
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          checkboxSelection
          sx={{
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "transparent",
              boxShadow: " rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            },
          }}
        />
      </div>
    </>
  );
}
