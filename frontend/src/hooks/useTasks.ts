import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Toast } from '../components/ui/toast';
import { taskService } from '../services/task.service';
import { Task, CreateTaskDTO  } from '../types/task.types';

export const useTasks = (groupId: string, assigneeId: string) => {
  const queryClient = useQueryClient();

  // Fetch tasks for a group
  const { data: groupTasks, isLoading: isGroupTasksLoading, error: groupTasksError } = useQuery<Task[]>({
    queryKey: ['groupTasks', groupId],
    queryFn: () => taskService.getGroupTasks(groupId),
    enabled: !!groupId,
  });

  // Fetch tasks for a user
  const { data: userTasks, isLoading: isUserTasksLoading, error: userTasksError } = useQuery<Task[]>({
    queryKey: ['userTasks', assigneeId],
    queryFn: () => taskService.getGroupTasks(groupId),
    enabled: !!assigneeId,
  });

  // Create task mutation
  const createTaskMutation = useMutation({
    mutationFn: (taskData: CreateTaskDTO) => taskService.createTask(taskData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', groupId] });
      Toast({
        title: 'Task Created'
      });
    },
    onError: (error) => {
      Toast({
        title: 'Error',
        variant: 'destructive'
      });
    },
  });

  // Update task mutation
  // const updateTaskMutation = useMutation({
  //   mutationFn: (data: { id: string, taskData: UpdateTaskDTO }) => 
  //     taskService.updateTask(data.id, data.taskData),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ['tasks', groupId] });
  //     Toast({
  //       title: 'Task Updated',
  //     });
  //   },
  //   onError: () => {
  //     Toast({
  //       title: 'Error',
  //       variant: 'destructive',
  //     });
  //   },
  // });

  // Complete task mutation
const completeTaskMutation = useMutation({
  mutationFn: (taskId: string) => taskService.completeTask(taskId),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['tasks', groupId] });
    Toast({
      title: 'Task Completed',
      variant: 'default', 
    });
  },
  onError: () => {
    Toast({
      title: 'Error',
      variant: 'destructive', 
    });
  },
});


  return {
    groupTasks,
    userTasks,
    isGroupTasksLoading,
    isUserTasksLoading,
    groupTasksError,
    userTasksError,
    createTask: createTaskMutation.mutate,
    //updateTask: updateTaskMutation.mutate,
    completeTask: completeTaskMutation.mutate,
  };
};