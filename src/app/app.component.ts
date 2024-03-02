import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    NgbModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  constructor(private modalService: NgbModal) { }

  openEditModal() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.editedTodo = this.todo;
    modalRef.result.then((result) => {
      // Handle modal result if needed
    });
  }

  title = 'Angular Calculator';
  newTodo = '';
  todo = '';
  todos: string[] = [];
  editingIndex: number | null = null;

  ngOnInit(): void {
    // Load todos from local storage when the component is initialized
    this.loadTodosFromLocalStorage();
  }

  addTodo(): void {
    if (this.todo.trim() === '') {
      alert('Please enter a todo');
      return;
    }
    if (this.editingIndex !== null) {
      this.todos[this.editingIndex] = this.todo;
      this.editingIndex = null;
    } else {
      this.todos.push(this.todo);
      this.saveTodosToLocalStorage();
    }
    this.todo = '';
  }

  deleteTodo(index: number): void {
    this.todos.splice(index, 1);
    this.saveTodosToLocalStorage();
  }

  editTodo(index: number): void {
    this.todo = this.todos[index];
    this.editingIndex = index;
  }

  private loadTodosFromLocalStorage(): void {
    if (typeof localStorage !== "undefined") {
      const todosFromLocalStorage = JSON.parse(localStorage.getItem('todos') || '[]');
      this.todos = todosFromLocalStorage;
    }
  }

  private saveTodosToLocalStorage(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
