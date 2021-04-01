import axios from 'axios';

export default axios.create({
    baseURL: 'https://react-quiz-fb7a7-default-rtdb.firebaseio.com/'
})