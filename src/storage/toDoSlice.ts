import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ListItem {
  id: number;
  name: string;
  isChecked: boolean;
}

interface SearchState {
  list: ListItem[];
}

const initialState: SearchState = {
  list: [],
};

const list = createSlice({
  name: 'list',
  initialState,
  reducers: {
    setList(state, action: PayloadAction<ListItem[]>) {
      state.list = action.payload;
      localStorage.setItem('list', JSON.stringify(action.payload));
    },
    addToList(state, action: PayloadAction<ListItem>) {
      state.list.push(action.payload);
      localStorage.setItem('list', JSON.stringify(state.list));
    },
    toggleElemInList(state, action: PayloadAction<number>) {
      const item = state.list.find(item => item.id === action.payload);
      if (item) {
        item.isChecked = !item.isChecked;
        localStorage.setItem('list', JSON.stringify(state.list));
      }
    },
    removeFromList(state, action: PayloadAction<number>) {
      state.list = state.list.filter(item => item.id !== action.payload);
      localStorage.setItem('list', JSON.stringify(state.list));
    },
    removeDone(state) {
      state.list = state.list.filter(item => !item.isChecked);
      localStorage.setItem('list', JSON.stringify(state.list));
    },
  },
});

export const { setList, addToList, removeFromList, toggleElemInList, removeDone } = list.actions;
export default list.reducer;
