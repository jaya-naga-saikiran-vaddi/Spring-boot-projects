package com.spring.buildthoughts.service;

import com.spring.buildthoughts.entity.CustomerEntity;
import com.spring.buildthoughts.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;

    public List<CustomerEntity> getAll() {
        return customerRepository.findAll();
    }

    public List<CustomerEntity> sortedByName() {
        List<CustomerEntity> customers = customerRepository.findAll();
        return sortCustomersByName(customers);
    }

    private List<CustomerEntity> sortCustomersByName(List<CustomerEntity> customers) {
        return customers.stream()
                .sorted(Comparator.comparing(CustomerEntity::getName))
                .toList();
    }

    public Map<String, List<CustomerEntity>> groupByCity() {
        List<CustomerEntity> customers = customerRepository.findAll();
        return groupCustomersByCity(customers);
    }

    private Map<String, List<CustomerEntity>> groupCustomersByCity(List<CustomerEntity> customers) {
        return customers.stream()
                .collect(Collectors.groupingBy(CustomerEntity::getCity));
    }

    public CustomerEntity saveCustomer(CustomerEntity customer) {
        return customerRepository.save(customer);
    }

}
