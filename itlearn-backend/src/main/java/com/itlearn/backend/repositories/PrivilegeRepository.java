package com.itlearn.backend.repositories;

import com.itlearn.backend.models.Privilege;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PrivilegeRepository extends JpaRepository<Privilege,Long> {
    Privilege findByName(String name);
}
