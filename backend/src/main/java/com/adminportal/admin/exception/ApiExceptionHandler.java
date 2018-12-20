package com.adminportal.admin.exception;

import com.adminportal.admin.util.ApiResponseBuilder;
import org.hibernate.ObjectNotFoundException;
import org.hibernate.PropertyValueException;
import org.hibernate.TypeMismatchException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {


    // handle custom exception
    @ExceptionHandler(value = {
            ObjectNotFoundException.class,
            PropertyValueException.class,
            TypeMismatchException.class
    })
    public ResponseEntity<Object> handleNotExistResource(Exception ex) {
        logger.error(String.format("Handle %s [status_code=%s, message=%s]",
                ex.getClass().getSimpleName(), HttpStatus.BAD_REQUEST, ex.getMessage()));
        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(ApiResponseBuilder.buildError(ex.getMessage()));
    }

    // handle another exception
    @Override
    protected ResponseEntity<Object> handleExceptionInternal(Exception ex, Object body, HttpHeaders headers, HttpStatus status, WebRequest request) {
        logger.error(String.format("Handle %s [status_code=%s, message=%s]",
                ex.getClass().getSimpleName(), HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage()));
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponseBuilder.buildError(ex.getMessage()));
    }
}

