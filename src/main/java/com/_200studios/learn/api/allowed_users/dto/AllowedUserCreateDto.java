package com._200studios.learn.api.allowed_users.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AllowedUserCreateDto {
    @Email()
    @NotBlank
    private String email;
}
