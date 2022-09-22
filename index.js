// const fs = require("fs").promises;
const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const contacts = require("./contacts");

// TODO: задокументировать каждую функцию

const invokeAction = async ({ action, name, id, phone, email }) => {
  const contactId = String(id);
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.log(allContacts);
      break;

    case "get":
      const oneContact = await contacts.getContactById(contactId);
      console.log(oneContact);
      break;
    case "add":
      const newContact = await contacts.addContact({
        id,
        name,
        email,
        phone,
      });
      console.log(newContact);
      break;

    case "remove":
      const removeContact = await contacts.removeContact(contactId);
      console.log(removeContact);
      break;

    default:
      console.log("Unknown action");
  }
};

/*Экспорт*/
// module.exports = contacts;

// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "6" });
// invokeAction({
//   action: "add",
//   name: "Anna Pavlova",
//   email: "scelerisque@magnis.org",
//   phone: "(222) 222-2688",
// });
// invokeAction({ action: "list" });
// invokeAction({ action: "remove", id: "P3hpdPYphGoSnhsepD7NP" });

console.log(process.argv);
const actionIndex = process.argv.indexOf("--action");
if (actionIndex !== -1) {
  const action = process.argv[actionIndex + 1];
  invokeAction({ action });
}

const arr = hideBin(process.argv);
const { argv } = yargs(arr);
console.log(argv);
