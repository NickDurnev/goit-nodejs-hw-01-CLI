import { promises } from "fs";
import path from "path";
const contactsPath = path.resolve("./db/contacts.json");

export function listContacts() {
  promises
    .readFile(contactsPath, "utf-8")
    .then((data) => console.table(JSON.parse(data)))
    .catch((err) => console.log(err));
}

export function getContactById(contactId) {
  promises
    .readFile(contactsPath, "utf-8")
    .then((data) => {
      const parsedData = JSON.parse(data);
      const contact = parsedData.find(({ id }) => id === contactId);
      console.log(contact);
    })
    .catch((err) => console.log(err));
}

export function removeContact(contactId) {
  promises
    .readFile(contactsPath, "utf-8")
    .then((data) => {
      const parsedData = JSON.parse(data);
      const filteredContacts = parsedData.filter(({ id }) => id !== contactId);
      return filteredContacts;
    })
    .then((contacts) =>
      promises.writeFile(contactsPath, JSON.stringify(contacts), "utf-8")
    )
    .then(() => {
      const contacts = promises.readFile(contactsPath, "utf-8");
      return contacts;
    })
    .then((contacts) => {
      console.table(JSON.parse(contacts));
    })
    .catch((err) => console.log(err));
}

export function addContact(name, email, phone) {
  promises
    .readFile(contactsPath, "utf-8")
    .then((data) => {
      const parsedData = JSON.parse(data);
      const newContact = {
        id: String(parsedData.length + 1),
        name,
        email,
        phone,
      };
      const contacts = [...parsedData, newContact];
      return contacts;
    })
    .then((contacts) =>
      promises.writeFile(contactsPath, JSON.stringify(contacts), "utf-8")
    )
    .then(() => {
      const contacts = promises.readFile(contactsPath, "utf-8");
      return contacts;
    })
    .then((contacts) => {
      console.table(JSON.parse(contacts));
    })
    .catch((err) => console.log(err));
}
