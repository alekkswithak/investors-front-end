import React, { useState, useEffect } from "react";
import { Card, Form, Table, Alert } from "react-bootstrap";
import axios from "axios";
import { useLocation } from "react-router-dom";

function InvestorDetail() {
  const location = useLocation();
  const investor = location.state.investor;
  const [assetClass, setAssetClass] = useState("");
  const [commitmentData, setCommitmentData] = useState([]);

  useEffect(() => {
    if (assetClass && investor) {
      axios
        .get(
          `http://localhost:8000/api/investor/commitment/${assetClass}/${investor.firm_id}`
        )
        .then((response) => {
          setCommitmentData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [assetClass, investor]);

  if (!investor) {
    return <div>No investor selected.</div>;
  }

  const handleAssetClassChange = (event) => {
    setCommitmentData([]);
    setAssetClass(event.target.value);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Title>{investor.firm_name}</Card.Title>
        <Card.Text>
          {new Date(investor.date_added).toLocaleDateString()}
        </Card.Text>
        <Form.Group controlId="assetClassDropdown">
          <Form.Label>Asset Class</Form.Label>
          <Form.Control
            as="select"
            value={assetClass}
            onChange={handleAssetClassChange}
          >
            <option value="">Select Asset Class</option>
            <option value="pe">Private Equity</option>
            <option value="pd">Private Debt</option>
            <option value="re">Real Estate</option>
            <option value="inf">Infrastructure</option>
            <option value="nr">Natural Resources</option>
            <option value="hf">Hedge Funds</option>
          </Form.Control>
        </Form.Group>
        {commitmentData.length === 0 && (
          <Alert variant="warning">Please select an asset class.</Alert>
        )}
        {commitmentData.length > 0 && (
          <Table striped hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Currency</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {commitmentData.map((commitment) => (
                <tr key={commitment.id}>
                  <td>{commitment.id}</td>
                  <td>{commitment.currency}</td>
                  <td>{commitment.amount}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
}

export default InvestorDetail;
