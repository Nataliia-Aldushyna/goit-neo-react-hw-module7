import { useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/selectors.js';
import Contact from '../Contact/Contact.jsx';
import css from './ContactList.module.css';

const ContactList = () => {
  const filteredContacts = useSelector(selectFilteredContacts);

  return (
    <div className={css.contactList}>
      <ul className={css.list}>
        {filteredContacts.map(contact => (
          <Contact
            key={contact.id}
            id={contact.id}
            name={contact.name}
            number={contact.number}
          />
        ))}
      </ul>
      {!filteredContacts.length && (
        <p className={css.noContacts}>No contacts found</p>
      )}
    </div>
  );
};

export default ContactList;
