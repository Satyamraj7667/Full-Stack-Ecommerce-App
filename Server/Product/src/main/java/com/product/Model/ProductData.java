package com.product.Model;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductData {

	 private Product product;
	 private MultipartFile image;
}
