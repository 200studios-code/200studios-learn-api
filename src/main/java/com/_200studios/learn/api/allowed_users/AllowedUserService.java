package com._200studios.learn.api.allowed_users;

import com._200studios.learn.api.allowed_users.dto.AllowedUserCreateDto;
import com._200studios.learn.shared.types.GlobalRole;
import org.springframework.stereotype.Component;

@Component
public class AllowedUserService {
    private final AllowedUserRepository allowedUserRepository;

    public AllowedUserService(AllowedUserRepository allowedUserRepository) {
        this.allowedUserRepository = allowedUserRepository;
    }

    public AllowedUser create(AllowedUserCreateDto dto) {
        AllowedUser user = new AllowedUser();
        user.setEmail(dto.getEmail());
        user.setGlobalRole(GlobalRole.STUDENT);

        return allowedUserRepository.save(user);
    }
}
