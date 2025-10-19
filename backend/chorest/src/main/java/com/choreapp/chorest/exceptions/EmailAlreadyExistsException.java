package com.choreapp.chorest.exceptions;

//might need to change to IOException

public class EmailAlreadyExistsException extends RuntimeException {
    public EmailAlreadyExistsException(String message) {
        super(message);
    }
}
