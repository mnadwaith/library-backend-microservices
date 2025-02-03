import axios from "axios"

export async function getAvg(token) {
    try {
        const config = {
            headers: {
                'Authorization': token
            },
            params: {
                'limit': -1
            }
        }
        const output = await axios.get('http://localhost:3005/review', config)
        return output.data
    } catch (error) {
        console.log(error.message)
        throw new Error("Failed to fetch rating")
    }
}