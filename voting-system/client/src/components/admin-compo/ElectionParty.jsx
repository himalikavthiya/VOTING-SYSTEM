import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { useDispatch, useSelector } from "react-redux";
import { GET_ELECTION_PARTY_PANDING } from "../../redux-saga/Admin-saga/election-party/action/action";

const ElectionParty = () => {
  const electionParty = useSelector((state) => state.electionReducer);
  console.log(electionParty.PartyData.Data);
  const dispatch = useDispatch();
  const [dataTableData, setDataTable] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch({ type: GET_ELECTION_PARTY_PANDING });
      // Update the state with the fetched data
      setDataTable(electionParty.PartyData.Data);
    };

    fetchData();
  }, []);

  const columns = [
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
        customBodyRender: (value, tableMeta, updateValue) => {
          // Assuming value is the URL of the image
          return (
            <img
              src={value}
              alt={tableMeta.rowData[0]} // Assuming the party name is in the first column
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
  ];

  const options = {
    filterType: "checkbox",
  };

  return (
    <div className="custom-container">
      <MUIDataTable
        title={"Election Party List"}
        data={dataTableData}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default ElectionParty;
