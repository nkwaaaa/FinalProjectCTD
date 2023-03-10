package com.example.piBack.Controller;

import com.example.piBack.Exceptions.EntityNotFoundException;
import com.example.piBack.Model.Category;
import com.example.piBack.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping
    public ResponseEntity<Object> addCategory(@RequestBody Category category) {
        try {
            Category newCategory = categoryService.addCategory(category);
            return new ResponseEntity<>("Category ID: " + newCategory.getId() + " created", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>("Server error", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<Collection<Category>> listCategory() {
        return ResponseEntity.ok(categoryService.listCategory());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> findCategory(@PathVariable Long id) throws EntityNotFoundException {
        if (categoryService.findCategory(id).isPresent()) {
            return ResponseEntity.ok(categoryService.findCategory(id).get());
        } else {
            return new ResponseEntity("Category with id " + id + " not found", HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> editCategory(@PathVariable("id") long id, @RequestBody Category category) throws EntityNotFoundException {
        Optional<Category> category_ = categoryService.findCategory(id);

        if (category_.isPresent()) {
            category.setId(category_.get().getId());
            return new ResponseEntity<>(categoryService.editCategory(category), HttpStatus.OK);
        } else {
            return new ResponseEntity("Category with id " + id + " not found", HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteCategory(@PathVariable Long id) {
        try {
            categoryService.deleteCategory(id);
            return new ResponseEntity("Category deleted", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity("Category with id" + id + " not found", HttpStatus.NOT_FOUND);
        }
    }

}
