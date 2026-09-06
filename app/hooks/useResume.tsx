import {
  useMutation,
  useQuery,
  useQueryClient,
  useIsMutating,
} from "@tanstack/react-query";
import { useResume } from "../services/Resume";
import { useSyncUser } from "../store/userStore";
import { App } from "antd";

export const useResumeUpload = () => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  const { uploadResume, getResumeAnalysisData } = useResume();
  const { userId } = useSyncUser();

  const isUploading =
    useIsMutating({ mutationKey: ["upload-resume"] }) > 0;

  const resumeMutation = useMutation({
    mutationKey: ["upload-resume"],
    mutationFn: async (data: any) => {
      return await uploadResume(userId as number, data);
    },
    onSuccess: (data) => {
      console.log(data);
      message.success("Resume uploaded successfully.");
      queryClient.invalidateQueries({ queryKey: ["get-resume", userId] });
    },
    onError: (error: any) => {
      console.error(error);

      message.error(error?.message || "Resume upload failed");
    },
  });

  const getResumeByUserId = useQuery({
    queryKey: ["get-resume", userId],
    queryFn: async () => {
      return await getResumeAnalysisData(userId as number);
    },
    enabled: !!userId,
  });

  return {
    resumeMutation,
    isUploading: isUploading || resumeMutation.isPending,
    getResumeByUserId,
  };
};
