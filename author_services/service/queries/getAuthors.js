import authorModel from "../../model/author.js"

export async function getData(query, skip = 0, limit = 0) {
    try {
        let pipeline = []
        pipeline.push({ $match: query });
        if (limit > 0) {
            pipeline.push({ $skip: skip })
            pipeline.push({ $limit: limit })
        }
        pipeline.push({
            $lookup: {
                from: "bookdatas",
                localField: "_id",
                foreignField: "author",
                as: "books",
            }
        })

        let cursor = await authorModel.aggregate(pipeline)
        return cursor
    } catch (error) {
        console.log('Error' + error.message)
        throw new Error('Failed to fetch author')
    }
}