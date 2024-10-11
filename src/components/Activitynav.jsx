import React from 'react';
import { Button } from 'antd';

import SearchIcon from '@ant-design/icons/SearchOutlined';
import { UserOutlined } from '@ant-design/icons';
const Activitynav = ({ username, showLoginModal, showSignupModal, logout, showModal }) => {
  return (
    <React.Fragment >

    <div className='bg-gray-200 z-40 w-full p-2'>
      {username ? (
        // Display username and logout button if local storage is not null
        <div className='flex'>
            <SearchIcon onClick={showModal} className='mr-2'/>
            <div className='bg-gray-300 mr-2 rounded-full p-1 shadow font-thin flex '><UserOutlined /><p className='pl-2'>{username}</p></div>
          <Button className='' onClick={logout}>Logout</Button>
        </div>
      ) : (
        // Display login and signup buttons if local storage is null
        <div>
            <SearchIcon onClick={showModal} className='mr-2'/>
           <Button className='mr-2' onClick={showLoginModal}>Login</Button>
           <Button onClick={showSignupModal}>Signup</Button>
        </div>
      )}
    </div>

    </React.Fragment>
    
  );
};

export default Activitynav;
