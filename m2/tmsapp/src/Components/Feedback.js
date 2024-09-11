import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import {
  Alert,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import fb1 from '../pics/feedback1.jpg';

const feedbackStyle = {
  backgroundImage: `url(${fb1})`,
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




export default function Feedback( { userRole } ) {
  const [status, setStatus] = useState(null);
  const [data, setData] = useState([]);
  const [tourName, setTourName] = useState('');
  const [tourRating, setTourRating] = useState('');
  const [tourReview, setTourReview] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await Axios.post('http://localhost:5000/api/feedback', {
        tourName: tourName,
        tourRating: tourRating,
        tourReview: tourReview,
      });

      setData([...data, response.data]);
      setStatus(true);
    } catch (error) {
      console.log('Error sending data:', error);
      setStatus(false); // Set status to false to indicate an error
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get('http://localhost:5000/api/feedback');
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  return (

    <div style={feedbackStyle}>
    <Stack direction="row" spacing={1} style={{ marginLeft: 35, marginTop: 35 }}>
      
    {userRole === 'customer' && (
      <Paper elevation={6} sx={{ height: '200vh', width: '30%', backgroundColor:'rgba(0, 0, 0, 0.4) !important' }} style={{ marginBottom: 20 }}>
        <Stack direction="column">
          <Paper sx={{ backgroundColor:'rgba(0, 0, 0, 0.4) !important', m: 3 }}>
            <Card sx={{ backgroundColor: '#64CCC5' }}>
              <Stack direction="column" spacing={3} sx={{ m: 3 }}>
                <h1><font color='#EEEEEE'>FEEDBACKS POSTING</font></h1>
                <TextField onChange={(e) => { setTourName(e.target.value) }} label='Tour Name' InputLabelProps={{ shrink: true }} />
                <TextField onChange={(e) => { setTourRating(e.target.value) }} label='Tour Rating (Out of 5)' InputLabelProps={{ shrink: true }} />
                <TextField onChange={(e) => { setTourReview(e.target.value) }} label='Tour Review' InputLabelProps={{ shrink: true }} />
                <Button variant='contained' onClick={handleSubmit}>POST</Button>
                {status ? (
                  <Alert severity='success'>Review Posted Successfully</Alert>
                ) : (
                  <Alert severity='error'>Failed to post feedback</Alert>
                )}
              </Stack>
            </Card>
          </Paper>
        </Stack>
      </Paper>

    )}

    
      <Paper elevation={6} style={{ marginRight: 15 }} sx={{ height: '100%', width: '70%', backgroundColor:'rgba(0, 0, 0, 0.4) !important' }}>
        <h1 align='center'><font color='#EEEEEE'>REVIEWS</font></h1>
        <Grid container spacing={1} sx={{ m: 1 }}>
          {data.map((item, index) => (
            <Grid item xs={4} sm={3} sx={{ m: 1, width: '33.33%' }} style={{ marginRight: 60 }} key={index}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="h5">
                    Tour Name: {item.tourName}
                  </Typography>
                  <Typography>Tour Rating: {item.tourRating}</Typography>
                  <Typography>Tour Review: {item.tourReview}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Stack>

    </div>
  );
}
