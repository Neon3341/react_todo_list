import { useDispatch } from "react-redux";
import ReduxProvider from "@components/reduxProvider";
import { setList } from "@storage/toDoSlice";
import { useEffect } from "react";

export default function PreloadState() {
    return (
        <ReduxProvider>
            <StateLoader />
        </ReduxProvider>
    );
}

function StateLoader() {
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage) {
            const list = localStorage?.getItem('list');
            dispatch(setList(list ? JSON.parse(list) : []));
        }
    }, []);

    return null;
}
