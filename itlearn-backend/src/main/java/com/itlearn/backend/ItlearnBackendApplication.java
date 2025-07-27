package com.itlearn.backend;

import com.itlearn.backend.models.User;
import com.itlearn.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class ItlearnBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ItlearnBackendApplication.class, args);
	}
}
