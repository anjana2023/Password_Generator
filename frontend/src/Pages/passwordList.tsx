import React from 'react';
import SavedPasswords from '../components/Main/savedPassword';
import Navbar from '../components/Main/navbar'

const PasswordList: React.FC = () => {
  return (
    
       <div className={`lg:pl-20 lg:ml-20`}  style={{
        // backgroundImage: `url(${backgroundImage})`,
        // backgroundSize: 'cover', // Ensures the image covers the container
        backgroundPosition: 'center', // Centers the image
        backgroundRepeat: 'no-repeat', // Prevents image repetition
        height: '100%', // Sets the container height
        width: '100%', // Sets the container width
        maxWidth: '1200px',
      }} >
    <div className="lg:pl-20 lg:ml-20">
    <div className="lg:pl-20 lg:ml-20">
    <div className="lg:pl-20 "></div>
        <Navbar/>
      <SavedPasswords />
    </div>
    </div>
    </div>
    
  );
};

export default PasswordList;
