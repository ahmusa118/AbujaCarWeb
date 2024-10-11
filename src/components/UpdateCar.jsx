import { Card, message, Button, Image, Input, Select } from 'antd';
import React, { useEffect, useState } from 'react';

const UpdateCar = ({ email }) => {
  const [info, setInfo] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [editingCarId, setEditingCarId] = useState(null);
  const [editableCar, setEditableCar] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
const [category,setCategory]=useState('')
  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await fetch(`https://abujacar.org/api/getcartoedit/${email}`, { method: 'POST' });
      if (data.ok) {
        const response = await data.json();
        setInfo(response);
      } else {
        message.error('Error');
      }
    } catch (error) {
      message.error('Internal Server Error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (car) => {
    setEditingCarId(car._id);
    setEditableCar({ ...car });
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`https://abujacar.org/api/updatecarinfo/${editingCarId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editableCar),
      });
      if (response.ok) {
        message.success('Car updated successfully');
        setEditingCarId(null);
        setEditableCar(null);
        setCount(count + 1);
      } else {
        message.error('Failed to update car');
      }
    } catch (error) {
      message.error('Internal server error');
    }
  };

  const handleDelete = async (key) => {
    try {
      const data = await fetch(`https://abujacar.org/api/deletemycar/${key}`, { method: 'DELETE' });
      if (data.ok) {
        const response = await data.json();
        message.success(response.message);
        setCount(count + 1);
      }
    } catch (error) {
      message.error('Internal server error');
    }
  };
  const handleLocationChange = (value) => {
    setEditableCar((prev) => ({ ...prev, location: value }));
  };
  const handleUsedChange = (value) => {
    setEditableCar((prev) => ({ ...prev, used: value }));
  };
  const handleCategoryChange = (value) => {
    setEditableCar((prev) => ({ ...prev, category: value }));
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableCar((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async (key) => {
    try {
      const data = await fetch(`https://abujacar.org/api/editmycar/${key}`, { method: 'PUT' });
      if (data.ok) {
        const response = await data.json();
        message.success(response.ok);
      } else {
        message.error('Not found');
      }
    } catch (error) {
      message.error('Internal server error');
    }
    setCount(count + 1);
  };

  const shouldidsell = (itemId) => {
    const shouldsell = window.confirm(`Are you sure It is sold? ${itemId}?`);
    if (shouldsell) {
      handleClick(itemId); // Call function a with the item ID
    } else {
      console.log('User pressed No.');
    }
  };

  const shouldidelete = (itemId) => {
    const shouldDelete = window.confirm(`Are you sure you want to delete item with ID ${itemId}?`);
    if (shouldDelete) {
      handleDelete(itemId); // Call function a with the item ID
    } else {
      console.log('User pressed No.');
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  useEffect(() => {
    fetchData();
  }, [count]);
  const { Option } = Select;
const usage=['Brand New','Foreign Used', 'Nigerian Used']
const categories=['Sedan','Suv','Bus','Pick-up Truck','Motorcycle','Hatchback','Coupe','Station Wagon','Minivan','Hybrid']
  const statesOfNigeria = [
    "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
    "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu",
    "Federal Capital Territory", "Gombe", "Imo", "Jigawa", "Kaduna", "Kano",
    "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger",
    "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba",
    "Yobe", "Zamfara"
  ];
  const filteredCars = info.filter((car) => {
    return (
      car.make.toLowerCase().includes(searchQuery) ||
      car.model.toLowerCase().includes(searchQuery) ||
      car.year.toString().includes(searchQuery) ||
      car.price.toString().includes(searchQuery) ||
      car.mileage.toString().includes(searchQuery) ||
      car.color.toLowerCase().includes(searchQuery) ||
      car.transmission.toLowerCase().includes(searchQuery) ||
      car.requestno.toLowerCase().includes(searchQuery) ||
      car.carLocation.toLowerCase().includes(searchQuery)
    );
  });

  return (
    <div>
      <Input
        placeholder='Search cars by ID, model, etc...'
        value={searchQuery}
        onChange={handleSearch}
        style={{ marginBottom: '20px' }}
      />
      <div className='grid sm:grid-cols-3 m-2 gap-2'>
        {filteredCars.map((car) => (
          <Card key={car._id} loading={loading} className='font-roboto shadow'>
            <Image src={`https://abujacar.org/api/indcar/${car.images[0]}`} alt='' />
            {editingCarId === car._id ? (
              <div>
                  
                Make: <Input name='make' value={editableCar.make} onChange={handleChange} />
                Model: <Input name='model' value={editableCar.model} onChange={handleChange} />
                Year: <Input name='year' value={editableCar.year} onChange={handleChange} />
                Price: <Input name='price' value={editableCar.price} onChange={handleChange} />
                Location: <Input name='carLocation' value={editableCar.carLocation} onChange={handleChange} />
                Mileage: <Input name='mileage' value={editableCar.mileage} onChange={handleChange} />
                Exterior color: <Input name='color' value={editableCar.color} onChange={handleChange} />
                Category: <Select
                  value={editableCar.category}
                  onChange={handleCategoryChange}
                  style={{ width: '100%' }}
                >
                  {categories.map((use) => (
                    <Option key={use} value={use}>{use}</Option>
                  ))}
                </Select>
                Usage:   <Select
                  value={editableCar.used}
                  onChange={handleUsedChange}
                  style={{ width: '100%' }}
                >
                  {usage.map((use) => (
                    <Option key={use} value={use}>{use}</Option>
                  ))}
                </Select>
                Address: <Input name='address' value={editableCar.address} onChange={handleChange} />

                State: 
                <Select
                  value={editableCar.location}
                  onChange={handleLocationChange}
                  style={{ width: '100%' }}
                >
                  {statesOfNigeria.map((state) => (
                    <Option key={state} value={state}>{state}</Option>
                  ))}
                </Select>
              
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={() => setEditingCarId(null)}>Cancel</Button>
              </div>
            ) : (
              <div>
                <p className='flex flex-row'><span className='font-semibold mr-1'>Car ID:</span> {car.requestno}</p>
                <p className='flex flex-row '><span className='mr-1 font-semibold'>Make: </span>{car.make}</p>
                <p className='flex flex-row '><span className='font-semibold mr-1'>Model:</span>{car.model}</p>
                <p className='flex flex-row '><span className='font-semibold mr-1'>Year:</span>{car.year}</p>
                <p className='text-[#808080] font-thin'>Posted: {new Date(car.timestamp).toUTCString()}</p>
                <p className='flex flex-row'><span className='font-semibold mr-1'>Status:</span> {car.state}</p>
                <p className='flex flex-row'><span className='font-semibold mr-1'>Price:</span> {car.price}</p>
                <p className='flex flex-row'><span className='font-semibold mr-1'>Car Mileage:</span> {car.mileage}</p>
                <p className='flex flex-row'><span className='font-semibold mr-1'>Car location:</span> {car.carLocation}</p>
                <p className='flex flex-row'><span className='font-semibold mr-1'>Category:</span> {car.category}</p>
                <p className='flex flex-row'><span className='font-semibold mr-1'>Exterior color:</span> {car.color}</p>
                <p className='flex flex-row'><span className='font-semibold mr-1'>Car transmission:</span> {car.transmission}</p>
                <p className='flex flex-row'><span className='font-semibold mr-1'>Usage:</span> {car.used}</p>
                <p className='flex flex-row'><span className='font-semibold mr-1'>Car Address:</span> {car.address}</p>
                
                {car.state === 'Pending' ? (
                    
                  <div >
                    <Button onClick={() => handleEdit(car)}>Edit</Button>
                    <div className='flex flex-row gap-1 mt-2'>
                    <Button onClick={() => shouldidsell(car._id)}>Mark as Sold</Button>
                    <Button onClick={() => shouldidelete(car._id)} className='bg-[#ff0000] text-white'>Delete</Button>
                    </div>
                  </div>
                ) : (
                  <Button disabled className='cursor-pointer'> Sold</Button>
                )}
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UpdateCar;
