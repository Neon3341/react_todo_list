import { Provider } from "react-redux";
import { ReactNode } from 'react';
import storage from "@storage/index.ts";

interface ReduxProviderProps {
    children: ReactNode;
}

export default function ReduxProvider({ children }: ReduxProviderProps) {
    return (
        <Provider store={storage}>
            {children}
        </Provider>
    )
}