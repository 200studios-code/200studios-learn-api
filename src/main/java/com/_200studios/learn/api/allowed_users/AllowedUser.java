package com._200studios.learn.api.allowed_users;

import com._200studios.learn.shared.types.GlobalRole;
import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "allowed_users")
public class AllowedUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    @Enumerated(EnumType.STRING)
    private GlobalRole globalRole;

    private Instant createdAt;
}