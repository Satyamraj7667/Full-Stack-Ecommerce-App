package com.product.Controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.product.Model.Product;
import com.product.Model.ProductData;
import com.product.Payload.ApiResponse;
import com.product.Service.FileService;
import com.product.Service.ProductService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {

	@Autowired
	private ProductService prodserv;
	
	@Autowired
	private FileService fileserv;
	
	@Value("${project.image}")
	private String path;
	
	@GetMapping
	public ResponseEntity<List<Product>> AllProducts(){
	     List<Product> l = prodserv.GetAllProdcuts();
	     return ResponseEntity.ok(l);
	}
	@GetMapping("/{id}")
	public ResponseEntity<Product> SingleProduct(@PathVariable Long id){
		 Product p = prodserv.GetProduct(id);
		return ResponseEntity.ok(p);
	}
	
//	@PostMapping
//	public ResponseEntity<Product> SaveProd(@RequestPart("product") Product p, @RequestParam("photo") MultipartFile image) throws IOException {
//		
//		String filename = fileserv.uploadImage(path, image);
//		p.setPhoto(filename);
//		prodserv.SaveProduct(p);
//		return ResponseEntity.status(HttpStatus.CREATED).body(p);
//	}
	
//	@PostMapping
//	public ResponseEntity<Product> SaveProd(@RequestBody ProductData productData ) throws IOException {
//		MultipartFile photo=  productData.getImage();
//		Product p = productData.getProduct();
//		String filename = fileserv.uploadImage(path, photo);
//		p.setPhoto(filename);
//		prodserv.SaveProduct(p);
//		return ResponseEntity.status(HttpStatus.CREATED).body(p);
//	}
	
	
	@PostMapping
	public ResponseEntity<Product> createProduct(@RequestBody Product p){
		prodserv.SaveProduct(p);
		return ResponseEntity.ok(p);
	}
	
	@PostMapping("/image/upload/{productId}")
	public ResponseEntity<Product> UploadImage( @PathVariable("productId") Long productId,@RequestParam("image") MultipartFile image) throws IOException{
		
			String filename = fileserv.uploadImage(path, image);
			Product p = prodserv.GetProduct(productId);
			p.setPhoto(filename);
			prodserv.SaveProduct(p);
			return ResponseEntity.ok(p);
		
	}
	
	
	 @DeleteMapping("/img/{filename}")
	    public ResponseEntity<String> deleteImage(@PathVariable("filename") String filename) {
	        try {
	            fileserv.deleteImage(path, filename);
	            return ResponseEntity.ok().body("Image deleted successfully: " + filename);
	        } catch (IOException e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                                 .body("Failed to delete image: " + filename + ", Error: " + e.getMessage());
	        }
	    }
	@DeleteMapping("/{id}")
	public ApiResponse DeleteProduct(@PathVariable Long id){
		String filename =  prodserv.GetProduct(id).getPhoto();
		try {
			fileserv.deleteImage(path, filename);
		}
		catch(IOException e){
			System.out.println(e);
		}
		prodserv.DeleteProduct(id);
		return new ApiResponse("Product deleted successfully !",true,HttpStatus.OK);
	}
	
	
	@GetMapping(value = "/image/{imageName}", produces = MediaType.IMAGE_JPEG_VALUE)
	public void showImage(@PathVariable("imageName") String imageName, HttpServletResponse response) throws IOException{
		InputStream resource = this.fileserv.getResource(path, imageName);
		response.setContentType(MediaType.IMAGE_JPEG_VALUE);
		StreamUtils.copy(resource, response.getOutputStream());
	}
	
	//Image Upload
//	
//	
}
