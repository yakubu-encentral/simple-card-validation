package com.levelup.checkout.services.api;

import com.levelup.checkout.dtos.CheckoutDto;

public interface ICheckout {

    boolean checkout(CheckoutDto checkoutDto);

}
