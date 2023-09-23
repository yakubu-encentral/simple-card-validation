package com.levelup.checkout.controllers;

import com.levelup.checkout.dtos.CheckoutDto;
import com.levelup.checkout.services.api.ICheckout;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("checkout")
public class CheckoutController {

    @Autowired
    private ICheckout iCheckout;

    @PostMapping
    public void checkout(@RequestBody @Valid CheckoutDto checkoutDto) {
        iCheckout.checkout(checkoutDto);
    }
}
