import React, { useState, useEffect } from 'react';

import Tl from './Tl'
import Login from './Login'
import { Tabs } from 'antd';
import 'antd/dist/reset.css';

const Ra = () => {
    const { TabPane } = Tabs;
    const [activeTab, setActiveTab] = useState('Tl');
  
  const handleTabChange = (key) => {
    setActiveTab(key);
  }
 

  return (
    <div className="admin-container ">
           <Tabs activeKey={activeTab} onChange={handleTabChange}>
      
           <TabPane tab="Tl" key="Tl">
        <Tl/>
      </TabPane>
          <TabPane tab="Seller Login" key="login">
        <Login/>
      </TabPane>
    
    </Tabs>
    </div>
  );
};

export default Ra;
