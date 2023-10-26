import React from "react";

import styles from './index.module.css'

export default function ButtonSubmitForm({ textButton }) {
  return <button data-cy="submit" className={styles.buttonBox} type="submit">{textButton}</button>;
}

