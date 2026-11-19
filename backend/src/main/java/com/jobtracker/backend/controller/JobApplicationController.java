package com.jobtracker.backend.controller;

import com.jobtracker.backend.model.JobApplication;
import com.jobtracker.backend.repository.JobApplicationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class JobApplicationController {

    private final JobApplicationRepository repository;

    public JobApplicationController(JobApplicationRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<JobApplication> getApplications() {
        return repository.findAll();
    }

    @PostMapping
    public JobApplication createApplication(@RequestBody JobApplication application) {
        application.setId(null);
        return repository.save(application);
    }

    @PutMapping("/{id}")
    public JobApplication updateApplication(@PathVariable Long id, @RequestBody JobApplication updated) {
        JobApplication application = repository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

                application.setCompany(updated.getCompany());
                application.setPosition(updated.getPosition());
                application.setStatus(updated.getStatus());

                return repository.save(application);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteApplication(@PathVariable Long id) {
        if(!repository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        }

        repository.deleteById(id);
    }
}
