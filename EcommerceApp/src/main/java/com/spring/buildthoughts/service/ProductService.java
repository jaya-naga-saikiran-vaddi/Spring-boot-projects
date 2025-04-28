package com.spring.buildthoughts.service;

import com.spring.buildthoughts.entity.ProductEntity;
import com.spring.buildthoughts.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.IntSummaryStatistics;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;


    public ProductEntity save(ProductEntity product) {
        return productRepository.save(product);
    }

    public List<ProductEntity> getAll() {
        return productRepository.findAll();
    }

    public List<ProductEntity> filterByPrice(double minPrice) {
        return productRepository.findAll().stream()
                .filter(p -> p.getPrice() > minPrice)
                .collect(Collectors.toList());
    }

    public List<String> mapToNames() {
        return productRepository.findAll().stream()
                .map(ProductEntity::getName)
                .collect(Collectors.toList());
    }

    public List<ProductEntity> sortByPrice() {
        return productRepository.findAll().stream()
                .sorted(Comparator.comparingDouble(ProductEntity::getPrice))
                .collect(Collectors.toList());
    }

    public Map<String, List<ProductEntity>> groupByCategory() {
        return productRepository.findAll().stream()
                .collect(Collectors.groupingBy(ProductEntity::getCategory));
    }

    public Map<String, Double> avgPriceByCategory() {
        return productRepository.findAll().stream()
                .collect(Collectors.groupingBy(
                        ProductEntity::getCategory,
                        Collectors.averagingDouble(ProductEntity::getPrice)
                ));
    }

    public IntSummaryStatistics summarizePrices() {
        return productRepository.findAll().stream()
                .collect(Collectors.summarizingInt(p -> (int) p.getPrice()));
    }
}
