package com.levelup.checkout.services.impl;

import com.levelup.checkout.dtos.CheckoutDto;
import com.levelup.checkout.exceptions.InvalidCardDetailsException;
import com.levelup.checkout.services.api.ICheckout;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;

@Service
public class CheckoutImpl implements ICheckout {

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

    private void validateCardDetails(CardDetails cardDetails) {
        final var errors = new ArrayList<String>();

        final var now = LocalDate.now();
        final var expiryDate = LocalDate.of(cardDetails.expiryYear(), cardDetails.expiryMonth(), now.getDayOfMonth());
        if (now.isAfter(expiryDate)) {
            errors.add("This card has expired");
        }

        final var cardNumberAsString = cardDetails.number().toString();
        if (!isLuhnValid(cardNumberAsString)) {
            errors.add("Invalid card number");
        }

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

    private boolean isLuhnValid(String cardNumber) {
        final var length = cardNumber.length();
        final var result = new StringBuilder(cardNumber);

        final var isEvenLength = length % 2 == 0;
        for (int i = cardNumber.length() - 1; i >= 0; i--) {
            if ((isEvenLength && i % 2 != 0) || (!isEvenLength && i % 2 == 0))
                continue;

            int digit = cardNumber.charAt(i);
            int doubled = digit * 2;
            if (doubled < 10) {
                result.append(digit);
            } else {
                int first = doubled / 10;
                int second = doubled % 10;
                result.replace(i, i, String.valueOf(first + second));
            }
        }

        int sum = 0;
        for (int i = 0; i < length; i++) {
            int digit = result.charAt(i);
            sum += digit;
        }

        return sum % 10 == 0;
    }
}
