package com.api.ecommerce.Common;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class FileStorage {
    @Value("${file.upload-dir:C:/Users/sany/Uploads/}")
    private String uploadDirectory;

    public String saveFile(MultipartFile file) {
        try {
            Path uploadPath = Paths.get(uploadDirectory);
            Files.createDirectories(uploadPath);
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
            return "http://localhost:9000/Uploads/" + "/" + fileName;
        } catch (IOException e) {
            throw new RuntimeException("Erreur lors de l'upload du fichier : " + file.getOriginalFilename(), e);
        }
    }
}
