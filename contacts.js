/*Импорт*/

const fs = require("fs/promises");

const path = require("path");
console.log(__dirname);
const { nanoid } = require("nanoid");
const contactsPath = path.join(__dirname, "db/contacts.json");
console.log(contactsPath);

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(contacts);
};
const getContactById = async (id) => {
  const contacts = await listContacts();

  const result = contacts.find((item) => item.id === String(id));
  console.log(result);
  return result || null;
};

const addContact = async ({ id, name, phone, email }) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
