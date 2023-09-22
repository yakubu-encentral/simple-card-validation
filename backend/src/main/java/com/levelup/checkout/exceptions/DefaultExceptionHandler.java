package com.levelup.checkout.exceptions;

import jakarta.servlet.http.HttpServletRequest;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;

@ControllerAdvice
public class DefaultExceptionHandler {

    private static final Logger logger = LogManager.getLogger(DefaultExceptionHandler.class);

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiError> handleException(IllegalArgumentException e, HttpServletRequest request) {
        return commonBadRequest(e.getMessage(), request.getRequestURI());
    }

    @ExceptionHandler(IllegalStateException.class)
    public ResponseEntity<ApiError> handleException(IllegalStateException e, HttpServletRequest request) {
        return commonBadRequest(e.getMessage(), request.getRequestURI());
    }

    @ExceptionHandler(InvalidCardDetailsException.class)
    public ResponseEntity<ApiError> handleException(InvalidCardDetailsException e, HttpServletRequest request) {
        return commonNotFound(e.getMessage(), request.getRequestURI());
    }

    @ExceptionHandler
    public ResponseEntity<ApiError> handleException(Exception e, HttpServletRequest request) {
        ApiError apiError = new ApiError(
                request.getRequestURI(),
                e.getMessage(),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                LocalDateTime.now()
        );

        e.printStackTrace();
        return new ResponseEntity<>(apiError, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private ResponseEntity<ApiError> commonBadRequest(String message, String uri) {
        ApiError apiError = new ApiError(uri, message, HttpStatus.BAD_REQUEST.value(), LocalDateTime.now());
        return new ResponseEntity<>(apiError, HttpStatus.BAD_REQUEST);
    }

    private ResponseEntity<ApiError> commonNotFound(String message, String uri) {
        ApiError apiError = new ApiError(uri, message, HttpStatus.NOT_FOUND.value(), LocalDateTime.now());
        return new ResponseEntity<>(apiError, HttpStatus.NOT_FOUND);
    }
}
