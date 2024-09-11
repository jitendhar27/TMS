import { Typography } from '@mui/material';
import React from 'react';
import home from '../pics/home3.jpg';

const homeStyle = {
  backgroundImage: `url(${home})`,
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



export default function Home() {
  return (
    <div style={homeStyle}>
        <Typography variant='h3' style={{textAlign:'center', margin:'60px', color:'whitesmoke', fontWeight: 'bold'}}>TOURISM MANAGEMENT SYSTEM</Typography>
        <Typography variant='h5' style={{textAlign:'center', margin:'30px', color:'whitesmoke', fontWeight: 'bold'}}>TRAVELLING OPENS THE DOOR TO CREATING MEMORIES</Typography>
        <Typography variant='h6' style={{textAlign:'center', margin:'30px', color:'whitesmoke'}}>
          Traveling and tourism are great ways to explore new places, meet new people, and experience different cultures. 
          Whether you're looking for adventure, relaxation, or a bit of both, there's a destination out there for you. 
          With so many options available, it can be overwhelming to plan a trip, but with the right resources and a bit of research, you can create the perfect itinerary. 
          So pack your bags and get ready to discover the world – the journey is just as important as the destination! 🌍🧳✈️
        </Typography>

        <Typography variant='h5' style={{textAlign:'center', margin:'30px', color:'whitesmoke', fontWeight: 'bold'}}>WITH ALL OUR EXPERIENCES</Typography>
        
        <Typography variant='h6' style={{textAlign:'center', margin:'30px', color:'whitesmoke'}}>
          We are dedicated to providing you with the best travel experience possible
        </Typography>
    </div>
  )
}
