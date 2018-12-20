package com.adminportal.admin.util;


import com.adminportal.admin.entity.Word;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

public class ExcelGenerator {
	
	public static ByteArrayInputStream customersToExcel(List<Word> words) throws IOException {
		String[] COLUMNs = { "vocabulary", "definition", "note","phonetic","title","typeword"};
		try(
				Workbook workbook = new XSSFWorkbook();
				ByteArrayOutputStream out = new ByteArrayOutputStream();
		){
			CreationHelper createHelper = workbook.getCreationHelper();
	 
			Sheet sheet = workbook.createSheet("Words");
	 
			Font headerFont = workbook.createFont();
			headerFont.setBold(true);
			headerFont.setColor(IndexedColors.BLUE.getIndex());
	 
			CellStyle headerCellStyle = workbook.createCellStyle();
			headerCellStyle.setFont(headerFont);
	 
			// Row for Header
			Row headerRow = sheet.createRow(0);
	 
			// Header
			for (int col = 0; col < COLUMNs.length; col++) {
				Cell cell = headerRow.createCell(col);
				cell.setCellValue(COLUMNs[col]);
				cell.setCellStyle(headerCellStyle);
			}
	 
			// CellStyle for Age
			CellStyle ageCellStyle = workbook.createCellStyle();
			ageCellStyle.setDataFormat(createHelper.createDataFormat().getFormat("#"));
	 
			int rowIdx = 1;
			for (Word customer : words) {
				Row row = sheet.createRow(rowIdx++);
	 
				row.createCell(0).setCellValue(customer.getVocabulary());
				row.createCell(1).setCellValue(customer.getDefinition());
				row.createCell(2).setCellValue(customer.getNote());
				row.createCell(3).setCellValue(customer.getPhonetic());
				row.createCell(4).setCellValue(customer.getTitle());
				row.createCell(5).setCellValue(customer.getTypeword());
	 
//				Cell ageCell = row.createCell(3);
//				ageCell.setCellValue(customer.getAge());
//				ageCell.setCellStyle(ageCellStyle);
			}
	 
			workbook.write(out);
			return new ByteArrayInputStream(out.toByteArray());
		}
	}
}