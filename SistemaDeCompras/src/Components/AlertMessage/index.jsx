import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Box from '@mui/material/Box';

const AlertMessage = ({ severidade, titulo, mensagem, aoFechar }) => {
  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <Alert severity={severidade} onClose={aoFechar}>
        {titulo && <AlertTitle>{titulo}</AlertTitle>}
        {mensagem}
      </Alert>
    </Box>
  );
};

export default AlertMessage;