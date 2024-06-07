package com.todo.application.ToDo.Controller;

import com.todo.application.ToDo.Entity.ToDoEntity;
import com.todo.application.ToDo.Repo.TodoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class TodoController {
    @Autowired
    private TodoRepo todoRepo;


    @PostMapping("/todos")
    public ResponseEntity<ToDoEntity> createTodo(@RequestBody ToDoEntity todo) {
        ToDoEntity savedTodo = todoRepo.save(todo);
        return new ResponseEntity<>(savedTodo, HttpStatus.CREATED);
    }
    @GetMapping("/todos")
    public List<ToDoEntity> getAllTodos() {
        return todoRepo.findAll();
    }

    @PutMapping("/todos/{id}")
    public ResponseEntity<ToDoEntity> updateTodo(@PathVariable Long id, @RequestBody ToDoEntity todoDetails) {
        ToDoEntity todo = todoRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Todo not found with id: " + id));

        todo.setTask(todoDetails.getTask());


        ToDoEntity updatedTodo = todoRepo.save(todo);
        return ResponseEntity.ok(updatedTodo);
    }

    @DeleteMapping("/todos/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long id) {
        todoRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
