import * as axios from 'axios';
import { API } from './config';

const getEvents = async function (userId, token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
        const response = await axios.get(`${API}/events`);
        const result = parseList(response)
        return result.items;
    } catch (error) {
        console.error(error);
        return [];
    }
};

const saveEvent = async function (eventObj, token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    try {
        console.log("eventApi - saveEvent");

        const response = await axios.post(`${API}/events`, eventObj);
        const eventSaved = parseItem(response, 201);

        return eventSaved;
    } catch (error) {
        console.error(error);
        return [];
    }
};
const parseList = response => {
    if (response.status !== 200) throw Error(response.message);
    if (!response.data) return [];
    let list = response.data;
    if (typeof list !== 'object') {
        list = [];
    }
    return list;
};

export const parseItem = (response, code) => {
    if (response.status !== code) throw Error(response.message);
    let item = response.data;
    if (typeof item !== 'object') {
        item = undefined;
    }
    return item;
};
export const eventApi = {
    getEvents,
    saveEvent,
};
