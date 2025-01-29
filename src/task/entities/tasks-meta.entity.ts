import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Task } from './task.entity'; // Assuming Task is already defined elsewhere

@ObjectType()
export class TasksWithMeta {
  @Field(() => Int)
  currentPage: number;

  @Field(() => Int)
  totalItems: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => [Task])
  tasks: Task[];
}
