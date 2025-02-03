import userModel from "../../model/user.js"

export async function getData() {
    try {
        let pipeline = []
        pipeline.push({
            $project: {
                name: 1,
                role: 1,
                email: 1
            }
        })
        const output = await userModel.aggregate(pipeline)
        return output
    } catch (error) {
        console.log(error.message)
        throw new Error("Failed to get users")
    }
}