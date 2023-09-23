package com.levelup.checkout.exceptions;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.List;

@ControllerAdvice
public class DefaultExceptionHandler {

    /**
     * @author YAKUBU
     * @dateCreated 22/09/2023
     * @description General InvalidCardDetailsException Handler
     *
     * @param e The error thrown
     * @param request The request that caused the error
     *
     * @return an appropriate error response
     */
    @ExceptionHandler(InvalidCardDetailsException.class)
    public ResponseEntity<ApiError> handleException(InvalidCardDetailsException e, HttpServletRequest request) {
        final var multiApiError = new ApiError(request.getRequestURI(),
                e.getReasons(),
                HttpStatus.BAD_REQUEST.value(),
                LocalDateTime.now());
        return new ResponseEntity<>(multiApiError, HttpStatus.BAD_REQUEST);
    }

    /**
     * @author YAKUBU
     * @dateCreated 23/09/2023
     * @description General MethodArgumentNotValidException Handler
     *
     * @param e The error thrown
     * @param request The request that caused the error
     *
     * @return an appropriate error response
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiError> handleException(MethodArgumentNotValidException e, HttpServletRequest request) {
        final var message = e.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .toList();
        final var multiApiError = new ApiError(request.getRequestURI(),
                message,
                HttpStatus.BAD_REQUEST.value(),
                LocalDateTime.now());
        return new ResponseEntity<>(multiApiError, HttpStatus.BAD_REQUEST);
    }

    /**
     * @author YAKUBU
     * @dateCreated 22/09/2023
     * @description General Exception Handler
     *
     * @param e The error thrown
     * @param request The request that caused the error
     *
     * @return an appropriate error response
     */
    @ExceptionHandler
    public ResponseEntity<ApiError> handleException(Exception e, HttpServletRequest request) {
        final var apiError = new ApiError(
                request.getRequestURI(),
                List.of(e.getMessage()),
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                LocalDateTime.now()
        );

        e.printStackTrace();
        return new ResponseEntity<>(apiError, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
