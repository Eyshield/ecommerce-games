package com.api.ecommerce.User;

import com.api.ecommerce.Common.PageResponse;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService{
    private UserRepo userRepo;
    @Override
    public PageResponse<User> getAllUser(Pageable pageable) {
        Page<User>userPage= userRepo.findAll(pageable);
        PageResponse<User>userPageResponse=new PageResponse<>(
                userPage.getContent(),
                userPage.getNumber(),
                userPage.getSize(),
                userPage.getNumberOfElements(),
                userPage.getTotalPages(),
                userPage.isFirst(),
                userPage.isLast()
        );
        return userPageResponse;
    }

    @Override
    public User getUserById(Long id) {
        return userRepo.findById(id).orElseThrow(()->new RuntimeException("User not found"));
    }

    @Override
    public User updateUser(Long id, User user) {
        user.setId(id);
        return userRepo.save(user);
    }

    @Override
    public String deletUser(Long id) {
        try{
            getUserById(id);
            userRepo.deleteById(id);
            return "User deleted successfully";
        }catch (Exception e) {

        return e.getMessage();


        }
    }

    @Override
    public PageResponse<User> searchUser(Pageable pageable, String nom) {
        Page<User> userPage= userRepo.findByNomContainingIgnoreCase(pageable, nom);
        PageResponse<User>userPageResponse=new PageResponse<>(
                userPage.getContent(),
                userPage.getNumber(),
                userPage.getSize(),
                userPage.getNumberOfElements(),
                userPage.getTotalPages(),
                userPage.isFirst(),
                userPage.isLast()

        );
        return userPageResponse;
    }
}
