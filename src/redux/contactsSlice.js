import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from './contactsOps';

const initialState = {
  items: [],   
  loading: false,  
  error: null,   
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;  
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;  
        state.loading = false;   
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;   
        state.error = action.payload; 
      })
  
      .addCase(addContact.pending, (state) => {
        state.loading = true;  
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload); 
        state.loading = false; 
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;   
        state.error = action.payload;  
      })
      
      .addCase(deleteContact.pending, (state) => {
        state.loading = true;  
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(contact => contact.id !== action.payload);  
        state.loading = false;  
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;   
        state.error = action.payload; 
      });
  },
});

export default contactsSlice.reducer; 
