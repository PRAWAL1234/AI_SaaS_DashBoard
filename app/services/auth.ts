import { useApi } from "@/API/useAPI";
import axios from "axios";

export default function useLogin(){

    const {baseApi} = useApi();


    const login = async (body: any) => {
        const { data } = await baseApi().post(`/auth/login`, body);
        return data;
    };

    const signUp = async (body: any) => {
        const { data } = await baseApi().post(`/auth/user/creation`, body);
        return data;
    };

    return {login, signUp};
}