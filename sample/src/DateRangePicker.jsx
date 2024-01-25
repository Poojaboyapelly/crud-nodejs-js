import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateRangePickerProps {
  //props
}

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [textFieldValue, setTextFieldValue] = useState('');

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
    setEndDate(date ? new Date(date.getTime() + 90 * 24 * 60 * 60 * 1000) : null);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextFieldValue(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={textFieldValue}
        onChange={handleTextFieldChange}
        placeholder="Enter text here"
      />
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        startDate={startDate}
        endDate={endDate}
        selectsStart
        startDateId="startDate"
        maxDate={startDate ? new Date(startDate.getTime() + 90 * 24 * 60 * 60 * 1000) : null}
      />
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        startDate={startDate}
        endDate={endDate}
        selectsEnd
        endDateId="endDate"
      />
    </div>
  );
};

export default DateRangePicker;









import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateRangePickerProps {}

const DateRangePicker: React.FC<DateRangePickerProps> = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    // Add more options as needed
  ];

  return (
    <div>
      <select value={selectedOption} onChange={handleDropdownChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <DatePicker
        selected={startDate}
        onChange={handleStartDateChange}
        startDate={startDate}
        endDate={endDate}
        selectsStart
        startDateId="startDate"
      />
      <DatePicker
        selected={endDate}
        onChange={handleEndDateChange}
        startDate={startDate}
        endDate={endDate}
        selectsEnd
        endDateId="endDate"
      />
    </div>
  );
};

export default DateRangePicker;
