import { Outlet, Navigate } from 'react-router';
import { useMediaQuery } from 'react-responsive'; 
import styles from './CurrencyControl.module.css';

const CurrencyControl = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  if (!isMobile) {
    return <Navigate to="/dashboard/home" />;
  }

  return (
    <div>
      <div className={styles.isShowCurrency}>
        <Outlet />
      </div>
    </div>
  );
};

export default CurrencyControl;
