package com.api.ecommerce.Category;

import com.api.ecommerce.Common.PageResponse;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ImplCategoryService implements CategoryService{
    private CategoryRepo categoryRepo;
    @Override
    public Category AddCategory(Category category) {
        return categoryRepo.save(category);
    }

    @Override
    public Category updateCategory(Long id, Category category) {
        category.setId(id);
        return categoryRepo.save(category);
    }

    @Override
    public String deleteCategory(Long id) {
        try{
            getCategoryById(id);
            categoryRepo.deleteById(id);
            return "Category deleted";
        }catch (Exception e){
         return e.getMessage();
        }
    }

    @Override
    public Category getCategoryById(Long id) {
        return categoryRepo.findById(id).orElseThrow(()->new RuntimeException("Category not found"));
    }

    @Override
    public PageResponse<Category> getCategories(Pageable pageable) {
        Page<Category>categoryPage= categoryRepo.findAll(pageable);
        PageResponse<Category>response=new PageResponse<>(
                categoryPage.getContent(),
                categoryPage.getNumber(),
                categoryPage.getSize(),
                categoryPage.getTotalElements(),
                categoryPage.getTotalPages(),
                categoryPage.isFirst(),
                categoryPage.isLast()
        );
        return response ;
    }

    @Override
    public PageResponse<Category> searchCategories(String name, Pageable pageable) {
        Page<Category>categoryPage= categoryRepo.findByNameContainingIgnoreCase(name,pageable);
        PageResponse<Category>response=new PageResponse<>(
                categoryPage.getContent(),
                categoryPage.getNumber(),
                categoryPage.getSize(),
                categoryPage.getTotalElements(),
                categoryPage.getTotalPages(),
                categoryPage.isFirst(),
                categoryPage.isLast()
        );
        return response ;
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }
}
