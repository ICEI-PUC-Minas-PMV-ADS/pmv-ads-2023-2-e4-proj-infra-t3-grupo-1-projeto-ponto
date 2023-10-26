import { React } from "react";

import styles from "./index.module.css";

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
    <div className={styles.selectEdit}>
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
