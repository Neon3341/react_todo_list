import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import TaskSingle from '@components/table/taskSingle';
import toDoReducer, { removeFromList, toggleElemInList } from '@storage/toDoSlice';

describe('TaskSingle', () => {
  const task = {
    id: 1,
    name: 'Test task',
    isChecked: false,
  };

  let store: ReturnType<typeof configureStore>;
  let dispatchSpy: jest.SpyInstance;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        list: toDoReducer   
      }
    });
    dispatchSpy = jest.spyOn(store, 'dispatch');
  });

  afterEach(() => {
    dispatchSpy.mockRestore();
  });

  test('Отображение задачи с текстом и кнопкой удаления', () => {
    render(
      <Provider store={store}>
        <TaskSingle task={task} />
      </Provider>
    );

    expect(screen.getByText('Test task')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /×/i })).toBeInTheDocument();
  });

  test('Отображение задачи с чекбоксом', () => {
    render(
      <Provider store={store}>
        <TaskSingle task={task} />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  test('Тест на удаление задачи', () => {
    render(
      <Provider store={store}>
        <TaskSingle task={task} />
      </Provider>
    );

    const deleteButton = screen.getByRole('button', { name: /×/i });
    fireEvent.click(deleteButton);

    expect(dispatchSpy).toHaveBeenCalledWith(removeFromList(task.id));
  });

  test('Тест на переключение состояния чекбокса', () => {
    render(
      <Provider store={store}>
        <TaskSingle task={task} />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(dispatchSpy).toHaveBeenCalledWith(toggleElemInList(task.id));
  });

  test('Чекбокс должен быть отмечен, если задача выполнена', () => {
    const completedTask = { ...task, isChecked: true };

    render(
      <Provider store={store}>
        <TaskSingle task={completedTask} />
      </Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });
});