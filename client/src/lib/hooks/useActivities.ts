import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'react-router';
import agent from '../api/agent';
import { useAccount } from './useAccount';

export const useActivities = (id?: string) => {
  const queryClient = useQueryClient();
  const { currentUser } = useAccount();
  const location = useLocation();

  const { data: activities, isLoading: activitiesLoading } = useQuery({
    queryKey: ['activities'],
    queryFn: async () => {
      const response = await agent.get<Activity[]>('/activities');
      return response.data;
    },
    enabled: !id && location.pathname === '/activities' && !!currentUser,
  });

  const { data: activity, isLoading } = useQuery({
    queryKey: ['activities', id],
    queryFn: async () => {
      const response = await agent.get<Activity>(`/activities/${id}`);
      return response.data;
    },
    enabled: !!id && !!currentUser,
  });

  const updateActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      await agent.put('/activities', activity);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['activities'],
      });
    },
  });

  const createActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      const res = await agent.post('/activities', activity);
      return res.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['activities'],
      });
    },
  });

  const deleteActivity = useMutation({
    mutationFn: async (id: string) => {
      await agent.delete(`/activities/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['activities'],
      });
    },
  });

  return {
    activities,
    activitiesLoading,
    updateActivity,
    createActivity,
    deleteActivity,
    activity,
    isLoading,
  };
};
