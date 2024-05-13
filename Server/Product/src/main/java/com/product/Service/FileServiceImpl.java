package com.product.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;



@Service
public class FileServiceImpl implements FileService {

	@Override
	public String uploadImage(String path, MultipartFile file) throws IOException {
		String name = file.getOriginalFilename();
		String filepath = path + File.separator + name;
		
		//create folder if not exists
		File f = new File(path);
		if(!f.exists()) {
			f.mkdir();
		}
		
		//Copy file
		Files.copy(file.getInputStream(), Paths.get(filepath));
		return name;
	}

	@Override
	public InputStream getResource(String path, String filename) throws FileNotFoundException {
		String fullPath = path + File.separator + filename;
		InputStream is = new FileInputStream(fullPath);
		return is;
	}

	 @Override
	    public void deleteImage(String path, String filename) throws IOException {
	        String fullPath = path + File.separator + filename;
	        File file = new File(fullPath);
	        if (file.exists()) {
	            if (file.delete()) {
	                System.out.println("File deleted successfully: " + fullPath);
	            } else {
	                throw new IOException("Failed to delete file: " + fullPath);
	            }
	        } else {
	            throw new FileNotFoundException("File not found: " + fullPath);
	        }
	    }
}
