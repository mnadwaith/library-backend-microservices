import userModel from "../../model/user.js"

export async function editData(filter, data) {
    try {
        const output = await userModel.findByIdAndUpdate(filter, data, { new: true })
        return output
    } catch (error) {
        console.log(error.message)
        throw new Error("Failed to edit")
    }
}