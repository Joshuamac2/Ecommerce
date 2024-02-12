import React from 'react';

function AdminImage() {
  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <img src={"images/adminImage.png"} alt="Admin Image" style={{ width: '700px', height: 'auto' }} />
      <div style={{ position: 'absolute', top: '50px', bottom: '50px', right: '50px', width: '1px', backgroundColor: 'black' }}></div>
    </div>
  );
}
  
export default AdminImage;
