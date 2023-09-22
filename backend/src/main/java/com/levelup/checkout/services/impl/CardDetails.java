package com.levelup.checkout.services.impl;

public record CardDetails(String name, Long number, Short expiryMonth, Short expiryYear, Short ccv) {
}
