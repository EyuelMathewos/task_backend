import { Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { TaskResolver } from './task/task.resolver';
import { TaskService } from './task/task.service';
import { TaskModule } from './task/task.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    PrismaModule,
    HttpModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'), // Code-First schema generation
      sortSchema: true,
      installSubscriptionHandlers: true,
    }),
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService, TaskResolver, TaskService, Logger],
})
export class AppModule {}
