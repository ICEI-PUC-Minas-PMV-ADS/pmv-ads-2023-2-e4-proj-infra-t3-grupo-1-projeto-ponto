import { React } from "react";

export default function SelectForm({
  options,
  setSelectedOption,
  selectedOption,
  text,
}) {
  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label>{text}</label>
      <select value={selectedOption} onChange={handleChange}>
        {options.map((option, index) => (
          <option key={index} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
}
