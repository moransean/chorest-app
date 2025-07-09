import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Toast } from '../components/ui/toast';
import { groupService } from '../services/group.service';
import { Group, CreateGroupDto } from '../types/group.types';

export const useGroups = () => {
  const queryClient = useQueryClient();

  // Fetch groups
  const { data: groups, isLoading, error, refetch: refetchGroups } = useQuery<Group[]>({
    queryKey: ['groups'],
    queryFn: () => groupService.getGroups(),
  });

  // Create group mutation
  const createGroupMutation = useMutation({
    mutationFn: (groupData: CreateGroupDto) => groupService.createGroup(groupData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
      Toast({
        title: 'Group Created',
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

  // Join group mutation
//   const joinGroupMutation = useMutation({
//     mutationFn: (groupCode: string) => groupService.joinGroup(groupCode),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['groups'] });
//       toast({
//         title: 'Group Joined',
//         description: 'You have successfully joined the group.',
//       });
//     },
//     onError: () => {
//       toast({
//         title: 'Error',
//         description: 'Failed to join group.',
//         variant: 'destructive',
//       });
//     },
//   });

  return {
    groups,
    refetchGroups,
    isLoading,
    error,
    createGroup: createGroupMutation.mutate,
    // joinGroup: joinGroupMutation.mutate,
  };
};