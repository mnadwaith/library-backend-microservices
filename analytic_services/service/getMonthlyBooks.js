import axios from "axios"

export async function getBookPM() {
    try {
        const config = {
            params: {
                'date': 2024,
                'entity': 'Book',
                'operation': 'CREATE'
            }
        }
        const output = await axios.get('http://localhost:3004/events', config)
        return output.data
    } catch (error) {
        console.log(error.message)
        throw new Error("Failed to fetch rating")
    }
}