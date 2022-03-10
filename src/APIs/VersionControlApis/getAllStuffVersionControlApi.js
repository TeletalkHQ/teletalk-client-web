import { requester } from "~/Functions/Utils/requester";

const getAllStuffApi = async (data) => {
  try {
    const response = await requester({
      data,
      url: "/versionControl/getAllStuff",
    });
    return response;
  } catch (error) {
    console.log("getAllStuffVersionControlApi catch", error);
  }
};
export { getAllStuffApi };
