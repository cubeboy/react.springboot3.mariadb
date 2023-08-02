package com.jinnara.cardatabase.domain;

import jakarta.persistence.*;

@Entity
public class Car {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private String brand, model, color, registerNumber;
  private int year, price;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "owner")
  private Owner owner;

  public Car() {}

  public Long getId() {
    return id;
  }

  public String getBrand() {
    return brand;
  }

  public String getModel() {
    return model;
  }

  public String getColor() {
    return color;
  }

  public String getRegisterNumber() {
    return registerNumber;
  }

  public int getYear() {
    return year;
  }

  public int getPrice() {
    return price;
  }

  public Owner getOwner() {
    return owner;
  }

  public Car(String brand, String model, String color, String registerNumber, int year, int price, Owner owner) {
    super();
    this.brand = brand;
    this.model = model;
    this.color = color;
    this.registerNumber = registerNumber;
    this.year = year;
    this.price = price;
    this.owner = owner;
  }
}
