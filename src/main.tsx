import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import './App.scss'
import {RouterProvider} from "react-router-dom";
import {router} from "./Router";
import {
    QueryClient,
    QueryClientProvider
} from 'react-query'
import {Toaster} from "react-hot-toast";


// Create a client
const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                refetchOnWindowFocus: false, // default: true
            },
        }
    }
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
                <Toaster/>
                <RouterProvider router={router}/>
        </QueryClientProvider>
    </React.StrictMode>,
)
