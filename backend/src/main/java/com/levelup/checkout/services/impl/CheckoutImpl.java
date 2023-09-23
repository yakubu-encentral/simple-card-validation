package com.levelup.checkout.services.impl;

import com.levelup.checkout.dtos.CheckoutDto;
import com.levelup.checkout.exceptions.InvalidCardDetailsException;
import com.levelup.checkout.services.api.ICheckout;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;

@Service
public class CheckoutImpl implements ICheckout {

    /**
     * @author YAKUBU
     * @dateCreated 22/09/2023
     * @description Checkouts user card details
     *
     * @param checkoutDto The request object
     *
     * @return boolean whether the card details is valid or not
     */
    @Override
    public boolean checkout(CheckoutDto checkoutDto) {
        final var cardDetails = new CardDetails(
                checkoutDto.getCardName(),
                Long.valueOf(checkoutDto.getCardNumber()),
                Short.valueOf(checkoutDto.getExpiryMonth()),
                Short.valueOf("20" + checkoutDto.getExpiryYear()),
                Short.valueOf(checkoutDto.getCcv())
        );
        validateCardDetails(cardDetails);
        return true;
    }

    /**
     * @author YAKUBU
     * @dateCreated 22/09/2023
     * @description Validates card details, throws InvalidCardDetailsException if invalid
     *
     * @param cardDetails The card details to validate
     */
    private void validateCardDetails(CardDetails cardDetails) {
        final var errors = new ArrayList<String>();

        // Step 1: check expiration date
        final var now = LocalDate.now();
        final var expiryDate = LocalDate.of(cardDetails.expiryYear(), cardDetails.expiryMonth(), now.getDayOfMonth());
        if (now.isAfter(expiryDate)) {
            errors.add("This card has expired");
        }

        // Step 2: check if is a valid luhn number
        final var cardNumberAsString = cardDetails.number().toString();
        if (!isLuhnValid(cardNumberAsString)) {
            errors.add("Invalid card number");
        }

        // Step 3: check ccv/cvc
        final var isAmericanExpress = cardNumberAsString.startsWith("34")
                || cardNumberAsString.startsWith("37");
        final var ccvAsString = cardDetails.ccv().toString();
        if (isAmericanExpress && ccvAsString.length() != 4) {
            errors.add("American express cards must have a cvv/cvc of exactly 4 digits");
        } else if (!isAmericanExpress && ccvAsString.length() != 3) {
            errors.add("Non American express cards must have a cvv/cvc of exactly 3 digits");
        }

        if (!errors.isEmpty()) {
            throw new InvalidCardDetailsException("Invalid Card Details", errors);
        }
    }

    /**
     * @author YAKUBU
     * @dateCreated 22/09/2023
     * @description This method checks whether a given number is luhn valid
     *
     * @param cardNumber The card number (PAN) to validate
     */
    private boolean isLuhnValid(String cardNumber) {
        final var length = cardNumber.length();
        final var result = new StringBuilder(cardNumber);

        final var isEvenLength = length % 2 == 0;
        for (int i = cardNumber.length() - 1; i >= 0; i--) {
            if ((isEvenLength && i % 2 != 0) || (!isEvenLength && i % 2 == 0))
                continue;

            int digit = Character.getNumericValue(cardNumber.charAt(i));
            int doubled = digit * 2;
            if (doubled < 10) {
                result.replace(i, i + 1, String.valueOf(doubled));
            } else {
                int first = doubled / 10;
                int second = doubled % 10;
                result.replace(i, i + 1, String.valueOf(first + second));
            }
        }

        int sum = 0;
        for (int i = 0; i < length; i++) {
            int digit = Character.getNumericValue(result.charAt(i));
            sum += digit;
        }

        return sum % 10 == 0;
    }
}
