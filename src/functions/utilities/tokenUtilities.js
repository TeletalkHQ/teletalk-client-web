import jwtDecode from "jwt-decode";

import { errorThrower } from "functions/utilities/otherUtilities";

const tokenDecoder = (token) => {
  try {
    errorThrower(!token, "Yo, you forgot to send me token!");

    const decodedToken = jwtDecode(token);

    errorThrower(!decodedToken, "Token malformed!");

    return decodedToken;
  } catch (error) {
    console.log("tokenDecoder catch", error);
    throw error;
  }
};

export { tokenDecoder };
