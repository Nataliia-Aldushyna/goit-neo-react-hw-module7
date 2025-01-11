import { useSelector, useDispatch } from 'react-redux'; 
import styles from './ContactList.module.css';
import Contact from '../Contact/Contact';
import { deleteContact, selectContacts } from '../../redux/contactsSlice'; 
import { selectNameFilter } from '../../redux/filtersSlice'; 

const ContactList = () => {
  const contacts = useSelector(selectContacts); 
  const filter = useSelector(selectNameFilter); 
  const dispatch = useDispatch(); 

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handleDeleteContact = (id) => {
    dispatch(deleteContact(id)); 
  };

  return (
    <ul className={styles.list}>
      {filteredContacts.length > 0 ? ( 
        filteredContacts.map(({ id, name, number }) => (
          <Contact
            key={id}
            id={id} 
            name={name}
            number={number}
            onDelete={() => handleDeleteContact(id)} 
          />
        ))
      ) : (
        <p className={styles.noContacts}>Contacts not found!</p>
      )}
    </ul>
  );
};

export default ContactList;
