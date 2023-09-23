package com.levelup.checkout.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.validator.constraints.LuhnCheck;

@Data
public class CheckoutDto {

    @NotBlank(message = "Invalid Card Name: Not provided")
    @Size(min = 3, message = "Invalid Card Name: Must be at least 3 characters long")
    private String cardName;

    @NotBlank(message = "Invalid Card Number: Not provided")
    @LuhnCheck(message = "Invalid Card Number: Inaccurate PAN")
    @Pattern(regexp="\\d{16,19}", message = "Invalid Card Number: Must be 16 - 19 digits long")
    private String cardNumber;

    @NotBlank(message = "Invalid Card Expiry Month: Not provided")
    @Pattern(regexp="\\d{2}", message = "Invalid Card Expiry Month: Must be 2 digits long")
    private String expiryMonth;

    @NotBlank(message = "Invalid Card Expiry Year: Not provided")
    @Pattern(regexp="\\d{2}", message = "Invalid Card Expiry Year: Must be 2 digits long")
    private String expiryYear;

    @NotBlank(message = "Invalid Card CVV/CVC: Not provided")
    @Pattern(regexp="\\d{3,4}", message = "Invalid Card CVV/CVC: Must be 3 or 4 digits long")
    private String ccv;

}
