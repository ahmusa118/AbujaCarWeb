import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Select, message, Input, Button } from 'antd';
import './Uploadcar.css';

const { Option } = Select;

const Carreceipt = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [amountInWords, setAmountInWords] = useState('');
  const [state, setState] = useState('');
  const [price, setPrice] = useState('');
  const [address, setAddress] = useState('');
  const [vin, setVin] = useState('');
  const [img, setImg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currencyType, setCurrencyType] = useState('');
  const [model, setModel] = useState('');
  const [transmission, setTransmission] = useState('');
  const [color, setColor] = useState('');
  const [year, setYear] = useState('');
  const [id, setId] = useState(null);
  const [carLocation, setCarLocation] = useState('');
  const [make, setMake] = useState('');
  const [orderType, setOrderType] = useState('');
  const [balance, setBalance] = useState('');
  const [carvalue, setCarValue] = useState('');
  const [showSwapInputs, setShowSwapInputs] = useState(false);

  const handleId = (e) => {
    const file = e.target.files[0];
    setId(file);
  };

  const handleOrderTypeChange = (value) => {
    setOrderType(value);
    if (value === 'Swap') {
      setShowSwapInputs(true);
    } else {
      setShowSwapInputs(false);
      setBalance('');
      setCarValue('');
    }
  };

  const handleUpload = async () => {
    try {
      if (!make || !category || !currencyType || !model || !amountInWords || !price || !year || !vin || !color || !orderType) {
        message.error('Please fill in all fields');
        return;
      }

      const randomNumber = Math.floor(Math.random() * 1000) + 1;
      const randomLetters = String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
        String.fromCharCode(65 + Math.floor(Math.random() * 26)) +
        String.fromCharCode(65 + Math.floor(Math.random() * 26));
      const receiptNo = randomLetters + randomNumber.toString();

      const dataToSend = {
        email,
        phone,
        fullName: name,
        location: carLocation,
        state,
        address,
        price,
        make,
        category,
        year,
        vin,
        color,
        orderType,
        receiptNo,
        amountInWords,
        model,
        carvalue,
        balance,
        currencyType,
        charge: price,
        ...(showSwapInputs ? { balance, carvalue } : {}),
      };

      const formData = new FormData();
      formData.append('utilityBillImage', id);
     
      setImg(true);
      await fetch(`https://abujacar.org/api/upload-id/${email}`, {
        method: 'POST',
        body: formData,
      });

      setImg(false);
      setLoading(true);

      const response = await fetch('https://abujacar.org/api/carreceiptcharge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();
      console.log(data);

      if (data.success) {
        window.open(`https://abujacar.com/carreceiptimg?id=${email}&currencyType=${currencyType}&name=${name}&phone=${phone}&amountInWords=${amountInWords}&location=${carLocation}&state=${state}&address=${address}&price=${price}&make=${make}&category=${category}&model=${model}&year=${year}&vin=${vin}&color=${color}&orderType=${orderType}&charge=${price}&receiptNo=${receiptNo}&carvalue=${carvalue}&balance=${balance}`,"_blank");
      } else {
        setLoading(false);
        message.error(data.error);
      }

    } catch (error) {
      setLoading(false);
      message.error('Image too big or network connection')
      console.error('Error uploading car:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>loading...</div>;
  if (img) return <div>image uploading...</div>;

  return (
    <div className='upload-car-form'>
      <div className=''>
        <label>Name: </label>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} />

        <label>Email: </label>
        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />

        <label>Address: </label>
        <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} />

        <label>Phone Number: </label>
        <input type='text' value={phone} onChange={(e) => setPhone(e.target.value)} />

        <label>Make: </label>
        <input type='text' value={make} onChange={(e) => setMake(e.target.value)} />

        <label>Year: </label>
        <input type='number' value={year} onChange={(e) => setYear(e.target.value)} />

        <label>Category: </label>
        <Select style={{ width: '100%' }} placeholder='Select Category' onChange={(value) => setCategory(value)}>
          <Option value='Sedan'>Sedan</Option>
          <Option value='SUV'>SUV</Option>
        </Select>

        <label>Amount In Words: </label>
        <input type='text' value={amountInWords} onChange={(e) => setAmountInWords(e.target.value)} />

        <label>Currency Type: </label>
        <input type='text' value={currencyType} onChange={(e) => setCurrencyType(e.target.value)} />

        <label>Price (Naira): </label>
        <input type='number' value={price} onChange={(e) => setPrice(e.target.value)} />

        <label>Model: </label>
        <input type='text' value={model} onChange={(e) => setModel(e.target.value)} />

        <label>Vin: </label>
        <input type='text' value={vin} onChange={(e) => setVin(e.target.value)} />

        <label>Order Type: </label>
        <Select style={{ width: '100%' }} placeholder='Select Order Type' onChange={handleOrderTypeChange}>
          <Option value='Swap'>Swap</Option>
          <Option value='Other'>Other</Option>
        </Select>

        {showSwapInputs ? (
          <>
            <label>Balance: </label>
            <input type='number' value={balance} onChange={(e) => setBalance(e.target.value)} />

            <label>Car Value: </label>
            <input type='number' value={carvalue} onChange={(e) => setCarValue(e.target.value)} />
          </>
        ) : (
          <>
            <label>Order Type Description: </label>
            <input type='text' value={orderType} onChange={(e) => setOrderType(e.target.value)} />
          </>
        )}

        <label>State: </label>
        <input type='text' value={state} onChange={(e) => setState(e.target.value)} />

        <label>Transmission: </label>
        <Select style={{ width: '100%' }} placeholder='Select Transmission' onChange={(value) => setTransmission(value)}>
          <Option value='Manual'>Manual</Option>
          <Option value='Automatic'>Automatic</Option>
          <Option value='Semi-Automatic'>Semi-Automatic</Option>
        </Select>

        <label className='mt-2'>Color: </label>
        <input type='text' value={color} onChange={(e) => setColor(e.target.value)} />

        <label>Car Location: </label>
        <input type='text' value={carLocation} onChange={(e) => setCarLocation(e.target.value)} />

        <div>
          <label htmlFor="utilityBillImageUpload">Upload ID (JPG or PNG):</label>
          <input type="file" id="utilityBillImageUpload" accept=".jpg, .jpeg, .png" onChange={handleId} />
        </div>

        <Button type="primary" onClick={handleUpload}>Upload Car</Button>
      </div>
    </div>
  );
};

export default Carreceipt;
