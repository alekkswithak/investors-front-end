import React from "react";
import { Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function InvestorDetail() {
  const location = useLocation();
  const investor = location.state.investor;

  if (!investor) {
    return <div>No investor selected.</div>;
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{investor.firm_name}</Card.Title>
        <Card.Text>
          {new Date(investor.date_added).toLocaleDateString()}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default InvestorDetail;
