package com.spring.buildthoughts.controller;

import com.spring.buildthoughts.entity.CustomerEntity;
import com.spring.buildthoughts.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService service;

    @PostMapping
    public CustomerEntity saveCustomer(@RequestBody CustomerEntity customer) {
        return service.saveCustomer(customer);
    }

    @GetMapping
    public List<CustomerEntity> all() {
        return service.getAll();
    }

    @GetMapping("/sorted")
    public List<CustomerEntity> sorted() {
        return service.sortedByName();
    }

    @GetMapping("/grouped")
    public Map<String, List<CustomerEntity>> groupByCity() {
        return service.groupByCity();
    }
}
