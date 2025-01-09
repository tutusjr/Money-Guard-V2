import React, { useState } from 'react';
import styles from './Switcher.module.css';
import { LuPlus } from "react-icons/lu";
import { LuMinus } from "react-icons/lu";

const Switcher = ({ onClick }) => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
    if (onClick) {
      onClick(); // Dışarıdan gelen onClick fonksiyonu çağrılır
    }
  };

  return (
    <div
      className={`${styles.switcher} ${isOn ? styles.on : styles.off}`}
      onClick={toggleSwitch}
    >
      <div className={styles.circle}>
        <p className={styles.icon}>{isOn ? <LuMinus/> : <LuPlus/>}</p>
      </div>
    </div>
  );
};

export default Switcher;
