import React from 'react';
import styles from './Header.module.css';
import { IoLogOutOutline } from "react-icons/io5";
import logo from '../../assets/images/MoneyGuardLogo.png';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/operations';
import {selectUser} from "../../redux/auth/selectors"
import toast from 'react-hot-toast';

const Header = () => {
  const dispatch = useDispatch();
  const {username} = useSelector(selectUser); 

  const handleClick = async() => {
    const response = await dispatch(logout()); 
    if(response.meta.requestStatus === 'fulfilled'){
      toast.success('Logout successful');
    }
    else{
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <header className={styles.Header}>
      <div className={styles.HeaderLogo}>
        <img src={logo} alt="Logo" className={styles.HeaderImage} />
      </div>
      <div className={styles.HeaderUserSection}>
        <span className={styles.HeaderUserName}>{username || 'Name'}</span> {/* Kullanıcı adı yoksa 'Name' göster */}
        
        {/* Düz çizgi */}
        <div className={styles.HeaderDivider}></div>
        
        <IoLogOutOutline
          className={styles.HeaderExitIcon}
          onClick={handleClick}
          style={{ cursor: 'pointer', fontSize: '1.5rem' }} // İkon tıklanabilir ve görsel olarak belirgin olsun
          title="Exit" // Tooltip için
        />
        <button className={styles.HeaderExitButton} onClick={handleClick}>
          Exit
        </button>
      </div>
    </header>
  );
};

export default Header;
