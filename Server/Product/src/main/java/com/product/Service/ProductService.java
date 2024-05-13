package com.product.Service;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.product.Model.Product;


public interface ProductService {

	void SaveProduct(Product p);
	List<Product> GetAllProdcuts();
	Product GetProduct(Long id);
	void DeleteProduct(Long id);
}
