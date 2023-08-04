import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

export default function EditCar(props) {
  const [open, setOpen]  = useState(false);
  const [car, setCar] = useState({
    id: 0,
    brand: '',
    model: '',
    color: '',
    year: '',
    price: ''
  });

  const handleOpen = () => {
    console.log('Car info -> ', props)
    setCar({
      id: props.data.row.id,
      brand: props.data.row.brand,
      model: props.data.row.model,
      color: props.data.row.color,
      year: props.data.row.year,
      price: props.data.row.price
    });
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleChange = (event) => {
    setCar({...car, [event.target.name]: event.target.value });
  }

  const handleSave = () => {
    props.updateCar(car);
    handleClose();
  }

  return (
    <div>
      <button onClick={handleOpen}>Edit</button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Car</DialogTitle>
        <DialogContent>
          <input placeholder="Brand" name="brand" value={car.brand} onChange={handleChange} />
          <input placeholder="Model" name="model" value={car.model} onChange={handleChange} />
          <input placeholder="Color" name="color" value={car.color} onChange={handleChange} />
          <input placeholder="Year" name="year" value={car.year} onChange={handleChange} />
          <input placeholder="Price" name="price" value={car.price} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </DialogActions>
      </Dialog>
    </div>
  );
}