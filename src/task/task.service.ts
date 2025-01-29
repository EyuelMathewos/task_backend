import { Injectable, Logger } from '@nestjs/common';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    private readonly httpService: HttpService,
    private readonly logger: Logger,
  ) {}
  async createTask(createUserInput: CreateTaskInput) {
    try {
      const taskId = uuidv4(); // Generate a UUID for the task
      const response = await this.httpService
        .post('/todo-8f4cc/us-central1/api/tasks', {
          id: taskId,
          title: createUserInput.title,
          description: createUserInput.description,
          status: createUserInput.status,
        })
        .toPromise();

      await this.prisma.task.create({
        data: {
          id: response?.data?.id,
          title: createUserInput.title,
          description: createUserInput.description,
          status: createUserInput.status,
        },
      });
      this.logger.log('Task created successfully', response?.data);
      return response?.data;
    } catch (error) {
      this.logger.log('When creating Task  error occured', error);
      throw error;
    }
  }

  async findAllTasks({
    page,
    limit,
    status,
  }: {
    page: string;
    limit: string;
    status: string;
  }) {
    const response = await this.httpService
      .get(
        status
          ? `/todo-8f4cc/us-central1/api/tasks?page=${page}&limit=${limit}`
          : `/todo-8f4cc/us-central1/api/tasks?status=${status}&page=${page}&limit=${limit}`,
      )
      .toPromise();
    this.logger.log(
      status
        ? `Task pagination and filtering by status.`
        : `Task pagination and filtering`,
      response?.data,
    );
    return response?.data;
  }

  async updateTask(taskId: string, data: any) {
    const response: any = await this.httpService
      .put(`/todo-8f4cc/us-central1/api/tasks/${taskId}`, data)
      .toPromise();
    await this.prisma.task.update({
      data: {
        ...data,
      },
      where: { id: taskId },
    });
    this.logger.log('Task updated successfully', response?.data, taskId, data);
    return response?.data;
  }

  async deleteTask(taskId: string) {
    try {
      const response: any = await this.httpService
        .delete(`/todo-8f4cc/us-central1/api/tasks/${taskId}`)
        .toPromise();
      console.log(response);
      this.logger.log('Task deleted successfully', response?.data, taskId);
      await this.prisma.task.delete({ where: { id: taskId } });
      return true;
    } catch (error) {
      this.logger.log('When Deleting Task  error occured', error);
      return false;
    }
  }
}
