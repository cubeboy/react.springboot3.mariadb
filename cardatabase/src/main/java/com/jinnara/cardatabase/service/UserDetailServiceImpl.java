package com.jinnara.cardatabase.service;

import com.jinnara.cardatabase.domain.UserInfo;
import com.jinnara.cardatabase.domain.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailServiceImpl implements UserDetailsService {
  private final UserRepository userRepository;

  public UserDetailServiceImpl(UserRepository userRepository) {
    this.userRepository = userRepository;
  }

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Optional<UserInfo> user = userRepository.findByUsername(username);
    User.UserBuilder builder = null;
    if(user.isPresent()) {
      UserInfo currentUser = user.get();
      builder = User.withUsername(currentUser.getUsername());
      builder.password(currentUser.getPassword());
      builder.roles(currentUser.getRole());
    } else {
      throw new UsernameNotFoundException("User not found.");
    }
    return builder.build();
  }
}
