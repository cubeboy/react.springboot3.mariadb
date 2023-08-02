package com.jinnara.cardatabase.domain;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Owner {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long ownerId;
  private String firstname, lastname;

  @OneToMany(cascade = CascadeType.ALL, mappedBy = "owner")
  private List<Car> cars;

  public Owner() {}

  public Owner(String firstname, String lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }

  public Long getOwnerId() {
    return ownerId;
  }

  public String getFirstname() {
    return firstname;
  }

  public String getLastname() {
    return lastname;
  }

  public List<Car> getCars() {
    return cars;
  }

  @Override
  public String toString() {
    return firstname + " " + lastname;
  }
}
