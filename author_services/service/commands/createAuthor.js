import authorModel from "../../model/author.js";

export async function postData(data) {
    try {
        let output = await authorModel.create(data)
        return output;
    } catch (error) {
        console.log('Error' + error.message)
        throw new Error('Failed to create the author')
    }
}