package com.adminportal.admin.controller;

import com.adminportal.admin.entity.Word;

import com.adminportal.admin.model.MyFile;
import com.adminportal.admin.service.WordService;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;


import org.springframework.beans.factory.annotation.Autowired;

import java.util.Base64;
import java.util.Iterator;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.*;

import java.util.ArrayList;

import java.util.List;


import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;

@Controller
@RequestMapping("/word")
public class WordController {

    @Autowired
    private WordService wordService;

    public static List<Word> listOfWord = new ArrayList();

    @RequestMapping(value = "/add", method = RequestMethod.GET)
    public String addWord(Model model) {
        Word word = new Word();
        model.addAttribute("word", word);
        return "addWord";
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public String addWordPost(@ModelAttribute("word") Word word, HttpServletRequest request) throws IOException {
        wordService.insertWord(word);
        MultipartFile wordImage = word.getImage();
        MultipartFile wordAudio = word.getAudio();
        String name = word.getId() + "_" + wordImage.getOriginalFilename();
        String nameAudio = word.getId() + "_" + wordAudio.getOriginalFilename();
//        Base64.getEncoder(wo,"png");
        byte[] bytes;
        bytes = wordImage.getBytes();
        try (FileOutputStream fileOutputStream = new FileOutputStream(new File("src/main/resources/static/uploads/image/" + name))) {
            fileOutputStream.write(bytes);
        } catch (IOException e) {
            e.printStackTrace();
        }

        byte[] decodeBase64 = wordAudio.getBytes();
        try (FileOutputStream fileOutputStream = new FileOutputStream(new File("src/main/resources/static/uploads/audio/" + nameAudio))) {
            fileOutputStream.write(decodeBase64);
        } catch (IOException e) {
            e.printStackTrace();
        }
//            File f=new File("src/main/resources/static/image/word/" + name);
//            f.createNewFile();   src/main/resources/static/uploads/image/
//            FileCopyUtils.copy(bytes,f);
//            wordApi.getImage();

        word.setImageWord(name);
        word.setAudioword(nameAudio);
        wordService.insertWord(word);
        return "redirect:wordList";
    }

    @RequestMapping("/wordInfo")
    public String wordInfo(@RequestParam("id") Long id, Model model) {
        Word word = wordService.selectWordById(id);
        model.addAttribute("word", word);
        return "wordInfo";
    }

//
//

    @RequestMapping("/updateWord")
    public String updateWord(@RequestParam("id") Long id, Model model) {
        Word word = wordService.selectWordById(id);
        model.addAttribute("word", word);
        return "updateWord";
    }

//    @RequestMapping(value = "/updateWord", method = RequestMethod.POST,params="action=delete")
//    public String deleteImage(@ModelAttribute("word") Word word, HttpServletRequest request) {
////        File  file= new File(request.getSession().getServletContext().getRealPath("resources/static/uploads/")+word.getImageWord());
//        File file = new File("src/main/resources/static/uploads/image/" + word.getImageWord());
//        file.delete();
//        word.setImageWord("");
//        wordService.updateWord(word.getId(), word);
//        return "delete success";
//    }

    @RequestMapping(value = "/updateWord", method = RequestMethod.POST)
    public String updateWordPost(@ModelAttribute("word") Word word, HttpServletRequest request) throws IOException {
//        wordService.insertWord(word);
        Word word1=wordService.selectWordById(word.getId());

        MultipartFile wordImage = word.getImage();
        MultipartFile wordAudio=word.getAudio();

        if(wordImage.getOriginalFilename()!=null && wordAudio.getOriginalFilename()!=null)
        {
            String name = word.getId() + "_" + wordImage.getOriginalFilename();
            File file = new File("src/main/resources/static/uploads/image/" + word1.getImageWord());
            file.delete();
            String nameAudio = word.getId() + "_" + wordAudio.getOriginalFilename();
            File file1=new File("src/main/resources/static/uploads/audio/" + word1.getAudioword());
            file1.delete();

            word.setImageWord(name);
            word.setAudioword(nameAudio);
            byte[] bytes;
            bytes = wordImage.getBytes();
            try (FileOutputStream fileOutputStream = new FileOutputStream(new File("src/main/resources/static/uploads/image/" + name))) {
                fileOutputStream.write(bytes);
            } catch (IOException e) {
                e.printStackTrace();
            }
            byte[] decodeBase64 = wordAudio.getBytes();
            try (FileOutputStream fileOutputStream = new FileOutputStream(new File("src/main/resources/static/uploads/audio/" + nameAudio))) {
                fileOutputStream.write(decodeBase64);
            } catch (IOException e) {
                e.printStackTrace();
            }
            wordService.updateWord(word.getId(), word);
            return "redirect:/word/wordInfo?id=" + word.getId();
        }
        if(wordImage.getOriginalFilename()!=null) {
            String name = word.getId() + "_" + wordImage.getOriginalFilename();
            File file = new File("src/main/resources/static/uploads/image/" + word1.getImageWord());
            file.delete();
            word.setAudioword(word1.getAudioword());
            word.setImageWord(name);
            byte[] bytes;
            bytes = wordImage.getBytes();
            try (FileOutputStream fileOutputStream = new FileOutputStream(new File("src/main/resources/static/uploads/image/" + name))) {
                fileOutputStream.write(bytes);
            } catch (IOException e) {
                e.printStackTrace();
            }
            wordService.updateWord(word.getId(), word);
        }
        if(wordAudio.getOriginalFilename()!=null){
            String nameAudio = word.getId() + "_" + wordAudio.getOriginalFilename();
            File file1=new File("src/main/resources/static/uploads/audio/" + word1.getAudioword());
            file1.delete();
            word.setImageWord(word1.getImageWord());
            word.setAudioword(nameAudio);
            byte[] decodeBase64 = wordAudio.getBytes();
            try (FileOutputStream fileOutputStream = new FileOutputStream(new File("src/main/resources/static/uploads/audio/" + nameAudio))) {
                fileOutputStream.write(decodeBase64);
            } catch (IOException e) {
                e.printStackTrace();
            }
            wordService.updateWord(word.getId(), word);
        }


        return "redirect:/word/wordInfo?id=" + word.getId();
    }

    @RequestMapping("/wordList")
    public String wordList(Model model) {
        List<Word> wordsList = wordService.selectAllWord();
        model.addAttribute("wordList", wordsList);
        return "list";

    }

    @RequestMapping(value = "/remove", method = RequestMethod.POST)
    public String removeWord(
            @ModelAttribute("id") String id, Model model
    ) {
        wordService.deleteWord(Long.parseLong(id.substring(8)));
        List<Word> wordsList = wordService.selectAllWord();
        model.addAttribute("wordList", wordsList);

        return "redirect:wordList";
    }

    @RequestMapping(value = "/removeList", method = RequestMethod.POST)
    public String removeList(
            @RequestBody ArrayList<String> wordIdList, Model model
    ) {

        for (String id : wordIdList) {
            wordService.deleteWord(Long.parseLong(id));
        }

        return "delete success";
    }

    @RequestMapping("/importExcel")
    public String uploadFile(Model model) {
        return "importExcel";
    }

    @RequestMapping(value = "/uploadExcel", method = RequestMethod.POST)
    public String uploadFilePost(Model model, MyFile myFile) {

        this.listOfWord = returnListWordImport(myFile);
        for (Word word : this.listOfWord) {
            wordService.insertWord(word);
        }
        model.addAttribute("myFile", myFile);
        return "insert import list word succes";
    }

    //    @RequestMapping(value="/getFilePost",method = RequestMethod.POST)
//    public List<Word> getFilePost( ){
//        listOfWord=returnListWordImport(myFile);
//        return this.listOfWord;
//    }
    public List<Word> returnListWordImport(MyFile myFile) {
        List<Word> listOfWord = new ArrayList<Word>();
        try {

            MultipartFile multipartFile = myFile.getMultipartFile();
            String fileName = multipartFile.getOriginalFilename();
            File file = new File("D:/files", fileName);
            multipartFile.transferTo(file);
            FileInputStream excelFile = new FileInputStream(new File("D:/files/" + fileName));
            Workbook workbook = new XSSFWorkbook(excelFile);
            Sheet datatypeSheet = workbook.getSheetAt(0);

            Iterator<Row> iterator = datatypeSheet.iterator();
            Row firstRow = iterator.next();
            Cell firstCell = firstRow.getCell(0);
//            System.out.println(firstCell.getStringCellValue());

            while (iterator.hasNext()) {
                Word word = new Word();
                Row currentRow = iterator.next();
                word.setVocabulary(currentRow.getCell(0).getStringCellValue());
                word.setDefinition(currentRow.getCell(1).getStringCellValue());
                word.setNote(currentRow.getCell(2).getStringCellValue());
                word.setPhonetic(currentRow.getCell(3).getStringCellValue());
                word.setTypeword(currentRow.getCell(4).getStringCellValue());
                word.setTitle(currentRow.getCell(5).getStringCellValue());
                listOfWord.add(word);
            }
            workbook.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return listOfWord;
    }

}
