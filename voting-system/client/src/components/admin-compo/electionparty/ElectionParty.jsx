import React, { useEffect, useRef, useState } from "react";
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import * as Icons from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert'

const ElectionParty = () => {
  const electionParty = useSelector(
    (state) => state.electionPartyReducer.PartyData.Data
  );
  console.log(electionParty, "dssss");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [newUrl, setNewUrl] = useState();

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setNewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const columns = [
    {
      name: 'index',
      label: 'No',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return tableMeta.rowIndex + 1
        },
      },
    },
    {
      name: "pName",
      label: "Election Party Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "Profile",
      label: "Party logo",
      options: {
        filter: true,
        sort: false,
        customBodyRender: (value, tableMeta) => {
          return (
            <img
              src={value}
              alt={tableMeta.rowData[0]}
              style={{ width: "50px", height: "auto" }}
            />
          );
        },
      },
    },
    {
      name: "shortCode",
      label: "Short Code",
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: "_id",
      label: "Action",
      options: {
        customBodyRender: (value) => {
          return (
            <div>
              <Icons.EditRounded
                className="editButton"
                onClick={() => {
                  const editdata = dataTableData.find(
                    (data) => data._id === value
                  );
                  navigate("/election-party-form", {
                    state: { editdata: editdata },
                  });
                }}
              ></Icons.EditRounded>
              <Icons.DeleteRounded
                className="deleteButton"
                onClick={async () => {
                  const confirm = await swal({
                    title: "Are you sure?",
                    text: "Are you sure? Want to delete Location? All related data will also be deleted",
                    icon: "warning",
                    buttons: ["No, cancel it!", "Yes, I am sure!"],
                    dangerMode: true,
                  });
                  //     if (confirm) {
                  //       deleteCategory(value)
                  //         .then(() => {
                  //           toast.success('deleted successfully!', {
                  //             key: value,
                  //           })
                  //           console.log(value)
                  //           categoryList()
                  //         })
                  //         .catch(() => {
                  //           toast.error('something went wrong!', {
                  //             key: value,
                  //           })
                  //         })
                  //     }
                }}
              ></Icons.DeleteRounded>
            </div>
          );
        },
      },
    },
  ];

  const options = {
   selectableRows: 'none',
  };

  return (
    <div className="custom-container">
      <div className="right-text">
        <button
          type="button"
          className="btn btn-primary AddButton"
          onClick={() => navigate("/election-party-form")}
        >
          Add Party
        </button>
      </div>
      {/* dataTable data */}
      <MUIDataTable
        title={"Election Party List"}
        data={electionParty}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default ElectionParty;
