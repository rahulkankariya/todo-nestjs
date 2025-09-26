import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { I18nModule, QueryResolver, AcceptLanguageResolver } from 'nestjs-i18n';
import * as path from 'path';
console.log("Call First I8 Path",__dirname, '..', '/i18n');
@Module({
  imports: [TodoModule,
      I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '..', 'src/i18n'), // ✅ works for src & dist
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] }, // e.g. ?lang=hi
        AcceptLanguageResolver, // e.g. Accept-Language: en | hi
      ],
    }),



  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
