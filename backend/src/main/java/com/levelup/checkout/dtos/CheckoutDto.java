package com.levelup.checkout.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CheckoutDto {

    @NotBlank(message = "Invalid Card Name: Empty name")
    @Size(min = 3, message = "Invalid Name: Must be at least 3 characters long")
    private String cardName;

    @NotBlank(message = "Invalid Card Number: Empty number")
    @Size(min = 19, max = 22, message = "Invalid Card Number: Must be of 19 - 22 characters long")
    private String cardNumber;

    @NotBlank(message = "Invalid Card Expiry Month: Not provided")
    private String expiryMonth;

    @NotBlank(message = "Invalid Card Expiry Year: Not provided")
    private String expiryYear;

    @NotBlank(message = "Invalid Card CVV/CVC: Not provided")
    @Size(min = 3, max = 3, message = "Invalid Card CVV/CVC: Must be of 3 characters long")
    private String ccv;

}
