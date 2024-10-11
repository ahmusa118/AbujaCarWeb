import React, { useRef,useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Space, Table, Tag } from 'antd';
import html2canvas from 'html2canvas';
import { QRCode } from "react-qr-svg";
import { DownloadOutlined } from '@ant-design/icons';
import SignatureCanvas from 'react-signature-canvas';
function Receipt() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { Column, ColumnGroup } = Table;
  // Extract data from URL parameters
  const id = queryParams.get('id');
  const name = queryParams.get('name');
  const receiptRef = useRef(null);
  const  phone = queryParams.get('phone');
  const location2 = queryParams.get('location');
  const state = queryParams.get('state');
  const address = queryParams.get('address');
  const price = queryParams.get('price');
  const currencyType= queryParams.get('currencyType');
  const make = queryParams.get('make');
  const carvalue=queryParams.get('carvalue')
  const  balance=queryParams.get('balance')
  const [url,setUrl]=useState(null)
  const signatureRef = useRef(null);
  const signatureRef2 = useRef(null);
  const [signatureData, setSignatureData] = useState(null);
  const [signatureData2, setSignatureData2] = useState(null);
  const category = queryParams.get('category');
  const model = queryParams.get('model');
  const amountInWords= queryParams.get('amountInWords');
  const year = queryParams.get('year');
  const vin = queryParams.get('vin');
  const color = queryParams.get('color');
  const orderType= queryParams.get('orderType');
  const receiptNo= queryParams.get('receiptNo');
const charge=queryParams.get('charge');
console.log(carvalue)


const handleScreenshot = async () => {
  try {
    const canvas = await html2canvas(receiptRef.current);
    const imgData = canvas.toDataURL('image/png');

    // Download the screenshot image
    const link = document.createElement('a');
    

    // Convert data URL to Blob
    const blob = await fetch(imgData).then(res => res.blob());

    // Create a FormData object and append the Blob
    const formData = new FormData();
    formData.append('file', blob);

    // Send a POST request to the endpoint with the FormData containing the image data
    const response = await fetch('https://abujacar.org/api/upload-file-to-google-drive', {
      method: 'POST',
      body: formData,
    });

    // Parse the response JSON
    const responseData = await response.json();
    link.download = `${receiptNo}-${name}.png`;
    link.href = imgData;
    link.click();
    // Handle the response as needed

    // Optionally, set the URL if needed
    if (response.ok) {
      setUrl(responseData.publicUrl);
    } else {
      console.error('Error uploading screenshot:', responseData.error);
    }
  } catch (error) {
    console.error('Error capturing screenshot:', error);
  }
};


  const clearSignature = () => {
    signatureRef.current.clear();
    setSignatureData(null);
  }
  const clearSignature2 = () => {
    signatureRef2.current.clear();
    setSignatureData2(null);
  }
  const [firstPart, secondPart] = id.split('@');


  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width when the component mounts or window resizes
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className='font-roboto p-4 '>
        <div  ref={receiptRef} className=''>
        <div className='flex items-center p-2 border-b-2'><img src='../../assets/abujacarnormal.jpeg' alt='img' className='h-20  rounded-full' />
         <p className=' text-xl ml-2'> Abuja<span className='text-[#da9100]'>Car</span></p>
      
         </div>
          
         <div className='flex flex-row justify-between p-2'>
            <p className='flex flex-col'>
               <p className='font-semibold'>Buyer</p> 
               <p className='text-sm sm:text-base'>{address},
               <p>{state}.</p>
           
               </p>
            </p>
  <h1 className='font-semibold uppercase hidden sm:flex '>Receipt</h1>
  <p className='text-end'><strong>Receipt No:</strong> {receiptNo}</p>
