import ReduxProvider from "@components/reduxProvider";
import { useState } from "react";
import { useSelector } from "react-redux";
import TaskSingle from "./taskSingle";

interface ListItem {
    id: number;
    name: string;
    isChecked: boolean;
}

interface toDoList {
    list: ListItem[];
}

export default function ToDoTable({ }) {
    // Подобные конструкция при React нужна только единожды (в корне приложения), но по привычке пишу как на Next.js
    // (там нельзя просто взять и сделать один глобальный провайдер, тк layout там серверный компонент априори)

    return (
        <ReduxProvider>
            <ToDoTableInner />
        </ReduxProvider>
    )
}

function ToDoTableInner({ }) {

    const list = useSelector((state: { toDoList: toDoList }) => state.toDoList.list);
    const [tab, setTab] = useState("all");

    return (
        <div className="flex flex-col bg-teal-700 rounded-xl  h-[50vh] lg:h-[60vh] max-h-[700px] overflow-clip min-h-[210px] w-[400px] grow">
            <div className="flex items-center bg-teal-800 px-2 py-2">
                <h2 className="grow text-2xl font-semibold">Ваши задачи</h2>
                <ul className="pl-4 flex flex-col items-end  border-l-2 border-neutral-400">
                    <li className={`${tab === "all" && "text-emerald-300"} cursor-pointer`} onClick={() => (setTab("all"))}>Все</li>
                    <li className={`${tab === "active" && "text-emerald-300"} cursor-pointer`} onClick={() => (setTab("active"))}>Активные</li>
                    <li className={`${tab === "done" && "text-emerald-300"} cursor-pointer`} onClick={() => (setTab("done"))}>Выполненные</li>
                </ul>
            </div>
            <div className="px-2 py-2 grid grid-flow-row gap-y-3   overflow-y-auto ">
                {list.map((child) => {
                    if (tab === "all") {
                        return (
                            <TaskSingle key={child.id} task={child} />
                        );
                    } else if (tab === "done" && child.isChecked) {
                        return (
                            <TaskSingle key={child.id} task={child} />
                        );
                    } else if (tab === "active" && !child.isChecked) {
                        return (
                            <TaskSingle key={child.id} task={child} />
                        );
                    }
                    return null;
                })}

            </div>
        </div>
    )
}