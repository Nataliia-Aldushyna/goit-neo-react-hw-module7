import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux'; 
import { addContact } from '../../redux/contactsOps'; 
import { toast } from 'react-toastify';  
import styles from "./ContactForm.module.css";

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),
  number: Yup.string()
    .required("Number is required")
    .matches(/^\d{3}-\d{2}-\d{2}$/, "Number must match format: 123-45-67"),
});

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector((state) => state.contacts.items);

  const handleSubmit = (values, { resetForm }) => {
    const isDuplicate = contacts.some(
      (contact) => 
        contact.name.toLowerCase() === values.name.toLowerCase() || 
        contact.number === values.number
    );

    if (isDuplicate) {
      toast.error(`Contact with name "${values.name}" or number "${values.number}" already exists.`);
      return;
    }

    const newContact = {
      name: values.name,
      number: values.number,
    };

    dispatch(addContact(newContact))
      .unwrap() 
      .then(() => {
        resetForm(); 
        toast.success("Contact added successfully!"); 
      })
      .catch((error) => {
        toast.error(`Failed to add contact: ${error.message}`); 
      });
  };

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={validationSchema} 
      onSubmit={handleSubmit} 
    >
      {() => (
        <Form className={styles.form}>
          <label className={styles.label}>
            Name
            <Field name="name" placeholder="Enter name" className={styles.input} />
            <ErrorMessage name="name" component="div" className={styles.error} />
          </label>
          <label className={styles.label}>
            Number
            <Field
              name="number"
              placeholder="Enter number (e.g. 123-45-67)"
              className={styles.input}
            />
            <ErrorMessage name="number" component="div" className={styles.error} />
          </label>
          <button type="submit" className={styles.button}>
            Add Contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
