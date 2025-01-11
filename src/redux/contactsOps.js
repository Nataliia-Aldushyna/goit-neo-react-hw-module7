import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = 'https://6707c43e8e86a8d9e42cd4c7.mockapi.io'; 

const fetchContacts = createAsyncThunk(
    'contacts/fetchAll',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('/contacts');
            return response.data;          
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
); 

 const addContact = createAsyncThunk(
    'contacts/addContact',
    async (contactData, thunkAPI) => {
        try {
            const response = await axios.post('/contacts', contactData);
            return response.data;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }   
    }
);

 const deleteContact = createAsyncThunk(
    'contacts/deleteContact',
    async (contactID, thunkAPI) => {
        try {
            const response = await axios.delete(`/contacts/${contactID}`);
            return response.data.id
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message)
        }
    }
);


export { fetchContacts, addContact, deleteContact };