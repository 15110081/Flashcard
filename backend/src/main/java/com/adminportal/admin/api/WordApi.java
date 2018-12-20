package com.adminportal.admin.api;

import com.adminportal.admin.controller.WordController;
import com.adminportal.admin.dto.UploadFileDTO;
import com.adminportal.admin.entity.Word;
import com.adminportal.admin.model.MyFile;
import com.adminportal.admin.service.FileStorageService;
import com.adminportal.admin.service.WordService;
import com.adminportal.admin.util.ApiResponseBuilder;
import com.adminportal.admin.util.AppConstants;
import com.adminportal.admin.util.ExcelGenerator;
import com.adminportal.admin.util.UploadFileUtils;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.util.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/wordapi")
public class WordApi {
    @Autowired
    private WordService articleService;
    ObjectMapper objectMapper = new ObjectMapper();
    @Autowired
    FileStorageService fileStorageService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public Map<String, ?> getAllWordAPI() {
        return ApiResponseBuilder.buildContainsData("List all words", articleService.selectAllWord());
    }

    @GetMapping("/{id}")
    public Map<String, ?> getWordAPI(@PathVariable Long id) {
        return ApiResponseBuilder.buildContainsData("Get article#" + id, articleService.selectWordById(id));
    }
    @GetMapping("/infoWord/{id}")
    public Word getWordInfoAPI(@PathVariable Long id) {
        return  articleService.selectWordById(id);
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, ?> postArticle(@RequestBody Word article) {
        Word insertedArticle = articleService.insertWord(new Word(article.getVocabulary(), article.getPhonetic(), article.getNote(), article.getDefinition(), article.getTypeword(), article.getTitle(), article.getImageWord()));
        return ApiResponseBuilder.buildSuccess(String.format("Insert article#%d success", insertedArticle.getId()), insertedArticle);
    }

    //    @RequestMapping(value = "/Image/{id:.+}", method = RequestMethod.GET)
//    public ResponseEntity<byte[]> getImage(@PathVariable("id") String id) {
//        byte[] image = imageService.getImage(id);
//        return ResponseEntity.ok().contentType(MediaType.IMAGE_JPEG).body(image);
//    }
    @GetMapping(value = "/image/{id}")
    public ResponseEntity<InputStreamResource> getImage(@PathVariable("id")Long id) throws IOException {
        Word word=articleService.selectWordById(id);
        ClassPathResource imgFile = new ClassPathResource("/static/uploads/image/"+word.getImageWord());
        return ResponseEntity
                .ok()
                .contentType(MediaType.IMAGE_JPEG).contentType(MediaType.IMAGE_PNG)
                .body(new InputStreamResource(imgFile.getInputStream()));
    }

    @PutMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, ?> putArticle(@PathVariable Long id, @RequestBody Word article) {
        Word updatedArticle = articleService.updateWord(id, article);
        return ApiResponseBuilder.buildSuccess(String.format("Update article#%d success", id), updatedArticle);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.OK)
    public Map<String, ?> deleteArticle(@PathVariable Long id) {
        boolean success = articleService.deleteWord(id);
        if (success)
            return ApiResponseBuilder.buildSuccess(String.format("Delete article#%d success", id));
        else
            return ApiResponseBuilder.buildError(String.format("Delete article#%d fail", id));
    }
    @GetMapping(value = "/download/words.xlsx")
    public ResponseEntity<InputStreamResource> excelWordsReport() throws IOException {
        List<Word> words = articleService.selectAllWord();

        ByteArrayInputStream in = ExcelGenerator.customersToExcel(words);

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Disposition", "attachment; filename=words.xlsx");

        return ResponseEntity
                .ok()
                .headers(headers)
                .body(new InputStreamResource(in));
    }
    @GetMapping(value = "/getTest")
    public List<Word> getTest(){
        return WordController.listOfWord;
    }

    @RequestMapping(value = "/getAllWord", method = RequestMethod.GET)
    public List<Word> getAllWords() {
        return articleService.selectAllWord();
    }

    @RequestMapping(value = AppConstants.DOWNLOAD_URI, method = RequestMethod.GET)
    public ResponseEntity<Resource> downloadFile(@PathVariable String fileName, HttpServletRequest request) {
        Resource resource = fileStorageService.loadFileAsResource(fileName);
        String contentType = null;
        try {
            contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
        } catch (IOException ex) {
            ex.printStackTrace();
        }
        if (contentType == null) {
            contentType = AppConstants.DEFAULT_CONTENT_TYPE;
        }
        return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        String.format(AppConstants.FILE_DOWNLOAD_HTTP_HEADER, resource.getFilename()))
                .body(resource);
    }


}
