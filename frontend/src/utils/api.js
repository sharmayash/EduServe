import axios from "axios";

const Api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

// TODO: REQUEST INTERCEPTOR FOR PRIVATE ROUTES --------------------

// -------------------------------------------------------

// TODO: RESPONSE INTERCEPTOR -----------------------------------

export default Api;
