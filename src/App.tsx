import React from 'react';

import './App.css';
import ToDoTable from '@components/table';
import ToDoTopBar from '@components/topBar';

function App() {
  return (
    <div className="bg-teal-900 w-[100vw] h-[100vh] flex flex-col items-center justify-center text-white">
      <div className='flex flex-col justify-start md:flex-row sm:justify-center gap-x-6 gap-y-6 max-w-[750px] max-h-[700px] h-[80vh] w-[100vw] sm:w-auto sm:h-fit   px-5'>
        <header className="max-w-[320px] flex flex-col gap-y-8">
          <h1 className='text-5xl font-black'>ToDo List</h1>
          <ToDoTopBar />
        </header>
        <ToDoTable />
      </div>
    </div>
  );
}

export default App;
