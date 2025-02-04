import { toast } from "react-toastify";
import './style.css'

export const toastSuccessful = (message) => {
    toast.success(message, {
        className: 'toast-sucess',
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    });
    };
    

export const toastError = (message) => {
    toast.error(message, {
        className: 'toast-error',
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    });
    };