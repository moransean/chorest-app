package com.choreapp.chorest.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/health")
public class HealthCheckController {

    @GetMapping("")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("OK");
    }   
}
