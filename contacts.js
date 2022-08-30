import { promises } from "fs";
import path from "path";
const contactsPath = path.resolve("./db/contacts.json");

export async function listContacts() {
  try {
    const contacts = await promises.readFile(contactsPath, "utf-8");
    console.table(JSON.parse(contacts));
  } catch (error) {
    console.log(error);
  }
}

export async function getContactById(contactId) {
  try {
    const contacts = await promises.readFile(contactsPath, "utf-8");
    const contact = JSON.parse(contacts).find(({ id }) => id === contactId);
    console.log(contact);
  } catch (error) {
    console.log(error);
  }
}

export async function removeContact(contactId) {
  try {
    const contacts = await promises.readFile(contactsPath, "utf-8");
    const filteredContacts = JSON.parse(contacts).filter(
      ({ id }) => id !== contactId
    );
    const updatedContacts = await promises.writeFile(
      contactsPath,
      JSON.stringify(filteredContacts),
      "utf-8"
    );
    console.table(filteredContacts);
  } catch (error) {
    console.log(error);
  }
}

export async function addContact(name, email, phone) {
  try {
    const contacts = await promises.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    const newContact = {
      id: String(parsedContacts.length + 2),
      name,
      email,
      phone,
    };
    const updatedContacts = [...parsedContacts, newContact];
    await promises.writeFile(
      contactsPath,
      JSON.stringify(updatedContacts),
      "utf-8"
    );
    console.table(updatedContacts);
  } catch (error) {
    console.log(error);
  }
}
