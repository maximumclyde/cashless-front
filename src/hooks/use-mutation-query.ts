import { useToast } from "@/hooks/use-toast";
import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
  DefaultError,
} from "@tanstack/react-query";

interface MutationOptions<Response, TVariables = unknown>
  extends UseMutationOptions<Response, DefaultError, TVariables> {
  successToastOptions?: { title: string; description: string };
  errorToastOptions?: { title: string; description: string };
  queryKeys: unknown[];
  autoUpdateData?: boolean;
}

export function useMutationQuery<Response, TVariables>(
  options = {} as MutationOptions<Response, TVariables>
) {
  const client = useQueryClient();
  const { toast } = useToast();

  const {
    mutationFn,
    successToastOptions,
    errorToastOptions,
    queryKeys,
    autoUpdateData,
    ...rest
  } = options;

  const mutation = useMutation({
    mutationFn: mutationFn,
    onSuccess(data) {
      if (autoUpdateData) {
        client.setQueryData(queryKeys, data);
      }

      if (successToastOptions) {
        toast({
          variant: "default",
          title: successToastOptions.title,
          description: successToastOptions.description,
        });
      }
    },
    onError(error) {
      console.log("Operation error: ", error);
      if (errorToastOptions) {
        toast({
          variant: "destructive",
          title: errorToastOptions.title,
          description: errorToastOptions.description,
        });
      }
    },
    ...rest,
  });

  return mutation;
}
