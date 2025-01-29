import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { Task } from './entities/task.entity';
import { CreateTaskInput } from './dto/create-task.input';
import { PubSub } from 'graphql-subscriptions';
import { PrismaService } from 'src/prisma/prisma.service';
import { title } from 'process';
import { TasksWithMeta } from './entities/tasks-meta.entity';
import { UpdateTaskInput } from './dto/update-task.input';

const pubSub = new PubSub();
@Resolver()
export class TaskResolver {
  constructor(
    private prisma: PrismaService,
    private readonly taskService: TaskService,
  ) {}

  @Query(() => TasksWithMeta, { name: 'tasksWithMeta' })
  findAll(
    @Args('page', { type: () => String, nullable: true }) page: string,
    @Args('limit', { type: () => String, nullable: true }) limit: string,
    @Args('status', { type: () => String, nullable: true }) status: string,
  ) {
    return this.taskService.findAllTasks({ page, limit, status });
  }

  @Mutation(() => Task)
  async createTask(@Args('createTask') createTaskInput: CreateTaskInput) {
    const task = await this.taskService.createTask(createTaskInput);
    pubSub.publish('taskCreated', {
      taskCreated: { ...task },
    });
    return task;
  }

  @Subscription(() => Task, {
    resolve: async (payload, args, context) => {
      return payload.taskCreated;
    },
  })
  taskCreated() {
    return pubSub.asyncIterableIterator('taskCreated');
  }

  @Mutation(() => Task)
  async updateTask(
    @Args('updateTask') updateTaskInput: UpdateTaskInput,
    @Args('taskId', { type: () => String, nullable: true }) taskId: string,
  ): Promise<Task> {
    const updatedTask = await this.taskService.updateTask(
      taskId,
      updateTaskInput,
    );
    pubSub.publish('taskUpdated', { taskUpdated: updatedTask });
    return updatedTask;
  }

  @Subscription(() => Task, {
    resolve: async (payload) => {
      return payload.taskUpdated;
    },
  })
  taskUpdated() {
    return pubSub.asyncIterableIterator('taskUpdated');
  }

  @Mutation(() => Boolean)
  async deleteTask(@Args('taskId', { type: () => String }) taskId: string) {
    console.log('deleteTask');
    const task = await this.taskService.deleteTask(taskId);

    console.log({ removeUser: task });
    pubSub.publish('taskDeleted', { taskDeleted: taskId });
    return task;
  }

  @Subscription(() => Task, {
    resolve: async (payload) => {
      return payload.taskDeleted;
    },
  })
  taskDeleted() {
    return pubSub.asyncIterableIterator('taskDeleted');
  }
}
