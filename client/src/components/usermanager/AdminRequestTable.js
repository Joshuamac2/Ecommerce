import React, { useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function AdminRequestTable() {
    const [userData, setUserData] = useState([]);
  
    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/getRegisteredUserData');
        const data = await response.json();
                
        setUserData(data); 
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    const handleConfirm = async (id) => {
      try {
        if (id === undefined || id === null) {
          return;
        }

        const confirmed = window.confirm("Are you sure you want to confirm this user?");
    
        if (!confirmed) {
          return; 
        }
    
        const response = await fetch(`http://localhost:4000/api/confirmRegisteredUser/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id })
        });
    
        const data = await response.json();
        if (data.success) {
          fetchData();
        } else {
          console.error('Error confirming user:', data.message);
        }
      } catch (error) {
        console.error('Error confirming user:', error.message);
      }
    };
    
    const handleReject = async (id) => {
      try {
        if (id === undefined || id === null) {
          return;
        }

        const confirmed = window.confirm("Are you sure you want to reject this user?");
    
        if (!confirmed) {
          return; 
        }
    
        const response = await fetch(`http://localhost:4000/api/rejectRegisteredUser/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id })
        });
    
        const data = await response.json();
        if (data.success) {
          fetchData();
        } else {
          console.error('Error rejecting user:', data.message);
        }
      } catch (error) {
        console.error('Error rejecting user:', error.message);
      }
    };
  
    return (
        <>
      <h1 style={{ marginTop: '20px', marginBottom: '20px' }}>User Management</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Registration Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Confirm</TableCell>
              <TableCell>Reject</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user, index) => (
              <TableRow
                key={user.id || index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell>{user.reg_username}</TableCell>
                <TableCell>{user.reg_email}</TableCell>
                <TableCell>{user.registration_date}</TableCell>
                <TableCell>{user.reg_status}</TableCell>
                <TableCell>
                  <button
                    style={{ padding: '8px', fontSize: '12px', width: '60px' }}
                    onClick={() => handleConfirm(user.id)}
                  >
                    Confirm
                  </button>
                  </TableCell>
                  <TableCell>
                  <button
                    style={{ padding: '8px', fontSize: '12px', width: '60px', backgroundColor: 'red' }}
                    onClick={() => handleReject(user.id)}
                  >
                    Reject
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
  
export default AdminRequestTable;