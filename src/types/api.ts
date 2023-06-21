import {
  BlacklistItem,
  Contacts,
  Countries,
  CountryCode,
  CountryName,
  MessageItem,
  NativeError,
  Participants,
  PrivateChatItem,
  PrivateChats,
  UserState,
} from ".";

export type SocketResponseErrors = NativeError[];

export type IO = {
  input: {};
  output: {};
};

export interface SocketResponse<Data = IO["output"]> {
  data: Data;
  errors?: SocketResponseErrors;
  ok: boolean;
}

export type ResponseCallback<Data = IO["output"]> = (
  response: SocketResponse<Data>
) => Promise<Data>;

export type RequestTransformer<Data = IO["input"]> = (
  requestData: Data
) => Data;

export type ResponseTransformer<DataType = IO["output"]> = (
  response: SocketResponse<DataType>
) => SocketResponse<DataType>;

export type Interceptor<Data> = (data: Data) => Data;

export type Interceptors<Data = IO["input"] | IO["output"]> =
  Interceptor<Data>[];

export interface CreateNewUserIO {
  input: { firstName: string; lastName: string };
  output: {};
}

export interface LogoutIO {
  input: {};
  output: {};
}

export interface SignInIO {
  input: {
    countryCode: string;
    countryName: string;
    phoneNumber: string;
  };
  output: {
    mmd: number;
  };
}

export interface VerifyIO {
  input: { verificationCode: string };
  output: { newUser: boolean };
}

export interface GetCountriesIO {
  input: {};
  output: { countries: Countries };
}

export interface GetStuffIO {
  input: {};
  output: {};
}

export interface GetWelcomeMessageIO {
  input: {};
  output: { welcomeMessage: string };
}
export interface PingIO {
  input: {};
  output: {};
}

export interface GetChatInfoIO {
  input: { chatId: string };
  output: {
    chatId: string;
    createdAt: number;
    participants: Participants;
  };
}

export interface GetPrivateChatIO {
  input: { chatId: string };
  output: { privateChat: PrivateChatItem };
}

export interface GetPrivateChatsIO {
  input: {};
  output: { privateChats: PrivateChats };
}

export interface JoinRoomIO {
  input: {};
  output: {};
}

export interface SendPrivateMessageIO {
  input: { messageText: string; participantId: string };
  output: {
    chatId: string;
    newMessage: MessageItem;
  };
}

export interface AddBlockIO {
  input: { userId: string };
  output: { blockedUser: BlacklistItem };
}

export interface AddContactIO {
  input: { firstName: string; lastName: string; userId: string };
  output: {
    addedContact: { firstName: string; lastName: string; userId: string };
  };
}

export interface AddContactWithCellphoneIO {
  input: {
    countryCode: CountryCode;
    countryName: CountryName;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    userId: string;
  };
  output: {
    addedContact: {
      countryCode: CountryCode;
      countryName: CountryName;
      firstName: string;
      lastName: string;
      phoneNumber: string;
      userId: string;
    };
  };
}

export interface EditContactIO {
  input: {
    firstName: string;
    lastName: string;
    userId: string;
  };
  output: {
    editedContact: {
      firstName: string;
      lastName: string;
      userId: string;
    };
  };
}

export interface GetContactsIO {
  input: {};
  output: {
    contacts: Contacts;
  };
}

export interface UserDataOutput extends UserState {
  contacts: Contacts;
}

export interface GetUserDataIO {
  input: {};
  output: {
    user: UserDataOutput;
  };
}

export interface GetPublicUserDataIO {
  input: { userId: string };
  output: {
    publicUserData: {
      firstName: string;
      lastName: string;
      bio: string;
      userId: string;
      username: string;
    };
  };
}

export interface RemoveBlockIO {
  input: { userId: string };
  output: { removedBlock: { userId: string } };
}

export interface RemoveContactIO {
  input: { userId: string };
  output: { removedContact: { userId: string } };
}

export interface UpdatePublicUserDataIO {
  input: {
    firstName: string;
    lastName: string;
    bio: string;
    username: string;
  };
  output: {
    publicUserData: {
      firstName: string;
      lastName: string;
      bio: string;
      status: { isActive: boolean };
      userId: string;
      username: string;
    };
  };
}
