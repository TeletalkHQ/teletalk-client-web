import {
  BlacklistItem,
  Contacts,
  Countries,
  CountryCode,
  CountryName,
  MessageItem,
  Participants,
  PrivateChatItem,
  PrivateChats,
  UserState,
} from ".";

export interface CreateNewUser {
  input: { firstName: string; lastName: string };
  output: {};
}

export interface Logout {
  input: {};
  output: {};
}

export interface SignIn {
  input: {
    countryCode: string;
    countryName: string;
    phoneNumber: string;
  };
  output: {};
}

export interface Verify {
  input: { verificationCode: string };
  output: { newUser: boolean };
}

export interface GetCountries {
  input: {};
  output: { countries: Countries };
}

export interface GetStuff {
  input: {};
  output: {};
}

export interface GetWelcomeMessage {
  input: {};
  output: { welcomeMessage: string };
}
export interface Ping {
  input: {};
  output: {};
}

export interface GetChatInfo {
  input: { chatId: string };
  output: {
    chatId: string;
    createdAt: number;
    participants: Participants;
  };
}

export interface GetPrivateChat {
  input: { chatId: string };
  output: { privateChat: PrivateChatItem };
}

export interface GetPrivateChats {
  input: {};
  output: { privateChats: PrivateChats };
}

export interface JoinRoom {
  input: {};
  output: {};
}

export interface SendPrivateMessage {
  input: { messageText: string; participantId: string };
  output: {
    chatId: string;
    newMessage: MessageItem;
  };
}

export interface AddBlock {
  input: { userId: string };
  output: { blockedUser: BlacklistItem };
}

export interface AddContact {
  input: { firstName: string; lastName: string; userId: string };
  output: {
    addedContact: { firstName: string; lastName: string; userId: string };
  };
}

export interface AddContactWithCellphone {
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

export interface EditContact {
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

export interface GetContacts {
  input: {};
  output: {
    contacts: Contacts;
  };
}

export interface GetUserData {
  input: {};
  output: {
    user: UserState;
  };
}

export interface GetPublicUserData {
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

export interface RemoveBlock {
  input: { userId: string };
  output: { removedBlock: { userId: string } };
}

export interface RemoveContact {
  input: { userId: string };
  output: { removedContact: { userId: string } };
}

export interface UpdatePublicUserData {
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
