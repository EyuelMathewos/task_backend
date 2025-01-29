import { Logger, Module } from '@nestjs/common';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import axios from 'axios'; // Import axios

// Create a custom Axios instance
const customAxiosInstance = axios.create({
  baseURL: 'http://localhost:5003',
  headers: {
    'Content-Type': 'application/json',
  },
});

@Module({
  imports: [HttpModule], // Import HttpModule
  providers: [
    TaskResolver,
    TaskService,
    PrismaService,
    HttpService,
    Logger,
    {
      provide: 'AXIOS_INSTANCE_TOKEN', // Provide the custom Axios instance
      useValue: customAxiosInstance,
    },
  ],
})
export class TaskModule {}
