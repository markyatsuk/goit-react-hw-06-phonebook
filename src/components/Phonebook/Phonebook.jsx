import { useState, useEffect } from "react";
import { Contacts } from "./Contacts";
import { nanoid } from "nanoid";
import { Section } from "./Section";
import { Form } from "./Form";
import { Filter } from "./Filter";
import { connect } from "react-redux";
import * as actions from "../../redux/actions";

function Phonebook({ contacts, addContact, deleteContact }) {
  const [filter, setFilter] = useState("");
  console.log("contacts: ", contacts);
  useEffect(() => {
    window.localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  // function addContact(name, number) {
  //   let isNameAlreadyExists = contacts.find((element) => element.name === name);
  //   if (isNameAlreadyExists) {
  //     alert(`${name} is already in contacts`);
  //     return;
  //   }
  //   setContacts((prevState) => {
  //     return [
  //       ...prevState,
  //       {
  //         name: name,
  //         id: nanoid(),
  //         number: number,
  //       },
  //     ];
  //   });
  // }

  function changeFilter(e) {
    setFilter(e.currentTarget.value);
  }

  function filterContacts() {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }
  console.log(filterContacts());
  // function deleteContact(contactId) {
  // setContacts((prevState) => {
  //   return prevState.filter((contact) => contact.id !== contactId);
  // });
  // }

  return (
    <div>
      <Section title="Phonebook">
        <Form onFormSubmit={addContact} />
      </Section>

      <Section title="Contacts">
        <Filter filterValue={filter} onChangeFilter={changeFilter} />
        <Contacts contacts={filterContacts()} onDeleteContact={deleteContact} />
      </Section>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    contacts: state.contacts,
  };
};

const mapDispathToProps = (dispatch) => {
  return {
    addContact: (name, number) =>
      dispatch(actions.addContact(nanoid(), name, number)),
    deleteContact: (contactId) => dispatch(actions.deleteContact(contactId)),
  };
};

export default connect(mapStateToProps, mapDispathToProps)(Phonebook);
