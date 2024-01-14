import React, { useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function AdminActiveTable() {
    const [userData, setUserData] = useState([]);
  
    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/getAdminUserData');
        const data = await response.json();
                
        setUserData(data); 
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    
    const handleReject = async (admin_id) => {
      try {
        if (admin_id === undefined || admin_id === null) {
          return;
        }

        const confirmed = window.confirm("Are you sure you want to delete this admin?");
    
        if (!confirmed) {
          return; 
        }
    
        const response = await fetch(`http://localhost:4000/api/deleteAdminUser/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ admin_id })
        });
    
        const data = await response.json();
        if (data.success) {
          fetchData();
        } else {
          console.error('Error deleting user:', data.message);
        }
      } catch (error) {
        console.error('Error deleting user:', error.message);
      }
    };
  
    return (
        <>
      <h1 style={{ marginTop: '20px', marginBottom: '20px' }}>Active Admin</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Acceptance Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Delete Admin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user, index) => (
              <TableRow
                key={user.admin_id || index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{user.admin_username}</TableCell>
                <TableCell>{user.admin_email}</TableCell>
                <TableCell>{user.admin_registration_date}</TableCell>
                <TableCell>{user.admin_status}</TableCell>
                  <TableCell>
                  <button
                    style={{ padding: '8px', fontSize: '12px', width: '60px', backgroundColor: 'red' }}
                    onClick={() => handleReject(user.admin_id)}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </>
    );
}
  
export default AdminActiveTable;