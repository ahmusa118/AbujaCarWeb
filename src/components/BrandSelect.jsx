import React, { useState } from 'react';
import { Select, Input } from 'antd';

const { Option, OptGroup } = Select;

const BrandSelect = ({ brands, setMake }) => {
  const [filter, setFilter] = useState('');
  const [isCustomSelected, setIsCustomSelected] = useState(false);
  const [customBrand, setCustomBrand] = useState('');

  const handleFilterChange = (value) => {
    setFilter(value.toLowerCase());
  };

  const handleSelectChange = (value) => {
    if (value === 'other') {
      setIsCustomSelected(true);
      setMake(''); // Clear the make when selecting "Other"
    } else {
      setIsCustomSelected(false);
      setCustomBrand(''); // Clear the custom brand when selecting predefined options
      setMake(value);
    }
  };

  const handleCustomBrandChange = (e) => {
    const value = e.target.value;
    setCustomBrand(value);
    setMake(value);
  };

  const filteredBrands = Object.keys(brands).reduce((result, category) => {
    const filteredOptions = brands[category].filter(brand =>
      brand.toLowerCase().includes(filter)
    );
    if (filteredOptions.length > 0) {
      result[category] = filteredOptions;
    }
    return result;
  }, {});

  return (
    <>
      <Select
        onChange={handleSelectChange}
        style={{ width: '100%' }}
        placeholder="Select a brand"
        showSearch
        onSearch={handleFilterChange}
        filterOption={false} // Use custom filter logic
      >
        {Object.keys(filteredBrands).map(category => (
          <OptGroup key={category} label={category}>
            {filteredBrands[category].map(brand => (
              <Option key={`${category}-${brand}`} value={brand}>
                {brand}
              </Option>
            ))}
          </OptGroup>
        ))}
        <Option key="other" value="other">Other</Option>
      </Select>

      {isCustomSelected && (
        <Input
          style={{ marginTop: 10 }}
          placeholder="Enter custom brand"
          value={customBrand}
          onChange={handleCustomBrandChange}
        />
      )}
    </>
  );
};

export default BrandSelect;
