import { customAxios } from "functions/utilities/customAxios";

const requester = async (options) => {
  try {
    const response = await customAxios(options);

    return response;
  } catch (error) {
    console.log("requester catch, error:", error);
    throw error;
  }
};

export { requester };
