##Task_Backend

#To Create Task

mutation {
  createTask(createTask: {
    title: "hiNew Task"
    description: "This is a new task."
    status: "IN_PROGRESS"
  }) {
    id
    title
    description
    status
  }
}

# Get Task Based on Pagenation & filtering
query {
  tasksWithMeta(page: "1", limit: "10", status: "IN_PROGRESS") {
    currentPage
    totalItems
    totalPages
    tasks {
      id
      title
      description
      status
      # createdAt
      # updatedAt
    }
  }
}

#update Task
mutation UpdateTask($taskId: String!, $updateTaskInput: UpdateTaskInput!) {
  updateTask(taskId: $taskId, updateTask: $updateTaskInput) {
    id
    title
    description
    status
  }
}

#Delete Task 

mutation DeleteTask($taskId: String!) {
  deleteTask(taskId: $taskId)
}

-> query Variables

{
  "taskId": "c3aae0c0-3ae9-4cdf-8f6a-0453ba47eff0"
}


