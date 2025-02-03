import authorModel from "../../model/author.js"

export async function deleteData(filter) {
    try {
        //Soft delete implementataion
        let output = await authorModel.find({ _id: filter, isDelete: true })
        if (output.length != 0) {
            return output = []
        }
        output = await authorModel.findByIdAndUpdate(filter, { $set: { isDelete: true } }, { new: true })
        return output
    } catch (error) {
        console.log('Error' + error.message)
        throw new Error('Failed to delete the author')
    }
}