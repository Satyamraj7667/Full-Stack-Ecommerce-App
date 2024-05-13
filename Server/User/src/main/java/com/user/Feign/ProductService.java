package com.user.Feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.user.Model.Product;

@FeignClient(name="PRODUCT-SERVICE")
public interface ProductService {

	@GetMapping("/product/{productId}")
	Product getProductById(@PathVariable("productId") Long productId);
}
