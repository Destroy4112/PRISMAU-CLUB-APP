import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const appQueryClient = new QueryClient();
export const useAppQueryClient = useQueryClient;
export const useAppQuery = useQuery;
export const useAppMutation = useMutation;