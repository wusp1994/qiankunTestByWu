import HttpRequest from '@/libs/axios'
import { moduleApiUrl } from '@/api/urlConfig'
const url = moduleApiUrl.permission_manager;
const axios = new HttpRequest(url)

export const login = ({ userName, password }) => {
    let data = {
        userName,
        password
    };
    // debugger
    return axios.request({
        url:'login',
        method: 'post',
        data
    })
};
