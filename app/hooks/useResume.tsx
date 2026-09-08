import {
  useMutation,
  useQuery,
  useQueryClient,
  useIsMutating,
} from "@tanstack/react-query";
import { useResume } from "../services/Resume";
import { useSyncUser } from "../store/userStore";
import { useResumeStore } from "../store/resumeStore";
import { App } from "antd";
type resumeResponse = {
  user_id: number;
  fileName: string;
  resume_text: string;
  overall_score: number;
  summary: string;
  keyword_gaps: string[];
  formatting_suggestions: string[];
  actionable_steps: string[];
  created_at?: string;
  updated_at?: string;
};
export const useResumeUpload = (fileName: string = "resume.txt") => {
  const queryClient = useQueryClient();
  const { message } = App.useApp();
  const { uploadResume, getResumeAnalysisData } = useResume();
  const { userId } = useSyncUser();
  const { currentAnalysis, setCurrentAnalysis, clearCurrentAnalysis } =
    useResumeStore();

  const isUploading = useIsMutating({ mutationKey: ["upload-resume"] }) > 0;

  const resumeMutation = useMutation({
    mutationKey: ["upload-resume"],
    mutationFn: async (data: any) => {
      return await uploadResume(userId as number, fileName!, data);
    },
    onSuccess: (data) => {
      message.success("Resume uploaded successfully.");
      const analysisData = data?.data || data;
      if (analysisData) {
        setCurrentAnalysis(analysisData);
      }
      queryClient.invalidateQueries({ queryKey: ["get-resume", userId] });
    },
    onError: (error: any) => {
      const errorMsg =
        error?.response?.data?.detail ||
        error?.message ||
        "Resume upload failed";
      message.error(errorMsg);
    },
  });

  const getResumeByUserId = useQuery({
    queryKey: ["get-resume", userId],
    queryFn: async () => {
      try {
        return await getResumeAnalysisData(userId as number);
      } catch (error: any) {
        message.error(
          error?.response?.data?.detail || "Failed to fetch resume data",
        );
      }
    },
    enabled: !!userId,
  });

  return {
    resumeMutation,
    isUploading: isUploading || resumeMutation.isPending,
    isSuccess: !!currentAnalysis,
    currentAnalysis,
    setCurrentAnalysis,
    clearCurrentAnalysis,
    getResumeByUserId,
  };
};
