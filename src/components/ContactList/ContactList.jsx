import { useSelector, useDispatch } from 'react-redux';
import { selectNameFilter } from '../../redux/filtersSlice'; 
import { deleteContact } from '../../redux/contactsOps'; 
import Contact from '../Contact/Contact'; 
import styles from './ContactList.module.css'; 

const ContactList = () => {
  const dispatch = useDispatch();

  const filter = useSelector(selectNameFilter) || ''; 
  const contacts = useSelector((state) => state.contacts.items) || []; 
  const loading = useSelector((state) => state.contacts.loading); 
  const error = useSelector((state) => state.contacts.error); 


  const filteredContacts = contacts.filter((contact) =>
    contact.name?.toLowerCase().includes(filter.toLowerCase())
  );
  
  const handleDelete = (id) => {
    dispatch(deleteContact(id)); 
  };

  return (
    <div className={styles.contactList}>
      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}
      {filteredContacts.length > 0 ? (
        <ul className={styles.list}>
          {filteredContacts.map((contact) => (
            <Contact
              key={contact.id}
              id={contact.id}
              name={contact.name}
              number={contact.number}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      ) : (
        <p className={styles.noContacts}>No contacts found</p>
      )}
    </div>
  );
};

export default ContactList;
