import axios from 'axios';

const instance = axios.create({
  baseURL:
    "https://api.gateway.attomdata.com/propertyapi/v1.0.0/attomavm/detail?"
});

export default instance;