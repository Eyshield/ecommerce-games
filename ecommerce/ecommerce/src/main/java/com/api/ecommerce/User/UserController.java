package com.api.ecommerce.User;

import com.api.ecommerce.Common.PageResponse;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
public class UserController {
    private UserService userService;
    @GetMapping("/me")
    @PreAuthorize("hasAnyRole('Admin','User')")
    public User me(@AuthenticationPrincipal Jwt jwt) {
        return userService.getOrCreate(jwt);
    }
    @GetMapping("/all")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<PageResponse<User>> getAllUser( @PageableDefault(size = 10,page = 0)Pageable  pageable){
        try {
            PageResponse<User>response=userService.getAllUser(pageable);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        }}
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<User>getUserById(@PathVariable Long id){
        try {
            User response= userService.getUserById(id);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<User>updateUser(@PathVariable Long id,@RequestBody User user){
        try {
         User response= userService.updateUser(id,user);
         return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<String>deleteUser(@PathVariable Long id){
        try {
            String response= userService.deletUser(id);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/search")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<PageResponse<User>>searchUser(@PageableDefault(page = 0,size = 10)Pageable pageable, @RequestParam String nom) {
        try {
         PageResponse<User>response=userService.searchUser(pageable, nom);
         return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    }

