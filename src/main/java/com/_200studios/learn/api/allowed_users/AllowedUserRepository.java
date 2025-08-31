package com._200studios.learn.api.allowed_users;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AllowedUserRepository extends JpaRepository<AllowedUser, Long> {
    Optional<AllowedUser> findByEmail(String email);
}
