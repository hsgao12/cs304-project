import toServer from '../api/toServer';

const sqlHandler = async (method, url, body) => {
    let response;
    try {
        switch (method) {
            case 'get':
                response = await toServer.get(url);   
                             
                break;
            case 'put':
                response = await toServer.put(url, body);
                break;
            case 'delete':
                response = await toServer.delete(url);
                break;
            case 'post':
                response = await toServer.post(url, body);
                break;
            default:
                break;
        }        
        
        return response;
    } catch (error) {
        console.log(error);
    }
}

export default sqlHandler;