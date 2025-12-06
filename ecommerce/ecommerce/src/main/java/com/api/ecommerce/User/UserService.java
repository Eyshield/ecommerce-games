package com.api.ecommerce.User;

import com.api.ecommerce.Common.PageResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserService {
    PageResponse<User> getAllUser(Pageable pageable);
    User getUserById(Long id);
    User updateUser(Long id,User user);
    String deletUser(Long id);
    PageResponse<User>searchUser(Pageable pageable,String nom);
}
