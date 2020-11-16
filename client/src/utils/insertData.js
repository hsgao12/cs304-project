import toServer from '../api/toServer';

const insertData = async (sql) => {
    try {
        const response = await toServer.post('/handleSQLQuery', { sql: sql });
    } catch (error) {
        console.log(error);
    }
      
}

export default insertData;