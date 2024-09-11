import React, { useState } from 'react';
import {Alert, Button, Grid, TextField} from '@mui/material';
import Axios from 'axios';

import '../App.css';

import hotel1 from '../pics/hotel1.jpg';

const hotelStyle = {
  backgroundImage: `url(${hotel1})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundAttachment: 'fixed',
  backgroundColor: 'rgba(0, 0, 0, 0.4) !important', // 0.6 sets the transparency to 60%
  minHeight: '120%', // Ensures the background covers the entire viewport height
  minWidth: '100%', // Add this
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

export default function AddHotel() {

  const [hotelNumber, setHotelNumber] = useState("");
  const [hotelName, setHotelName] = useState("");
  const [hotelLocation, setHotelLocation] = useState("");
  const [hotelRating, setHotelRating] = useState("");
  const [hotelAminities, setHotelAminities] = useState("");
  const [hotelEmail, setHotelEmail] = useState("");

  const[status, setStatus] = useState(false);

  const handleSubmit = async(e) => {

    e.preventDefault();

    try {
      await Axios.post("http://localhost:5000/api/hotel",{
        hotelNumber: hotelNumber,
        hotelName: hotelName,
        hotelLocation: hotelLocation,
        hotelRating: hotelRating,
        hotelAminities: hotelAminities,
        email: hotelEmail,
        password: "tms123"
      });
      setStatus(true);
    } catch (error) {
      console.log("Error in sending data: ", error)
    }
  }

  const handleRefresh = () => {
    window.location.reload(false);
  }

  

  return (
    <div style={hotelStyle}>
        <h2 align='center' backgroundColor='#E4F1FF'>ADD HOTEL</h2>

        <Grid align='center'>
          <Grid item xs={12}>
            <TextField label='Hotel Number' size='small' sx={{width:300, height:30, mb:3}} 
            value={hotelNumber} onChange={(e)=>setHotelNumber(e.target.value)}/>
          </Grid>

          <Grid item xs={12}>
            <TextField label='Hotel Name' size='small' sx={{width:300, height:30, mb:3}}
             value={hotelName} onChange={(e)=>setHotelName(e.target.value)}/>
          </Grid>

          <Grid item xs={12}>
            <TextField label='Hotel Location' size='small' sx={{width:300, height:30, mb:3}}
             value={hotelLocation} onChange={(e)=>setHotelLocation(e.target.value)}/>
          </Grid>

          <Grid item xs={12}>
            <TextField label='Hotel Rating' size='small' sx={{width:300, height:30, mb:3}}
             value={hotelRating} onChange={(e)=>setHotelRating(e.target.value)}/>
          </Grid>

          <Grid item xs={12}>
            <TextField label='Hotel Aminities' size='small' sx={{width:300, height:30, mb:3}}
             value={hotelAminities} onChange={(e)=>setHotelAminities(e.target.value)}/>
          </Grid>

          <Grid item xs={12}>
            <TextField label='Hotel Email' size='small' sx={{width:300, height:30, mb:3}}
             value={hotelEmail} onChange={(e)=>setHotelEmail(e.target.value)}/>
          </Grid>

          <Grid item xs={12}>
            <TextField label='Hotel Password' size='small' sx={{width:300, height:30, mb:3}}
             value={"tms123"} disabled/>
          </Grid>

          <Grid item xs={6} style={{textAlign:'center'}}>
            <Button variant='contained' sx={{m:2}} onClick={handleSubmit}>SAVE</Button>
            <Button variant='contained' sx={{m:2}} onClick={handleRefresh}>REFRESH</Button>
          </Grid>

        </Grid>
        
        {
          status && (
            <Alert severity='success' sx={{display:'flex', justifyContent:'center'}}>Hotel Inserted</Alert>
          )
        }
        
    </div>
  )
}
