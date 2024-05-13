package com.product.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.product.Dao.ProductRepository;
import com.product.Exceptions.ResourceNotFoundException;
import com.product.Model.Product;

@Service
public class ProductServiceImpl implements ProductService {

	@Autowired
	private ProductRepository prodrepo;
	
	@Override
	public List<Product> GetAllProdcuts() {
		List<Product> l = prodrepo.findAll();
		if(l.size()>0) {
			return l;
		}
		else {
		throw new ResourceNotFoundException("No Products Found!");
		}
	}

	@Override
	public Product GetProduct(Long id) {
		
		if(prodrepo.findById(id).isEmpty()==false) {
			return prodrepo.findById(id).get();
		}
		else {
		throw new ResourceNotFoundException("Resource with given id : "+id+" , not found");
		}
	}

	@Override
	public void DeleteProduct(Long id) {
		if(GetProduct(id)!=null) {
			prodrepo.deleteById(id);
		}
		else {
			throw new ResourceNotFoundException("Resource with given id :"+id+" not found, so can't be deleted");
		}
	}

	@Override
	public void SaveProduct(Product p) {
		prodrepo.save(p);
		
	}

}
