import React from "react";

import styles from "./index.module.css";

export default function InputForm({
  value,
  changeValue,
  required,
  type,
  placeholder,
  label,
  data_cy = "",
  max=null
}) {
  const editPlaceHolder = `${placeholder}`;

  function onChange(event) {
    changeValue(event.target.value);
  }

  return (
    <div className={styles.inputBox}>
      <label>{label}</label>
      <input
        data-cy={data_cy}
        value={value}
        onChange={onChange}
        required={required}
        type={type}
        placeholder={editPlaceHolder}
        max={max}
      />
    </div>
  );
}
