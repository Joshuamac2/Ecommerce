import AdminImage from "./AdminImage.js";

function AdminRegisterConfirmation() {
    return (
      <div style={containerStyle}>
        <AdminImage />
        <div style={contentStyle}>
          <h1>Registration Confirmation</h1>
          <p>Your request has been forwarded to management. If your request is approved, they will get in touch with you.</p>
        </div>
      </div>
    );
 }
  
const containerStyle = {
  display: 'flex',
  justifyContent: 'center', 
  alignItems: 'center', 
  marginLeft: '33px',
};

const contentStyle = {
  textAlign: 'center', 
};
  
export default AdminRegisterConfirmation;
