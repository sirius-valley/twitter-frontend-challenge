import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useHttpRequestService } from "../service/HttpRequestService";
import {ChatData, ChatDTO} from "../service";

export const useChat = () => {
  const queryClient = useQueryClient();
  const service = useHttpRequestService();

  // Obtener los chats
  const { data: chats, isLoading, isError } = useQuery<ChatDTO[]>({
    queryKey: ['chats'], // Usar un array como key
    queryFn: service.getChats,
    staleTime: 1000 * 60 * 5, // Los datos se consideran frescos por 5 minutos
  });

  // Crear un chat
  const { mutate: createChat } = useMutation({
    mutationFn: async ({ chatData, authorId }: { chatData: ChatData, authorId: string }) => {
      const newChat = await service.createChat(chatData);

      await service.joinChat(newChat.id);
      await service.joinUserToChat(newChat.id, authorId);

      return newChat;
    },
    onSuccess: (newChat: ChatDTO) => {
      queryClient.setQueryData<ChatDTO[]>(['chats'], (oldChats = []) => [...oldChats, newChat]);
    },
    onError: (error: any) => {
      console.error('Error creating chat:', error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ['chats']}).then();
    },
  });

  return {
    chats,
    isLoading,
    isError,
    createChat,
  };
};