import React from "react";
import "./select.css";

type Props = {
  label: string;
  items: string[];
  value: string;
  required: true;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Select = ({ label, items, value, required, onChange }: Props) => {
  return (
    <div className="selectContainer">
      <label>{label}:</label>
      <select value={value} onChange={(e) => onChange(e)} required={required}>
        <option>Select One</option>
        {items.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
