export const addContact = (id, name, number) => ({
  type: "phonebook/addContact",
  payload: {
    id,
    name,
    number,
  },
});

export const deleteContact = (contactId) => ({
  type: "phonebook/deleteContact",
  payload: contactId,
});
