import { createContext, useState } from "react";
import { contact, ProviderProps, contactContext } from "src/ts";

export const ContactContext = createContext<contactContext | undefined>(
  undefined
);

export const ContactsProvider = ({ children }: ProviderProps) => {
  const [contactsList, setContactsList] = useState<contact[]>([]);
  const [name, setName] = useState("");

  const handleAddContact = (contact: contact) => {
    setContactsList((prevState) => {
      return [...prevState, contact];
    });
  };

  const contextValue = {
    contactsList: contactsList,
    addContact: handleAddContact,
    setUserName: setName,
    username: name,
  };

  return (
    <ContactContext.Provider value={contextValue}>
      {children}
    </ContactContext.Provider>
  );
};
