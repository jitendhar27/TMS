import React, { useState } from 'react';
import Axios from 'axios';
import { Alert, Button, Grid, TextField } from '@mui/material';
import hotel1 from '../pics/hotel1.jpg';

const hotelStyle = {
  backgroundImage: `url(${hotel1})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  backgroundColor: 'rgba(0, 0, 0, 0.4) !important',
  minHeight: '120%',
  minWidth: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

export default function UpdateHotel() {
  const [hotel, setHotel] = useState(null);
  const [hotelNumber, setHotelNumber] = useState('');
  const [status, setStatus] = useState(false);
  const [hotelNumberDisabled, setHotelNumberDisabled] = useState(false); // Add this state

  const [editData, setEditData] = useState({
    hotelNumber: '',
    hotelName: '',
    hotelLocation: '',
    hotelRating: '',
    hotelAminities: '',
    email: '',
  });

  const handleChange = (e, fieldName) => {
    const { value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleClick = async () => {
    if (!hotelNumber) {
      alert('Please enter a valid hotel number.');
      return;
    }

    try {
      const response = await Axios.get(`http://localhost:5000/api/hotel/hotelNumber/${hotelNumber}`);
      if (response.data) {
        setHotel(response.data);
        setEditData({
          hotelNumber: response.data.hotelNumber,
          hotelName: response.data.hotelName || '',
          hotelLocation: response.data.hotelLocation || '',
          hotelRating: response.data.hotelRating || '',
          hotelAminities: response.data.hotelAminities || '',
          email: response.data.email || '',
        });
        setStatus(false);
        setHotelNumberDisabled(true); // Disable the "Hotel Number" field after fetching data

      } else {
        setHotel(null);
        setStatus(false);
      }
    } catch (error) {
      console.error('Error fetching hotel data', error);
      setStatus(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await Axios.patch(`http://localhost:5000/api/hotel/${hotel._id}`, editData);
      if (response.data) {
        setStatus(true);
        setHotel(response.data);
      } else {
        setStatus(false);
      }
    } catch (error) {
      console.error('Error updating hotel data', error);
      setStatus(false);
    }
  };

  return (
    <div style={hotelStyle}>
      <h2 align="center" backgroundColor="#E4F1FF">
        UPDATE HOTEL
      </h2>
      <Grid align="center">
        <Grid item xs={12}>
          <TextField
            label="Hotel Number"
            size="small"
            sx={{ width: 300, height: 30, mb: 3 }}
            value={hotelNumber}
            onChange={(e) => setHotelNumber(e.target.value)}
            InputLabelProps={{ shrink: true }}
            disabled={hotelNumberDisabled} // Disable the field if hotelNumberDisabled is true
          />
        </Grid>

        {hotel && (
          <>
            <Grid item xs={12}>
              <TextField
                label="Hotel Name"
                size="small"
                sx={{ width: 300, height: 30, mb: 3 }}
                value={editData.hotelName}
                onChange={(e) => handleChange(e, 'hotelName')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Hotel Location"
                size="small"
                sx={{ width: 300, height: 30, mb: 3 }}
                value={editData.hotelLocation}
                onChange={(e) => handleChange(e, 'hotelLocation')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Hotel Rating"
                size="small"
                sx={{ width: 300, height: 30, mb: 3 }}
                value={editData.hotelRating}
                onChange={(e) => handleChange(e, 'hotelRating')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Hotel Amenities"
                size="small"
                sx={{ width: 300, height: 30, mb: 3 }}
                value={editData.hotelAminities}
                onChange={(e) => handleChange(e, 'hotelAminities')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Hotel Email"
                size="small"
                sx={{ width: 300, height: 30, mb: 3 }}
                value={editData.email}
                onChange={(e) => handleChange(e, 'email')}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
          </>
        )}

        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Button variant="contained" sx={{ m: 2 }} onClick={handleClick}>
            GET HOTEL
          </Button>
        </Grid>

        {hotel && (
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Button variant="contained" sx={{ m: 2 }} onClick={handleUpdate}>
              UPDATE
            </Button>
          </Grid>
        )}
      </Grid>

      {status && (
        <Alert severity="success" sx={{ display: 'flex', justifyContent: 'center' }}>
          Hotel Updated
        </Alert>
      )}
    </div>
  );
}
