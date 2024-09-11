import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import Axios from 'axios';
import { useParams } from "react-router-dom";
import { Button, Card, CardContent, TextField, Typography } from '@mui/material';

function PaymentPage() {

    const navigate = useNavigate();

    // Access the tourNumber parameter from the route
  const { tourNumber } = useParams();

  const [tourName, setTourName] = useState(''); // To store fetched tour name
  const [tourPrice, setTourPrice] = useState(0); // To store fetched tour price
  const [newUpi, setNewUpi] = useState('');
  const [recaptchaVerified, setRecaptchaVerified] = useState(false);

  // Fetch tour information based on tour number
  useEffect(() => {
    async function fetchTourData() {
        try {
            const response = await Axios.get(`http://localhost:5000/api/tour/by-tour-number/${tourNumber}`);
            setTourName(response.data.tourName);
            setTourPrice(response.data.tourPrice);
        } catch (error) {
            console.error('Error fetching tour data: ', error);
        }
    }
    fetchTourData();
}, [tourNumber]);

  const handleRecaptchaChange = (token) => {
    // You can add further verification logic here if needed
    setRecaptchaVerified(!!token);
  };

  const handlePay = () => {
    if (recaptchaVerified) {
        // You can add any additional logic here if needed.
        // In your case, you simply want to navigate to the customer page.
        navigate(`/customer`);
    }
};

  return (
    <div>
      <h1>Payment Page</h1>
      <Card>
        <CardContent>
          <Typography variant="h6">Tour Information</Typography>
          <TextField
            label="Tour Name"
            value={tourName}
            disabled
            InputLabelProps={{ shrink: true }}
            sx={{width:'90%'}} style={{marginTop: 10, marginLeft:10}}
          />
          <TextField
            label="Tour Number"
            value={tourNumber}
            disabled
            InputLabelProps={{ shrink: true }}
            sx={{width:'90%'}} style={{marginTop: 10, marginLeft:10}}
          />
          <TextField
            label="Tour Price"
            value={tourPrice}
            disabled
            InputLabelProps={{ shrink: true }}
            sx={{width:'90%'}} style={{marginTop: 10, marginLeft:10}}
          />
          <Typography variant="h6">Payment Information</Typography>
          <TextField
            label="New UPI"
            value={newUpi}
            onChange={(e) => setNewUpi(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{width:'90%'}} style={{marginTop: 10, marginLeft:10}}
          />
          <ReCAPTCHA
            sitekey="6LdX6_UoAAAAAJsxEeZihAInOE4ygdjn3DAtiEhf"
            onChange={handleRecaptchaChange}
          />
          <Button
            variant="contained"
            onClick={handlePay}
            disabled={!recaptchaVerified}
            sx={{width:'90%'}} style={{marginTop: 10, marginLeft:10}}
          >
            Pay
          </Button>

          <nav >
            <Link to="">BACK TO CUSTOMER PAGE</Link>
          </nav>


        </CardContent>
      </Card>
    </div>
  );
}

export default PaymentPage;
