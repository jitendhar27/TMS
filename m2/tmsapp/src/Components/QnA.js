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

import qna from '../pics/qna1.jpg';

const qnaStyle = {
  backgroundImage: `url(${qna})`,
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

export default function QnA( { userRole } ) {
  const [status, setStatus] = useState(null);
  const [data, setData] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [editingQnA, setEditingQnA] = useState({ _id: null, question: '', answer: '' });

  const editDetails = userRole !== 'customer' && userRole !== 'hotelier';

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.post('http://localhost:5000/api/qna', {
        question: question,
        answer: answer,
      });
      setData([...data, response.data]);
      setStatus(true);
      setQuestion('');
      setAnswer('');
    } catch (error) {
      console.log('Error sending data:', error);
      setStatus(false);
    }
  };

  const fetchData = async () => {
    try {
      const response = await Axios.get('http://localhost:5000/api/qna');
      setData(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (_id, currentQuestion, currentAnswer) => {
    setEditingQnA({ _id, question: currentQuestion, answer: currentAnswer });
  };

  const handleUpdate = async () => {
    try {
      const response = await Axios.put(`http://localhost:5000/api/qna/${editingQnA._id}`, {
        question: editingQnA.question,
        answer: editingQnA.answer,
      });
      const updatedData = data.map((item) => (item._id === editingQnA._id ? response.data : item));
      setData(updatedData);
      setEditingQnA({ _id: null, question: '', answer: '' });
      setStatus(true);
    } catch (error) {
      console.error('Error updating question', error);
      setStatus(false);
    }
  };

  const handleCancel = () => {
    setEditingQnA({ _id: null, question: '', answer: '' });
  };

  return (

    <div style={qnaStyle}>
    <Stack direction="row" spacing={1} style={{ marginLeft: 35, marginTop: 35 }}>

    {userRole === 'customer' && (
      <Paper elevation={6} sx={{ height: '200vh', width: '30%', backgroundColor:'rgba(0, 0, 0, 0.4) !important' }} style={{ marginBottom: 20 }}>
        <Stack direction="column">

            <Paper sx={{backgroundColor:'#64CCC5', m:3}}>

            <Card sx={{backgroundColor:'#64CCC5'}}>

                <Stack direction="column" spacing={3} sx={{m:3}}>

                <h1><font color='#EEEEEE'>QUESTIONS POSTING</font></h1>
                <TextField onChange={(e)=> {setQuestion(e.target.value)}} label='Tour Question' InputLabelProps={{shrink: true}}/>
                <TextField onChange={(e)=> {setAnswer(e.target.value)}} label='Tour Answer' InputLabelProps={{shrink: true}}/>
                <Button variant='contained' onClick={handleSubmit}>POST</Button>
                {status && <Alert severity='success'>Question Posted Successfully</Alert>}

              </Stack>
            </Card>

          </Paper>

          </Stack>
      </Paper>

    )}

      <Paper elevation={6} style={{ marginRight: 15 }} sx={{ height: '100%', width: '70%', backgroundColor:'rgba(0, 0, 0, 0.4) !important' }}>
        <h1 align="center">
          <font color="#EEEEEE">QNA</font>
        </h1>
        <Grid container spacing={1} sx={{ m: 1 }}>
          {data.map((item, index) => (
            <Grid item xs={4} sm={3} sx={{ m: 1, width: '33.33%' }} style={{ marginRight: 60 }} key={item._id}>
              <Card>
                <CardContent>
                  {item._id === editingQnA._id ? (
                    <div>
                      <TextField
                        label="Question"
                        value={editingQnA.question}
                        onChange={(e) => setEditingQnA({ ...editingQnA, question: e.target.value })}
                      />
                      <TextField
                        label="Answer"
                        value={editingQnA.answer}
                        onChange={(e) => setEditingQnA({ ...editingQnA, answer: e.target.value })}
                      />
                      <Button variant="contained" onClick={handleUpdate}>
                        Save
                      </Button>
                      <Button variant="contained" onClick={handleCancel}>
                        Cancel
                      </Button>

                      
                    </div>
                  ) : (
                    <div>
                      <Typography>Question: {item.question}</Typography>
                      <Typography>Answer: {item.answer}</Typography>

                      {editDetails && (
                      <Button variant="contained" onClick={() => handleEdit(item._id, item.question, item.answer)}>
                        Edit
                      </Button>

                      )}
                    </div>
                  )}
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
