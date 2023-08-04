package com.jinnara.cardatabase.web;

import com.jinnara.cardatabase.config.SecurityConfig;
import com.jinnara.cardatabase.service.UserDetailServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.userdetails.User;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class LoginControllerTests {
  @Autowired
  private MockMvc mockMvc;

  @MockBean
  private UserDetailServiceImpl userService;

  @Test
  public void testAuthentication() throws Exception {
    User.UserBuilder builder = User.withUsername("cubeboy");
    builder.password("cubeboy123");
    builder.roles("USER");
    when(userService.loadUserByUsername("cubeboy")).thenReturn(builder.build());
    this.mockMvc
        .perform(
            post("/login")
                .content("{\n" +
                    "    \"username\": \"cubeboy\",\n" +
                    "    \"password\": \"cubeboy123\"\n" +
                    "}")
                .header(HttpHeaders.CONTENT_TYPE, "application/json")
        ).andDo(print()).andExpect(status().isOk());
  }
}
