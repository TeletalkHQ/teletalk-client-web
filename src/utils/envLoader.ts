import dotenv from "dotenv";

export const evnLoader = () => {
  [
    "./configs/env/base.env",
    `./configs/env/${process.env.NODE_ENV}.env`,
  ].forEach((path) => {
    dotenv.config({
      path,
      override: true,
    });
  });
};
