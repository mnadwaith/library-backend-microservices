import userModel from "../../model/user.js";

export async function postData(data) {
    try {
        let output = await userModel.create(data)
        return output;
    } catch (error) {
        if (error.name == 'ValidationError') {
            throw error
        }
        console.log('Error ' + error)
        throw new Error('Failed to create the user')
    }
}