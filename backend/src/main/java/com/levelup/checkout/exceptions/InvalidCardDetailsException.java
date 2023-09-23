package com.levelup.checkout.exceptions;

import java.util.List;

public class InvalidCardDetailsException extends RuntimeException {

    private List<String> reasons;

    public InvalidCardDetailsException(String message, List<String> reasons) {
        super(message);
        this.reasons = reasons;
    }

    public InvalidCardDetailsException(String message, Throwable cause) {
        super(message, cause);
    }

    public List<String> getReasons() {
        return reasons;
    }
}
