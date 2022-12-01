const handleAddNewContact = (payload, prevState) => {
  return {
    contacts: [...prevState.contacts, payload.newContact],
  };
};

const handleUpdateAllContacts = (payload) => {
  return {
    contacts: payload.contacts,
  };
};

const userReducerHandlers = {
  handleAddNewContact,
  handleUpdateAllContacts,
};

export { userReducerHandlers };
