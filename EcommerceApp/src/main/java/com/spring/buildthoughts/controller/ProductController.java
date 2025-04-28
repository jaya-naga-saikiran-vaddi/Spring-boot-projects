package com.spring.buildthoughts.controller;

import com.spring.buildthoughts.entity.ProductEntity;
import com.spring.buildthoughts.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.IntSummaryStatistics;
import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/api/products")
public class ProductController {
    @Autowired
    private ProductService service;

    @GetMapping
    public List<ProductEntity> all() {
        return service.getAll();
    }

    @PostMapping("/save")
    public ProductEntity save(@RequestBody ProductEntity product) {
        return service.save(product);
    }

    @GetMapping("/filter")
    public List<ProductEntity> filter() {
        return service.filterByPrice(500);
    }

    @GetMapping("/map")
    public List<String> map() {
        return service.mapToNames();
    }

    @GetMapping("/sorted")
    public List<ProductEntity> sorted() {
        return service.sortByPrice();
    }

    @GetMapping("/group-by-category")
    public Map<String, List<ProductEntity>> groupByCategory() {
        return service.groupByCategory();
    }

    @GetMapping("/avg-price")
    public Map<String, Double> avgPrice() {
        return service.avgPriceByCategory();
    }

    @GetMapping("/summary")
    public IntSummaryStatistics summary() {
        return service.summarizePrices();
    }
}

