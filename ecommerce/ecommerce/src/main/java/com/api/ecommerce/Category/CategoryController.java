package com.api.ecommerce.Category;

import com.api.ecommerce.Common.PageResponse;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/category")
@RestController
@AllArgsConstructor
public class CategoryController {
    private CategoryService categoryService;
    @PostMapping
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<Category>addCategory(@RequestBody Category category){
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.AddCategory(category));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<Category>updateCategory(@PathVariable Long id,@RequestBody Category category){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(categoryService.updateCategory(id, category));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

        }}

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<String> deleteCategory(@PathVariable Long id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(categoryService.deleteCategory(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('Admin')")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(categoryService.getCategoryById(id));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @GetMapping
    public ResponseEntity<PageResponse<Category>> getCategories(@PageableDefault(page = 0,size = 10)Pageable pageable){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(categoryService.getCategories(pageable));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        }

    }
    @GetMapping("/search")
    public ResponseEntity<PageResponse<Category>> searchCategories(@PageableDefault(page = 0,size = 10)Pageable pageable,@RequestParam String name){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(categoryService.searchCategories(name, pageable));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        }

    }



    }















