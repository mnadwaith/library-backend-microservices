import axios from "axios"

export async function getData(token) {
    try {
        const config = {
            headers: {
                'Authorization': token
            },
            params: {
                'limit': 3
            }
        }
        const output = await axios.get('http://localhost:3005/review', config)
        return output.data
    } catch (error) {
        console.log(error.message)
        throw new Error("Failed to fetch")
    }
}