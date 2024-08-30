import useSWRMutation from "swr/mutation";
import { AxiosError } from "axios";

import { getFetcher, postFetcher } from "@/lib/fetch";
import { UserResponse } from "@repo/schema";

const url = "http://localhost:8080/api/users";

const fetcher = async (url: string) => {
  try {
    const res = await getFetcher<UserResponse[]>(url);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const createFetcher = async (url: string) => {
  try {
    const res = await postFetcher<UserResponse, UserResponse>(url, {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
    });
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export function useUser() {
  const {
    data: userData,
    trigger: fetchUser,
    isMutating,
    error,
  } = useSWRMutation(url, fetcher, {
    onSuccess: (data) => {
      console.log("success", data);
    },
    onError(err, key, config) {
      console.log("error", err);
    },
  });

  const { data: createUserData, trigger: createUser } = useSWRMutation(
    url,
    createFetcher,
    {
      onSuccess: (data) => {
        console.log("success", data);
      },
      onError(err, key, config) {
        console.log("error", err);
      },
    },
  );

  return {
    userData,
    fetchUser,
    isMutating,
    error,
    createUserData,
    createUser,
  };
}
