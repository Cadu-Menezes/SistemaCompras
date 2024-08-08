import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const LembrarMeCheck = ({ rememberMe, setRememberMe }) => {
  const handleChange = (event) => {
    setRememberMe(event.target.checked);
  };

  return (
    <FormControlLabel
      control={<Checkbox checked={rememberMe} onChange={handleChange} />}
      label="Lembrar-me"
    />
  );
};

export default LembrarMeCheck;