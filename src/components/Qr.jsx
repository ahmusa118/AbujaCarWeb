import React from 'react'
import { QRCode } from "react-qr-svg";
const Qr = () => {
    const queryParams = new URLSearchParams(location.search);
    const name = queryParams.get('url');
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <QRCode
      bgColor="#FFFFFF"
      fgColor="#000000"
      level="Q"
      style={{ width: 256 }}
      value={`${name}`}
    />
  </div>
  
  )
}

export default Qr