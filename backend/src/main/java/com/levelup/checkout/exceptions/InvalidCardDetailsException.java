package com.levelup.checkout.exceptions;

import java.util.List;

/**
 * @author YAKUBU
 * @dateCreated 22/09/2023
 * @description Exception that is thrown when a card is invalid
 */
public class InvalidCardDetailsException extends RuntimeException {

    private List<String> reasons;

    public InvalidCardDetailsException(String message, List<String> reasons) {
        super(message);
        this.reasons = reasons;
    }

    public List<String> getReasons() {
        return reasons;
    }
}
