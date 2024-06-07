package com.todo.application.ToDo.Repo;

import com.todo.application.ToDo.Entity.ToDoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepo extends JpaRepository<ToDoEntity,Long> {
}
