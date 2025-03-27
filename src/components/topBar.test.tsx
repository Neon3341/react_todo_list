
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ToDoTopBar from '@components/topBar';
import { Provider } from 'react-redux';
import store from "@storage/index.ts";
import { removeDone } from '@storage/toDoSlice';

describe('ToDoTopBar', () => {
    const renderWithProvider = (ui: React.ReactElement) => {
        return render(
            <Provider store={store}>
                {ui}
            </Provider>
        );
    };

    test('Отображение элементов интерфейса', () => {
        renderWithProvider(<ToDoTopBar />);

        expect(screen.getByPlaceholderText(/Сделать.../i)).toBeInTheDocument();
        expect(screen.getByText(/Добавить/i)).toBeInTheDocument();
        expect(screen.getByText(/Удалить выполненные/i)).toBeInTheDocument();
    });

    test('Добавление задачи', () => {
        renderWithProvider(<ToDoTopBar />);

        const input = screen.getByPlaceholderText(/Сделать.../i);
        const addButton = screen.getByText(/Добавить/i);

        fireEvent.change(input, { target: { value: 'Новая задача' } });
        fireEvent.click(addButton);

        expect(screen.getByDisplayValue(/Новая задача/i)).toBeInTheDocument();
    });

    test('Предупреждение при добавлении задачи с коротким названием', () => {
        window.alert = jest.fn(); // Mock alert
        renderWithProvider(<ToDoTopBar />);

        const input = screen.getByPlaceholderText(/Сделать.../i);
        const addButton = screen.getByText(/Добавить/i);

        fireEvent.change(input, { target: { value: 'A' } });
        fireEvent.click(addButton);

        expect(window.alert).toHaveBeenCalledWith('Введите хотя бы 2 символа');
    });
 
});