import { useState, useEffect } from 'react';

export function usePasswordStrength(password) {
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    const calculateStrength = (pwd) => {
      let score = 0;
      if (pwd.length > 6) score++;
      if (pwd.length > 10) score++;
      if (/[A-Z]/.test(pwd)) score++;
      if (/[a-z]/.test(pwd)) score++;
      if (/[0-9]/.test(pwd)) score++;
      if (/[^A-Za-z0-9]/.test(pwd)) score++;
      return score;
    };

    setStrength(calculateStrength(password));
  }, [password]);

  return strength;
}


