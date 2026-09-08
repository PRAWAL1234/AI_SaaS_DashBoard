import { useApi } from "@/API/useAPI";

export const useResume = () => {
   const {baseApi} = useApi();
  const uploadResume = async (userId: number, fileName: string, resumeData: FormData | string) => {
    let body: FormData;
    if (resumeData instanceof FormData) {
      body = resumeData;
    } else {
      body = new FormData();
      body.append("resume_text", resumeData);
    }
    if (fileName && !body.has("fileName")) {
      body.append("fileName", fileName);
    } else if (!body.has("fileName")) {
      body.append("fileName", "resume.txt");
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