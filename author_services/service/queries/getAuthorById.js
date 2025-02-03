import authorModel from "../../model/author.js"

export async function getDataById(query) {
    try {
        const pipeline = [
            { $match: query },
            {
                $lookup: {
                    from: "bookdatas",
                    localField: "_id",
                    foreignField: "author",
                    as: "books",
                },
            },
        ]
        const cursor = await authorModel.aggregate(pipeline)
        return cursor
    } catch (error) {
        console.log('Error' + error.message)
        throw new Error('Failed to fetch author')
    }
}