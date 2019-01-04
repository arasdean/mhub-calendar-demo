import React from 'react'; 

const Reminder = ({title, color}) => (
    <div className='reminder' style={{background: color}}> <div style={{width: '80%', overflow: 'hidden'}}> {title} </div></div> 
)


export default Reminder; 