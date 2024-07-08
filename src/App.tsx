import React, { FormEvent, useState } from 'react';
import { Box, Button, Container, TextField, Typography } from '@mui/material';

export const App = () => {
  const [formText, setFormText] = useState('');
  const [inputValue, setInputValue] = useState('');
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormText(inputValue);
    setInputValue('');
  };

  return (
    <Container style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box style={{ display: 'flex', flexDirection: 'column', rowGap: '15px' }}>
        {formText && <Typography style={{ textAlign: 'center' }}>{formText}$</Typography>}
        <Box
          style={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}
          onSubmit={handleSubmit}
          component='form'>
          <TextField
            type='number'
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            label='Price'
            variant='filled'
          />
          <Button type='submit' variant='outlined'>
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
