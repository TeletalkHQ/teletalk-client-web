import jwtDecode from "jwt-decode";

import {
  errorThrower,
  printCatchError,
} from "functions/utilities/otherUtilities";

const tokenDecoder = (token) => {
  try {
    errorThrower(!token, "Yo, you forgot to send me token!");

    const decodedToken = jwtDecode(token);

    errorThrower(!decodedToken, "Token malformed!");

    return decodedToken;
  } catch (error) {
    printCatchError(tokenDecoder.name, error);
    throw error;
  }
};

export { tokenDecoder };
