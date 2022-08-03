import React from 'react'
import MenuAdmin from '../../component/Menu/MenuAdmin'
import UserTable from './UserTable'

export default function ListUsers() {
  return (
    <div className="user_management">
        <MenuAdmin/>
        <div className="content">
        <div className="container">
          <h1>
            Danh sách tài khoản
          </h1>
        
          <UserTable/>
        </div>
      </div>
    </div>
  )
}

