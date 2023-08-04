package com.jinnara.cardatabase.web;

import com.jinnara.cardatabase.domain.Car;
import com.jinnara.cardatabase.domain.CarRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class CarController {
  private final CarRepository carRepository;
  public CarController(CarRepository carRepository) {
    this.carRepository = carRepository;
  }

  @GetMapping("/cars")
  public Iterable<Car> getCars() {
    return carRepository.findAll();
  }

  @PostMapping("/cars")
  public ResponseEntity<Car> addCar(@RequestBody Car car) {
    Car addedCar = carRepository.save(car);
    return ResponseEntity.ok(addedCar);
  }

  @DeleteMapping("/cars/{id}")
  public ResponseEntity<?> deleteCar(@PathVariable Long id) {
    carRepository.deleteById(id);
    return ResponseEntity.ok().build();
  }

  @PutMapping("/cars")
  public ResponseEntity<Car> updateCar(@RequestBody Car car) {
    Car addedCar = carRepository.save(car);
    return ResponseEntity.ok(addedCar);
  }
}
