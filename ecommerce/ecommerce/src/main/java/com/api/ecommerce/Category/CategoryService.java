package com.api.ecommerce.Category;

import com.api.ecommerce.Common.PageResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.parameters.P;

import java.util.List;

public interface CategoryService {
    Category AddCategory(Category category);
    Category updateCategory(Long id,Category category);
    String deleteCategory(Long id);
    Category getCategoryById(Long id);
    PageResponse<Category> getCategories(Pageable pageable);
    PageResponse<Category> searchCategories( String name ,Pageable pageable);
    List<Category>getAllCategories();
}
