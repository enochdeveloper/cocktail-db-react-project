import axios from "axios";

const authFetch = axios.create({
    baseURL: 'https://www.thecocktaildb.com/api/json/v1/1',
})

export default authFetch;