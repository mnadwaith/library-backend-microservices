import authorModel from "../../model/author.js"

export async function updateData(filter, newData, updateOpp) {
    try {
        let output = await authorModel.updateOne({ _id: filter }, { [updateOpp]: newData })
        return output
    } catch (error) {
        console.log('Error' + error.message)
        throw new Error('Failed to update the author')
    }
}