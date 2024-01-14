import React from 'react';
import AdminRequestTable from '../../components/usermanager/AdminRequestTable';
import AdminActiveTable from '../../components/usermanager/AdminActiveTable';

function UserManager() {
  
    return (
        <>
    <AdminRequestTable />
    <AdminActiveTable />
      </>
    );
}
  
export default UserManager;