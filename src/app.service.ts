import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
      <h1>To Do List API</h1>
      <p>Use <a href="http://localhost:3000/api" target="_blank">/todo</a> endpoint to manage your tasks.</p>
    `;
  }
}
