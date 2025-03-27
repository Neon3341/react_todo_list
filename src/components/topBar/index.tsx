import ReduxProvider from "@components/reduxProvider";
import { useDispatch } from "react-redux";
import { useCallback, useState } from "react";

import { addToList, removeDone } from "@storage/toDoSlice";

export default function ToDoTopBar({ }) { 
    // Подобные конструкция при React нужна только единожды (в корне приложения), но по привычке пишу как на Next.js
    // (там нельзя просто взять и сделать один глобальный провайдер, тк layout там серверный компонент априори)

    return (
        <ReduxProvider>
            <ToDoTopBarInner />
        </ReduxProvider>
    )
}

function ToDoTopBarInner({ }) {
    const dispatch = useDispatch();
    const [value, setValue] = useState("Сделать ToDoList");

    const onCreate = useCallback(() => {
        if (value.length < 2) return alert("Введите хотя бы 2 символа");
        dispatch(addToList({ id: Date.now(), isChecked: false, name: value }));
    }, [value, dispatch]);

    
    const deleteDone = useCallback(() => { 
        dispatch(removeDone());
    }, [dispatch]);

    return (
        <div>
            <div className="flex flex-col">
                <label htmlFor="newTask">Введите новую задачу</label>
                <div className="flex">
                    <input placeholder="Сделать..." className="bg-teal-700 active:bg-teal-600 grow px-3 py-2 rounded-ss-xl rounded-es-xl" id="newTask" type="text" value={value} onChange={(e) => setValue(e.target.value)} ></input>
                    <button className="bg-teal-700 hover:bg-teal-600 px-3 py-2 border-l-2 border-white rounded-se-xl rounded-ee-xl" onClick={onCreate}>Добавить</button>
                </div>
            </div>
            <button onClick={deleteDone} className="mt-5 w-full border border-red-500 hover:border-red-700 transition-colors cursor-pointer py-2 rounded-2xl">Удалить выполненные</button>
            <div className="mt-5 w-full border border-emerald-700  py-2 px-5 rounded-2xl text-neutral-400 hover:text-white transition-colors">
                <h4 className="text-lg">А вы знали?</h4>
                <p>Ваши задачи сохраняются даже после закрытия браузера</p>
            </div>
        </div>
    )
}