</div>
    <Table size='small' className='mb-2 sm:mb-10 ' dataSource={[{ name: <p className='text-xs sm:text-base'>{name}</p>, phoneNumber: <p className='text-xs sm:text-base'>{phone}</p>,model: <p className='text-xs sm:text-base'>{model}</p>, date: <p className='text-xs sm:text-base'>{new Date(Date.now()).toDateString()}</p>, email:windowWidth<768?<div className='flex flex-col'><p className='text-xs'>{firstPart}</p><p className='text-xs'>@{secondPart}</p></div>:id }]} pagination={false}>
 
    <Column title="Name" dataIndex="name" key="name" />
    <Column title="Email"  dataIndex="email" key="email" />
      <Column title="Phone Number" dataIndex="phoneNumber" key="phoneNumber" />
      <Column title="Date" dataIndex="date" key="date" />
    </Table>
   
    <Table size='small' className='mb-2 sm:mb-10' dataSource={[{ make: <p className='text-xs sm:text-base'>{make}</p>, color: <p className='text-xs sm:text-base'>{color}</p>, year: <p className='text-xs sm:text-base'>{year}</p>, vin:<p className='text-xs sm:text-base'>{vin}</p>,model: <p className='text-xs sm:text-base'>{model}</p> }]} pagination={false}>
 
 <Column title="Make" dataIndex="make" key="make" />
 <Column title="Color" dataIndex="color" key="color" />
   <Column title="Year" dataIndex="year" key="year" />
   <Column title="Vin" dataIndex="vin" key="vin" />
   <Column title="Model" dataIndex="model" key="model" />
 </Table>


 {carvalue && balance ? (
  <Table size='small' className='mb-2 sm:mb-10' dataSource={[{ carvalue: <p className='text-xs sm:text-base'>{carvalue}</p>, balance: <p className='text-xs sm:text-base'>{balance}</p> }]} pagination={false}>
    <Column title="Estimated Car Value" dataIndex="carvalue" key="carvalue" />
    <Column title="Balance" dataIndex="balance" key="balance" />
  </Table>
) : ''}





 <Table size='small' className='mb-2 sm:mb-10' dataSource={[{  price:<p className='text-xs sm:text-base'>{(parseInt(price)).toLocaleString()}</p>,orderType: <p className='text-xs sm:text-base'>{orderType}</p>, category: <p className='text-xs sm:text-base'>{category}</p>, amountInWords:<p className='text-xs sm:text-base'>{amountInWords}</p> ,currencyType: <p className='text-xs sm:text-base'>{currencyType}</p>,  charge:<p className='text-xs sm:text-base'>{charge/100}</p> }]} pagination={false}>
 
 <Column title="Transaction type" dataIndex="orderType" key="orderType" />
 <Column title="Category" dataIndex="category" key="category" />
 <Column title="Price" dataIndex="price" key="price" />
   <Column title="Amount In Words" dataIndex="amountInWords" key="amountInWords" />
   <Column title="Currency" dataIndex="currencyType" key="currencyType" />

 </Table>
 <div className='bg-black text-white p-2'>
<p>THE VEHICLE WAS FULLY INSPECTED, ENGINE AND BODY TEST DRIVEN AND CONFIRMED BEFORE PAYMENT WITH THE BUYER.
 ALL THE RELEVANT DOCUMENT OF THE VEHICLE HAVE BEEN HANDED OVER TO THE BUYER VEHICLE IS SOLD”AS IT IS”
</p></div>
<div className='justify-between p-2 flex sm:text-lg text-xs'>
<div className='flex flex-col'>
<p className='uppercase font-semibold mb-2'>Management signature</p>
<SignatureCanvas
  ref={signatureRef2}
  onEnd={() => setSignatureData(signatureRef.current.toDataURL())}
  canvasProps={{ width: 150, height: 50, style: { backgroundColor: 'lightgray', border: '1px solid black' } }}
/>
<p className=''>_______________</p>
    </div>

    <div className='flex flex-col'>
<p className='uppercase font-semibold mb-2'>Customer signature</p>
<SignatureCanvas
  ref={signatureRef}
  onEnd={() => setSignatureData2(signatureRef2.current.toDataURL())}
  canvasProps={{ width: 150, height: 50, style: { backgroundColor: 'lightgray', border: '1px solid black' } }}
/>
<p className=''>_______________</p>
    </div>

</div>


</div>
<button onClick={clearSignature}>Clear customer Signature</button> <br />
<button onClick={clearSignature2}>Clear Management Signature</button>
<button onClick={handleScreenshot}>
<DownloadOutlined className="m-2" />
    Download receipt</button>
    <br />
   <div>
    <QRCode

      bgColor="#FFFFFF"
      fgColor="#000000"
      level="Q"
      style={{ width: 100 }}
      value={`https://abujacar.com`}
    />
    </div>
    </div>
  );
}

export default Receipt;
