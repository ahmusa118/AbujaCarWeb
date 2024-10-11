import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

const YearPicker = ({ year, setYear }) => {
  // Convert the year string to a moment object for DatePicker value
  const yearValue = year ? moment(year, 'YYYY') : null;

  // Handle the change event to set the selected year
  const handleYearChange = (date) => {
    // Set the year in 'YYYY' format when a new year is selected
    setYear(date ? date.format('YYYY') : '');
  };

  return (
    <DatePicker
      picker="year"
      value={yearValue}
      onChange={handleYearChange}
      style={{ width: '100%' }}
      placeholder="Select year"
      format="YYYY"
      allowClear={false} // Disable clearing the selection to avoid glitches
    />
  );
};

export default YearPicker;
