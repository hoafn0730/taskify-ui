import axiosInstance from '~/utils/axios';

const getInvoices = () => {
    return axiosInstance.get(import.meta.env.VITE_SERVER_BE_URL + '/api/v1/invoices', {
        withCredentials: true,
    });
};

const getInvoice = (id) => {
    return axiosInstance.get(import.meta.env.VITE_SERVER_BE_URL + '/api/v1/invoices/' + id, {
        withCredentials: true,
    });
};

export const invoiceService = { getInvoices, getInvoice };
