import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Axios from 'axios';
import React, { useEffect, useState } from 'react';

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

export default function ViewHotel() {

  const [hotelDetails, setHotelDetails] = useState([]);

  const fetchData = async() => {
    try {
      const response = await Axios.get("http://localhost:5000/api/hotel");
      setHotelDetails(response.data);

    } catch (error) {
      console.log(error.message)
    }
  }

  useEffect(() => {
    fetchData();
  },[])

  return (
    <div style={hotelStyle}>
        <h2 align='center'>HOTEL DETAILS</h2>

        <TableContainer component={Paper} style={hotelStyle} >

          <Table>

            <TableHead style={{hotelStyle,fontWeight:'bold'}}>
              <TableRow>
                <TableCell>HOTEL NUMBER</TableCell>
                <TableCell>HOTEL NAME</TableCell>
                <TableCell>HOTEL LOCATION</TableCell>
                <TableCell>HOTEL RATING</TableCell>
                <TableCell>HOTEL AMINITIES</TableCell>
                <TableCell>HOTEL EMAIL</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {
                hotelDetails.map((hotel)=> (
                  <TableRow key={hotel._id}>
                    <TableCell>{hotel.hotelNumber}</TableCell>
                    <TableCell>{hotel.hotelName}</TableCell>
                    <TableCell>{hotel.hotelLocation}</TableCell>
                    <TableCell>{hotel.hotelRating}</TableCell>
                    <TableCell>{hotel.hotelAminities}</TableCell>
                    <TableCell>{hotel.email}</TableCell>
                  </TableRow>
                ))
              }
            </TableBody>

          </Table>

        </TableContainer>
    </div>
  )
}
