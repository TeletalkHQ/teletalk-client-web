import { Extractor as ExtractorMain } from "utility-store";

import { ExtendedUserState, UserState } from "~/types";

export class Extractor extends ExtractorMain {
  userState(data: ExtendedUserState): UserState {
    return {
      ...super.cellphone(data),
      ...super.fullName(data),
      bio: data.bio,
      createdAt: data.createdAt,
      status: data.status,
      userId: data.userId,
      username: data.username,
    };
  }
}

export const extractor = new Extractor();
