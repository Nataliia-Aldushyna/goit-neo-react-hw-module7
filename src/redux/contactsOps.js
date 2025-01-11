import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = 'https://6782b65ec51d092c3dd088d6.mockapi.io'; 

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts'); 
      return response.data; 
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message); 
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contactData, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', contactData); 
      return response.data;  
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);  
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactID, thunkAPI) => {
    try {
      await axios.delete(`/contacts/${contactID}`); 
      return contactID; 
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message); 
    }
  }
);
