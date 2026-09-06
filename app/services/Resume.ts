import { useApi } from "@/API/useAPI";

export const useResume = () => {
   const {baseApi} = useApi();
  const uploadResume = async (userId: number, resumeData: FormData | string) => {
    let body: FormData;
    if (resumeData instanceof FormData) {
      body = resumeData;
    } else {
      body = new FormData();
      body.append("resume_text", resumeData);
    }
    const response = await baseApi().post(
      `/resume/uploadResume?user_id=${userId}`,
      body,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  };

  const getResumeAnalysisData = async (user_id: number | string) => {
    const response = await baseApi().get(`/resume/getResumeByUserId?user_id=${user_id}`);
    return response.data;
  };

  return { uploadResume, getResumeAnalysisData };
};