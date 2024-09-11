import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import {Alert, Button, Card, CardContent, Divider, FormLabel, Grid, Paper, Stack, TextField, Typography} from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AddIcon from '@mui/icons-material/Add';
import cust1 from '../pics/customer1.jpg';

const customerStyle = {
  backgroundImage: `url(${cust1})`,
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


export default function Profile() {

  const [file, setFile] = useState(null);

  const [status, setStatus] = useState(false);

  const [data, setData] = useState([]);

  const [CustomerName, setCustomerName] = useState('');
  const [CustomerPhone, setCustomerPhone] = useState("");
  const [CustomerEmail, setCustomerEmail] = useState("");
  const [CustomerAddress, setCustomerAddress] = useState("");
  const [CustomerAge, setCustomerAge] = useState("");



  //
  function handleFileChange(event){
    setFile(event.target.files[0]);
  };


  // FUNCTION FOR SENDING DATA FOR INDIVIDUAL CUSTOMER POSTING

  const handleSubmit = async(event) => {
    event.preventDefault();

    try {
      
      const response = await Axios.post('http://localhost:5000/api/customer', {
        CustomerName : CustomerName,
        CustomerPhone: CustomerPhone,
        CustomerEmail: CustomerEmail,
        CustomerAddress: CustomerAddress,
        CustomerAge: CustomerAge
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
      const response = await Axios.post('http://localhost:5000/api/customer/upload', formData, {
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
        const response = await Axios.get('http://localhost:5000/api/customer');
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
      
      await Axios.delete(`http://localhost:5000/api/customer/${_id}`);
      const updatedData = data.filter(item=>item._id !== _id);
      setData(updatedData);

    } catch (error) {
      console.error('Error deleting item', error);
    }
  }

  //
  const [editingCustomer, setEditingCustomer] = useState({});


  // Function to handle changes in the form fields for in-place editing
  const handleFieldChange = (field, value) => {
    setEditingCustomer({
      ...editingCustomer,
      [field]: value,
    });
  };

  // UPDATE FUNCTION
  const handleUpdate = async (_id) => {
    try {
      const response = await Axios.put(`http://localhost:5000/api/customer/${_id}`, editingCustomer);
      setStatus(true);
  
      const updatedData = data.map((item) => (item._id === _id ? response.data : item));
      setData(updatedData);
  
      // Clear the editing state after a successful update
      setEditingCustomer({});
    } catch (error) {
      console.error('Error updating customer', error);
    }
  };
  
  

  return (

    <div style={customerStyle}>
    <Stack direction="row" spacing={1} style={{marginLeft:35 , marginTop:35}}>

      <Paper elevation={6}  sx={{height:'160vh' , width:'30%', backgroundColor:'rgba(0, 0, 0, 0.4) !important'}} style={{marginBottom:20}}>

        <Stack direction="column">

          <h1 align='center'><font color='#EEEEEE'>CUSTOMERS BULK POSTING</font></h1>
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

                <h1><font color='#EEEEEE'>CUSTOMERS POSTING</font></h1>
                <TextField onChange={(e)=> {setCustomerName(e.target.value)}} label='Customer Name' InputLabelProps={{shrink: true}}/>
                <TextField onChange={(e)=> {setCustomerPhone(e.target.value)}} label='Customer Phone' InputLabelProps={{shrink: true}}/>
                <TextField onChange={(e)=> {setCustomerEmail(e.target.value)}} label='Customer Email' InputLabelProps={{shrink: true}}/>
                <TextField onChange={(e)=> {setCustomerAddress(e.target.value)}} label='Customer Address' InputLabelProps={{shrink: true}}/>
                <TextField onChange={(e)=> {setCustomerAge(e.target.value)}} label='Customer Age' InputLabelProps={{shrink: true}}/>
                <Button variant='contained' onClick={handleSubmit}>POST</Button>
                {status && <Alert severity='success'>Customer Inserted Successfully</Alert>}

              </Stack>
            </Card>

          </Paper>

        </Stack>

      </Paper>

      <Paper elevation={6} style={{marginRight:15}} sx={{height:'100%' , width:'70%', backgroundColor:'rgba(0, 0, 0, 0.4) !important'}}>

        <h1 align='center'><font color='#EEEEEE'>CUSTOMERS DATA</font></h1>

        <Grid container spacing={1} sx={{ m: 1 }}>
          {data.map((item, index) => (
            <Grid item xs={4} sm={3} sx={{ m: 1, width: '33.33%' }} style={{ marginRight: 60 }} key={index}>
              <Card>
                <CardContent>
                  {item._id === editingCustomer._id ? (
                    // Render form fields with existing data for editing
                    <>
                      <TextField
                        onChange={(e) => handleFieldChange('CustomerName', e.target.value)}
                        label="Customer Name"
                        value={editingCustomer.CustomerName || item.CustomerName} // Provide the existing value if not changed
                        InputLabelProps={{ shrink: true }}
                        sx={{ m: 1 }}
                      />
                      <TextField
                        onChange={(e) => handleFieldChange('CustomerPhone', e.target.value)}
                        label="Customer Phone"
                        value={editingCustomer.CustomerPhone || item.CustomerPhone}
                        InputLabelProps={{ shrink: true }}
                        sx={{ m: 1 }}
                      />
                      <TextField
                        onChange={(e) => handleFieldChange('CustomerEmail', e.target.value)}
                        label="Customer Email"
                        value={editingCustomer.CustomerEmail || item.CustomerEmail}
                        InputLabelProps={{ shrink: true }}
                        sx={{ m: 1 }}
                      />
                      <TextField
                        onChange={(e) => handleFieldChange('CustomerAddress', e.target.value)}
                        label="Customer Address"
                        value={editingCustomer.CustomerAddress || item.CustomerAddress}
                        InputLabelProps={{ shrink: true }}
                        sx={{ m: 1 }}
                      />
                      <TextField
                        onChange={(e) => handleFieldChange('CustomerAge', e.target.value)}
                        label="Customer Age"
                        value={editingCustomer.CustomerAge || item.CustomerAge}
                        InputLabelProps={{ shrink: true }}
                        sx={{ m: 1 }}
                      />
                      <Button variant="contained" onClick={() => handleUpdate(item._id)}>
                        Save
                      </Button>
                      <Button variant="contained" onClick={() => setEditingCustomer({})}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    // Render customer details if not in edit mode
                    <>
                      <Typography variant="h6" component="h5">
                        Customer Name: {item.CustomerName}
                      </Typography>
                      <Typography>Customer Phone: {item.CustomerPhone}</Typography>
                      <Typography>Customer Email: {item.CustomerEmail}</Typography>
                      <Typography>Customer Address: {item.CustomerAddress}</Typography>
                      <Typography>Customer Age: {item.CustomerAge}</Typography>
                      <Stack direction="row" spacing={2}>
                        <Button onClick={() => handleDelete(item._id)} variant="contained" startIcon={<DeleteRoundedIcon />} />
                        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setEditingCustomer(item)}>
                          Edit
                        </Button>
                      </Stack>
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
