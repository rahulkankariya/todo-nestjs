import { Injectable } from '@nestjs/common';

// ✅ Move interface to top-level and export it
export interface Todo {
  id: number;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class TodoService {
  private readonly todos: Todo[] = [];
  private idCounter = 1;

  create(title: string, description?: string): Todo {
   
    const now = new Date();
    const newTodo: Todo = {
      id: this.idCounter++,
      title,
      description,
      createdAt: now,
      updatedAt: now,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: number): Todo | undefined {
    return this.todos.find(todo => todo.id === id);
  }

  update(id: number, title?: string, description?: string): Todo | undefined {
    const todo = this.todos.find(todo => todo.id === id);
    if (!todo) return undefined;

    if (title) todo.title = title;
    if (description) todo.description = description;
    todo.updatedAt = new Date();

    return todo;
  }

  delete(id: number): Todo | undefined {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index === -1) return undefined;

    const [deleted] = this.todos.splice(index, 1);
    return deleted;
  }
}
