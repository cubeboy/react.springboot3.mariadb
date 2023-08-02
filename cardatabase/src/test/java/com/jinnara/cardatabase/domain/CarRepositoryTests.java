package com.jinnara.cardatabase.domain;

import org.junit.jupiter.api.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@DataJpaTest
public class CarRepositoryTests {
  private static final Logger log = LoggerFactory.getLogger(CarRepositoryTests.class);
  @Autowired
  CarRepository carRepository;

  @Autowired
  OwnerRepository ownerRepository;

  @Test
  public void carCreateReadTest() {
    List<Owner> owners = new ArrayList<>();
    owners.add(new Owner("John", "Johnson"));
    owners.add(new Owner("Mary", "robinson"));
    ownerRepository.saveAll(owners);

    Car [] car = {
        new Car("Ford", "Mustang", "Red", "ADF-9999", 2021, 5900, owners.get(0)),
        new Car("Nissan", "Leaf", "Blue", "SSJ-3002", 2019, 2900, owners.get(1)),
        new Car("Toyota", "Prius", "Silver", "KKO-0904", 2020, 3900, owners.get(1))
    };

    Car retCar = carRepository.save(car[0]);
    carRepository.save(car[1]);
    carRepository.save(car[2]);
    log.info("saved car id ==> {}", retCar.getId());
    assertTrue(retCar.getId() > 0);
    Car savedCar = carRepository.findById(car[0].getId()).orElseThrow();
    assertEquals(car[0].getBrand(), savedCar.getBrand());

    Iterable<Car> retCars = carRepository.findAll();
    retCars.forEach(item -> log.info("All Cars ==> {}", item.getOwner().toString()));
  }
}
