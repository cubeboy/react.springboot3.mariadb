package com.jinnara.cardatabase.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.List;

@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
@Entity
public class Owner {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long ownerId;
  private String firstname, lastname;

  @JsonIgnore
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
