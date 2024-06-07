import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const InvestorTable = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const handleRowClick = (investor) => {
    navigate(`/detail/${investor.firm_id}`, { state: { investor } });
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/investors")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Table striped hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>DateAdded</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        {data.map((investor) => (
          <tr key={investor.firm_id} onClick={() => handleRowClick(investor)}>
            <td>{investor.firm_id}</td>
            <td>{investor.firm_name}</td>
            <td>{new Date(investor.date_added).toLocaleDateString()}</td>
            <td>{investor.address}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default InvestorTable;
