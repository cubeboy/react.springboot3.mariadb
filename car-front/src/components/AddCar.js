import React, { useState } from 'react';
import { Button, Stack, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

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
        <DialogTitle>New Car</DialogTitle>
        <DialogContent>
          <input placeholder="Brand" name="brand" value={car.brand} onChange={handleChange} />
          <input placeholder="Model" name="model" value={car.model} onChange={handleChange} />
          <input placeholder="Color" name="color" value={car.color} onChange={handleChange} />
          <input placeholder="Year" name="year" value={car.year} onChange={handleChange} />
          <input placeholder="Price" name="price" value={car.price} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}