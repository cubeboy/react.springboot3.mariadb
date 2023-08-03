package com.jinnara.cardatabase.web;

import com.jinnara.cardatabase.domain.AccountCredentials;
import com.jinnara.cardatabase.service.JwtService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {
  private final JwtService jwtService;
  private final AuthenticationManager authManager;

  public LoginController(JwtService jwtService, AuthenticationManager authManager) {
    this.jwtService = jwtService;
    this.authManager = authManager;
  }

  @PostMapping(value="/login")
  public ResponseEntity<?> getToken(@RequestBody AccountCredentials credentials) {
    UsernamePasswordAuthenticationToken creds = new UsernamePasswordAuthenticationToken(
        credentials.getUsername(),
        credentials.getPassword()
    );
    Authentication auth = authManager.authenticate(creds);
    String jwts = jwtService.getToken(auth.getName());
    return ResponseEntity.ok()
        .header(HttpHeaders.AUTHORIZATION, "Bearer " + jwts)
        .header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, "Authorization")
        .build();
  }
}
