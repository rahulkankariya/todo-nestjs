import { Controller, Get, Post, Put, Delete, Body, Param, Headers } from '@nestjs/common';
import { I18n, I18nContext } from 'nestjs-i18n';
import { TodoService } from './todo.service';
import { TodoListDto } from './dto/to-do-list';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(
    @I18n() i18n: I18nContext,
    @Headers('accept-language') lang?: string, // optional header
  ) {
    const todos = this.todoService.findAll();
    const message = i18n.t('todo.list', { lang: lang || undefined }); // fallback if lang missing
    return { message, data: todos };
  }

  @Post()
  create(
    @Body() dto: TodoListDto,
    @I18n() i18n: I18nContext,
    @Headers('accept-language') lang?: string,
  ) {
    const todo = this.todoService.create(dto.title, dto.description);
    const message = i18n.t('todo.created', { lang: lang || undefined });
    return { message, data: todo };
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @I18n() i18n: I18nContext,
    @Headers('accept-language') lang?: string,
  ) {
    const todo = this.todoService.findOne(+id);
    if (!todo) return { message: i18n.t('todo.notFound', { lang: lang || undefined }) };
    return { message: i18n.t('todo.found', { lang: lang || undefined }), data: todo };
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: TodoListDto,
    @I18n() i18n: I18nContext,
    @Headers('accept-language') lang?: string,
  ) {
    const todo = this.todoService.update(+id, dto.title, dto.description);
    if (!todo) return { message: i18n.t('todo.notFound', { lang: lang || undefined }) };
    return { message: i18n.t('todo.updated', { lang: lang || undefined }), data: todo };
  }

  @Delete(':id')
  delete(
    @Param('id') id: string,
    @I18n() i18n: I18nContext,
    @Headers('accept-language') lang?: string,
  ) {
    const todo = this.todoService.delete(+id);
    if (!todo) return { message: i18n.t('todo.notFound', { lang: lang || undefined }) };
    return { message: i18n.t('todo.deleted', { lang: lang || undefined }), data: todo };
  }
}
