import axiosInstance, { endpoints } from '~/utils/axios';

const createEvent = async (eventData) => {
    const res = await axiosInstance.post(`${import.meta.env.VITE_SERVER_BE_URL}${endpoints.calendar}`, eventData, {
        withCredentials: true,
    });
    return res.data;
};

const updateEvent = async (eventId, eventData) => {
    const res = await axiosInstance.put(
        `${import.meta.env.VITE_SERVER_BE_URL}${endpoints.calendar}/${eventId}`,
        eventData,
        {
            withCredentials: true,
        },
    );
    return res.data;
};

const deleteEvent = async (eventId) => {
    const res = await axiosInstance.delete(`${import.meta.env.VITE_SERVER_BE_URL}${endpoints.calendar}/${eventId}`, {
        withCredentials: true,
    });
    return res.data;
};

export const calendarService = { createEvent, updateEvent, deleteEvent };
