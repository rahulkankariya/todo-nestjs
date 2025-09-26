import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { TodoListDto } from './dto/to-do-list';

@ApiTags('todo')
@ApiHeader({
  name: 'Accept-Language',
  description: 'Language code (en | hi)',
  required: false,
})
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll(@I18n() i18n: I18nContext) {
    const todos = this.todoService.findAll();
    const message = i18n.t('todo.list'); // ✅ await
    return { message, data: todos, };
  }

  @Post()
  async create(@Body() dto: TodoListDto, @I18n() i18n: I18nContext) {
    const todo = this.todoService.create(dto.title, dto.description);
    const message = i18n.t('todo.created'); // ✅ await
    return { message, data: todo, };
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @I18n() i18n: I18nContext) {
    const todo = this.todoService.findOne(+id);
    if (!todo) return { message: i18n.t('todo.notFound') };
    return { message: i18n.t('todo.found'), data: todo };
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: TodoListDto, @I18n() i18n: I18nContext) {
    const todo = this.todoService.update(+id, dto.title, dto.description);
    if (!todo) return { message: i18n.t('todo.notFound') };
    return { message: i18n.t('todo.updated'), data: todo };
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @I18n() i18n: I18nContext) {
    const todo = this.todoService.delete(+id);
    if (!todo) return { message: i18n.t('todo.notFound') };
    return { message: i18n.t('todo.deleted'), data: todo };
  }
}
