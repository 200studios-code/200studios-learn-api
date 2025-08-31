package com._200studios.learn.api.allowed_users;

import com._200studios.learn.shared.types.GlobalRole;
import com.fasterxml.jackson.annotation.JsonGetter;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Entity
@Data
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