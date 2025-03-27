import { useDispatch } from "react-redux";

import { useCallback } from "react";
import { removeFromList, toggleElemInList } from "@storage/toDoSlice";

interface ListItem {
    id: number;
    name: string;
    isChecked: boolean;
}

interface TaskSingleProps {
    task: ListItem;
}

export default function TaskSingle({ task }: TaskSingleProps) {
    const dispatch = useDispatch();

    const onDelete = useCallback(() => {
        dispatch(removeFromList(task.id))
    }, [task, dispatch]);

    const onToggle = useCallback(() => {
        dispatch(toggleElemInList(task.id))
    }, [task, dispatch]);


    return (
        <div className={`${task.isChecked ? "bg-teal-800" : "bg-teal-600"} border-teal-600 border rounded-xl bg-teal-600 py-2 px-4 flex flex-row gap-x-5 items-center`}>
            <input onChange={onToggle} className="min-w-5 min-h-5 cursor-pointer" checked={task.isChecked} type="checkbox"  />
            <h3 className={`${task.isChecked ? "text-neutral-300 line-through" : ""} break-all grow text-base`}>{task.name}</h3>
            <button className="bg-red-700/70 hover:bg-red-700/100 transition-colors px-3 py-1 rounded-xl w-fit cursor-pointer text-2xl" onClick={onDelete}>
                ×
            </button>
        </div>
    )

}