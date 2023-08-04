import React, { useState } from 'react';
import { TextField, Button, Stack, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export default function AddCar(props) {
  const [open, setOpen]  = useState(false);
  const [car, setCar] = useState({
    brand: '',
    model: '',
    color: '',
    year: '',
    price: ''
  });

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleChange = (event) => {
    setCar({...car, [event.target.name]: event.target.value });
  }

  const handleSave = () => {
    props.addCar(car);
    handleClose();
  }

  return (
    <div>
      <Stack mt={2} mb={2}><Button onClick={handleOpen} variant="contained">New Car</Button></Stack>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New car</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={2}>
            <TextField autoFocus placeholder="Brand" variant="standard" name="brand" value={car.brand} onChange={handleChange} />
            <TextField placeholder="Model" variant="standard" name="model" value={car.model} onChange={handleChange} />
            <TextField placeholder="Color" variant="standard" name="color" value={car.color} onChange={handleChange} />
            <TextField placeholder="Year" variant="standard" name="year" value={car.year} onChange={handleChange} />
            <TextField placeholder="Price" variant="standard" name="price" value={car.price} onChange={handleChange} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}