import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { Helmet, HelmetProvider } from "react-helmet-async";
import axios from "axios";
import "pages/workspace/table.scss";

export default function ApptTable() {
  const [appts, setAppts] = useState([]);

  // Fetch appointment data
  useEffect(() => {
    axios
      .get("http://localhost:5000/appointment")
      .then((res) => {
        const reverseData = res.data.reverse();
        const reverseDataWithNo = reverseData.map((item, index) => ({
          ...item,
          number: index + 1,
        }));
        setAppts(reverseDataWithNo);
      })
      .catch((err) => {
        const message = `Error: ${err}`;
        window.alert(message);
      });
  }, []);

  // Assign appointment priority
  const getPriority = (status) => {
    switch (status) {
      case "Reviewing":
        return 1;
      case "Accepted":
        return 2;
      case "Declined":
        return 3;
      default:
        return 4;
    }
  };

  // Sort appointments based on status priority
  const sortedAppts = [...appts].sort(
    (a, b) => getPriority(a.status) - getPriority(b.status)
  );

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        const appt = params.row;
        return (
          <div className="cellAction">
            <NavLink className="viewLink" to={`/appointment/${appt.id}/view`}>
              <div className="viewButton">View</div>
            </NavLink>
          </div>
        );
      },
    },
  ];

  const columns = [
    { field: "number", headerName: "No.", width: 50 },
    { field: "phoneNumber", headerName: "Phone number", width: 120 },
    { field: "fullName", headerName: "Patient's name", width: 200 },
    { field: "date", headerName: "Appointment date", width: 160 },
    { field: "need", headerName: "Service", width: 240 },
    { field: "email", headerName: "Email", width: 240 },
    { field: "createdAt", headerName: "Requested on", width: 160 },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
  ].concat(actionColumn);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Appointments list</title>
        </Helmet>
      </HelmetProvider>
      <div className="datatable">
        <div className="datatableTitle">List of appointments</div>
        <DataGrid
          className="datagrid"
          rows={sortedAppts}
          getRowId={(row) => row._id}
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
