import React from 'react';
import loading from "./External/loading.gif";

const Spinner= () => {
  
    return (
      <div  className='text-center mt-5 mb-3'>
        
        <img src={loading} alt="Loading..." />
        
      </div>
    );
  
}

export default Spinner
