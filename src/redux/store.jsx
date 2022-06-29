import { createStore } from "redux";

const initialState = JSON.parse(window.localStorage.getItem("contacts")) ?? [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];
const reducer = (state = { contacts: initialState }, { type, payload }) => {
  switch (type) {
    case "phonebook/addContact":
      let isNameAlreadyExists = state.contacts.find(
        (element) => element.name === payload.name
      );
      if (isNameAlreadyExists) {
        alert(`${payload.name} is already in contacts`);
        return;
      }
      return { contacts: [...state.contacts, payload] };

    case "phonebook/deleteContact":
      return {
        contacts: [state.contacts.filter((contact) => contact.id !== payload)],
      };

    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
