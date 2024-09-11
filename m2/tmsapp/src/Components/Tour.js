import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import {Alert, Button, Card, CardContent, Divider, FormLabel, Grid, Paper, Stack, TextField, Typography} from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddIcon from '@mui/icons-material/Add';
import tour1 from '../pics/tour1.jpg';

const tourStyle = {
  backgroundImage: `url(${tour1})`,
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

export default function Tour({ userRole }) {

  const [file, setFile] = useState(null);

  const [status, setStatus] = useState(false);

  const [data, setData] = useState([]);

  const [tourName, setTourName] = useState('');
  const [tourNumber, setTourNumber] = useState('');
  const [tourDescription, setTourDescription] = useState('');
  const [tourPrice, setTourPrice] = useState('');
  const [hotelName, setHotelName] = useState('');
  const [hotelRating, setHotelRating] = useState('');
  const [hotelAminities, setHotelAminities] = useState('');


  // Add variables to conditionally show/hide bulk posting and posting forms
  const canBulkPost = userRole !== 'customer' && userRole !== 'hotelier';

  console.log("tours : "+userRole);

  //
  function handleFileChange(event){
    setFile(event.target.files[0]);
  };


  // FUNCTION FOR SENDING DATA FOR INDIVIDUAL TOUR POSTING

  const handleSubmit = async(event) => {
    event.preventDefault();

    try {
      
      const response = await Axios.post('http://localhost:5000/api/tour', {
        tourName : tourName,
        tourNumber : tourNumber,
        tourDescription : tourDescription,
        tourPrice : tourPrice,
        hotelName : hotelName,
        hotelRating : hotelRating,
        hotelAminities : hotelAminities
      });

      // After successfully posting, update the data state with the new tour data
      setData([...data, response.data]); // Assuming the response contains the newly inserted tour data
      
      setStatus(true);

    } catch (error) {
      console.log('error sending data: ', error);
    }
  }


  // UPLOADING FUNCTION
  const handleUpload = async () =>{
    if(!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {

      // IMPORTANT TASK -> BULK UPLOADING
      const response = await Axios.post('http://localhost:5000/api/tour/upload', formData, {
        headers:{
          'Content-Type': 'multipart/form-data'
        },
      });

      // After successfully uploading, update the data state with the new tour data
      setData([...data, ...response.data]); // Assuming the response contains the newly inserted tour data

      setStatus(true);

    } catch (error) {
      console.error('error upload data: ', error);
    }
  };

  // FETCHING FUNCTION
  useEffect(()=>{
    const fetchData = async()=>{
      try {

        // GETTING DATA USING AXIOS
        const response = await Axios.get('http://localhost:5000/api/tour');
        setData(response.data);   // STORING
        
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  },[]);


  // DELETING FUNCTION
  const handleDelete = async(_id) => {
    try {
      
      await Axios.delete(`http://localhost:5000/api/tour/${_id}`);
      const updatedData = data.filter(item=>item._id !== _id);
      setData(updatedData);

    } catch (error) {
      console.error('Error deleting item', error);
    }
  }


  //
  const [editingTour, setEditingTour] = useState({});


  // Function to handle changes in the form fields for in-place editing
  const handleFieldChange = (field, value) => {
    setEditingTour({
      ...editingTour,
      [field]: value
    });
  }

  // UPDATE FUNCTION
  const handleUpdate = async (_id) => {
    try {
      const response = await Axios.put(`http://localhost:5000/api/tour/${_id}`, editingTour);
      setStatus(true);
      const updatedData = data.map((item) => (item._id === _id ? response.data : item));
      setData(updatedData);
      setEditingTour({});
    } catch (error) {
      console.error('Error updating tour', error);
    }
  };
  

  return (

    <div style={tourStyle}>
    <Stack direction="row" spacing={1} style={{marginLeft:35 , marginTop:35}}>
      
    {canBulkPost && (
      <Paper elevation={6}  sx={{height:'200vh' , width:'30%', backgroundColor:'rgba(0, 0, 0, 0.4) !important'}} style={{marginBottom:20}}>

        <Stack direction="column">

          <h1 align='center'><font color='#EEEEEE'>TOURS BULK POSTING</font></h1>
          <h4 align='center'><font color='#EEEEEE'>Note: Only Upload CSV Files</font></h4>

          <Paper sx={{backgroundColor:'#64CCC5', m:3}}>

            <FormLabel sx={{width:'90%'}} style={{marginTop: 10, marginLeft:10}}>File Upload in CSV format only</FormLabel>
            <TextField type='file' label='Browse' name='file' onChange={handleFileChange} InputLabelProps={{shrink: true}} sx={{width:'90%'}} style={{marginTop: 10, marginLeft:10}}/>
            <Button sx={{width:'90%'}} style={{marginTop: 10, marginLeft:10, marginBottom:10}} variant='contained' onClick={handleUpload}>Upload</Button>
            {status && <Alert severity='success'>CSV File Uploaded Successfully</Alert>}
            
          </Paper>


          <Divider sx={{backgroundColor: '#EEEEEE'}}></Divider>


          <Paper sx={{backgroundColor:'rgba(0, 0, 0, 0.4) !important', m:3}}>

            <Card sx={{backgroundColor:'#64CCC5'}}>

              <Stack direction="column" spacing={3} sx={{m:3}}>

                <h1><font color='#EEEEEE'>TOURS POSTING</font></h1>
                <TextField onChange={(e)=> {setTourName(e.target.value)}} label='Tour Name' InputLabelProps={{shrink: true}}/>
                <TextField onChange={(e)=> {setTourNumber(e.target.value)}} label='Tour Number' InputLabelProps={{shrink: true}}/>
                <TextField onChange={(e)=> {setTourDescription(e.target.value)}} label='Tour Description' InputLabelProps={{shrink: true}}/>
                <TextField onChange={(e)=> {setTourPrice(e.target.value)}} label='Tour Price' InputLabelProps={{shrink: true}}/>
                <TextField onChange={(e)=> {setHotelName(e.target.value)}} label='Hotel Name' InputLabelProps={{shrink: true}}/>
                <TextField onChange={(e)=> {setHotelRating(e.target.value)}} label='Hotel Rating' InputLabelProps={{shrink: true}}/>
                <TextField onChange={(e)=> {setHotelAminities(e.target.value)}} label='Hotel Aminities' InputLabelProps={{shrink: true}}/>
                <Button variant='contained' onClick={handleSubmit}>POST</Button>
                {status && <Alert severity='success'>Tour Inserted Successfully</Alert>}

              </Stack>
            </Card>

          </Paper>

        </Stack>

      </Paper>

    )}

      

      <Paper elevation={6} style={{marginRight:15}} sx={{height:'100%' , width:'70%', backgroundColor:'rgba(0, 0, 0, 0.4) !important'}}>

        <h1 align='center'><font color='#EEEEEE'>TOURS DATA</font></h1>

        <Grid container spacing={1} sx={{m:1}}>

        {data.map((item, index) => (
            <Grid item xs={4} sm={3} sx={{ m: 1, width: '33.33%' }} style={{ marginRight: 60 }} key={index}>
              <Card>
                <CardContent>
                  {item._id === editingTour._id ? (
                    // Render form fields with existing data for editing
                    <>
                      <TextField
                        onChange={(e) => handleFieldChange('tourName', e.target.value)}
                        label="Tour Name"
                        value={editingTour.tourName || item.tourName} // Provide the existing value if not changed
                        InputLabelProps={{ shrink: true }}
                        sx={{ m: 1 }}
                      />
                      <TextField
                        onChange={(e) => handleFieldChange('tourNumber', e.target.value)}
                        label="Tour Number"
                        value={editingTour.tourNumber || item.tourNumber}
                        InputLabelProps={{ shrink: true }}
                        sx={{ m: 1 }}
                      />
                      <TextField
                        onChange={(e) => handleFieldChange('tourDescription', e.target.value)}
                        label="Tour Description"
                        value={editingTour.tourDescription || item.tourDescription}
                        InputLabelProps={{ shrink: true }}
                        sx={{ m: 1 }}
                      />
                      <TextField
                        onChange={(e) => handleFieldChange('tourPrice', e.target.value)}
                        label="Tour Price"
                        value={editingTour.tourPrice || item.tourPrice}
                        InputLabelProps={{ shrink: true }}
                        sx={{ m: 1 }}
                      />
                      <TextField
                        onChange={(e) => handleFieldChange('hotelName', e.target.value)}
                        label="Hotel Name"
                        value={editingTour.hotelName || item.hotelName}
                        InputLabelProps={{ shrink: true }}
                        sx={{ m: 1 }}
                      />
                      <TextField
                        onChange={(e) => handleFieldChange('hotelRating', e.target.value)}
                        label="Hotel Rating"
                        value={editingTour.hotelRating || item.hotelRating}
                        InputLabelProps={{ shrink: true }}
                        sx={{ m: 1 }}
                      />
                      <TextField
                        onChange={(e) => handleFieldChange('hotelAminities', e.target.value)}
                        label="Hotel Aminities"
                        value={editingTour.hotelAminities || item.hotelAminities}
                        InputLabelProps={{ shrink: true }}
                        sx={{ m: 1 }}
                      />
                      <Button variant="contained" onClick={() => handleUpdate(item._id)}>
                        Save
                      </Button>
                      <Button variant="contained" onClick={() => setEditingTour({})}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    // Render tour details if not in edit mode
                    <>
                      <Typography variant="h6" component="h5">
                        Tour Name: {item.tourName}
                      </Typography>
                      <Typography>Tour Number: {item.tourNumber}</Typography>
                      <Typography>Tour Description: {item.tourDescription}</Typography>
                      <Typography>Tour Price: {item.tourPrice}</Typography>
                      <Typography>Hotel Name: {item.hotelName}</Typography>
                      <Typography>Hotel Rating: {item.hotelRating}</Typography>
                      <Typography>Hotel Aminities: {item.hotelAminities}</Typography>
                      
                      {canBulkPost && (
                      <Stack direction="row" spacing={2}>
                        <Button onClick={() => handleDelete(item._id)} variant="contained" startIcon={<DeleteRoundedIcon />} />
                        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setEditingTour(item)}>
                          Edit
                        </Button>
                      </Stack>

                      )}
                      
                    </>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}

              
        </Grid>
        

      </Paper>

    </Stack>

    </div>
  )
}
