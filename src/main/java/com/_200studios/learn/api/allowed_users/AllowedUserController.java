package com._200studios.learn.api.allowed_users;

import com._200studios.learn.api.allowed_users.dto.AllowedUserCreateDto;
import com._200studios.learn.shared.utils.api.ApiResponse;
import com._200studios.learn.shared.utils.api.ResponseBuilder;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/allowed-users")
public class AllowedUserController {
    private final AllowedUserService allowedUserService;
    private final AllowedUserRepository allowedUserRepository;

    @Value("${app.allowed-user-secret}")
    private String allowedUserSecret;

    public AllowedUserController(AllowedUserService allowedUserService, AllowedUserRepository allowedUserRepository) {
        this.allowedUserService = allowedUserService;
        this.allowedUserRepository = allowedUserRepository;
    }

    @GetMapping()
    public ResponseEntity<ApiResponse<AllowedUser>> allowedUser(@RequestParam String email) {
        Optional<AllowedUser> user = allowedUserRepository.findByEmail(email);

        return user
                .map(allowedUser -> ResponseBuilder.success(allowedUser, "User found"))
                .orElseGet(() -> ResponseBuilder.error("User not found", HttpStatus.NOT_FOUND));
    }

    @PostMapping("/create")
    public ResponseEntity<ApiResponse<AllowedUser>> createAllowedUser(
            @RequestHeader("X-Secret-Key") String secret,
            @Valid @RequestBody AllowedUserCreateDto dto
            ) {
        if (!allowedUserSecret.equals(secret)) {
            return ResponseBuilder.error("Unauthorized", HttpStatus.UNAUTHORIZED);
        }

        AllowedUser createdUser = allowedUserService.create(dto);

        return ResponseBuilder.success(createdUser, "Allowed user created");
    }
}
