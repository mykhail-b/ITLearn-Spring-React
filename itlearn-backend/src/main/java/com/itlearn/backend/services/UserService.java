package com.itlearn.backend.services;

import com.itlearn.backend.dto.UserDto;
import com.itlearn.backend.models.Role;
import com.itlearn.backend.models.User;
import com.itlearn.backend.repositories.RoleRepository;
import com.itlearn.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public boolean emailExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public User registerNewUserAccount(UserDto accountDto) {
        if (emailExists(accountDto.getEmail())) {
            throw new IllegalArgumentException("Email already in use: " + accountDto.getEmail());
        }

        User user = new User();
        user.setUsername(accountDto.getUsername());
        user.setEmail(accountDto.getEmail());
        user.setPassword(passwordEncoder.encode(accountDto.getPassword()));
        user.setEnabled(true);
        user.setTokenExpired(false);

        Role role = roleRepository.findById(1L)
                .orElseThrow(() -> new RuntimeException("Role not found"));

        user.setRole(Collections.singleton(role));

        return userRepository.save(user);
    }

    public User loginUserAccount(UserDto accountDto) {
        User user = userRepository.findByEmail(accountDto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!passwordEncoder.matches(accountDto.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        if (!user.isEnabled()) {
            throw new IllegalStateException("User account is disabled");
        }

        return user;
    }
}
