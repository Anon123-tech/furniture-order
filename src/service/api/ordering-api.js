import axios from 'axios';
import parameters from './parameter';

Object.assign(axios.defaults, parameters);

export default {
    async fetchInitialData() {
        try {
            const {data} = await axios.get("/ordering");
            console.log(data.valueOf());
            return data;
        } catch (e) {
            console.log(e);
            throw new Error('The request failed');
        }
    }
}
