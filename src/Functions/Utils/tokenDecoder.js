import jwtDecode from "jwt-decode";

const tokenDecoder = ({ token }) => {
  try {
    if (!token) {
      const error = "Yo, you forgot to send me token!";
      throw error;
    }

    const decodedToken = jwtDecode(token);

    if (!decodedToken) {
      const error = "Token malformed!";
      throw error;
    }

    return { decodedToken };
  } catch (error) {
    logger.log("tokenDecoder catch", error);
    throw error;
  }
};

export { tokenDecoder };
