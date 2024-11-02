import React, { useState } from 'react';

const TimeDropdown = () => {
  const [selectedTime, setSelectedTime] = useState('');

  // 시간 옵션을 24시간 형식으로 생성
  const generateTimeOptions = () => {
    const times = [];
    for (let i = 0; i < 24; i++) {
      const hour = i < 10 ? `0${i}` : i;  // 한 자리 수 앞에 '0' 추가
      times.push(`${hour}:00`);           // 각 시간의 정각을 옵션으로
    }
    return times;
  };

  return (
    <div>
      <label htmlFor="timeSelect">시간 선택:</label>
      <select
        id="timeSelect"
        value={selectedTime}
        onChange={(e) => setSelectedTime(e.target.value)}
      >
        <option value="">시간 선택</option>
        {generateTimeOptions().map((time, index) => (
          <option key={index} value={time}>
            {time}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimeDropdown;