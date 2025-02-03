import bookModel from "../../model/book.js"

export async function getData(query) {
    try {
        const pipeline = []
        pipeline.push({ $match: query })

        pipeline.push({
            $lookup: {
                from: 'authordatas',
                localField: 'author',
                foreignField: '_id',
                as: 'author'
            }
        })

        pipeline.push({ $unwind: '$author' })

        pipeline.push({
            $project: {
                author: '$author.name',
                title: 1,
                publishedDate: 1,
                pages: 1,
                genre: 1
            }
        })
        let cursor = await bookModel.aggregate(pipeline)
        return cursor
    } catch (error) {
        console.log('Error' + error.message)
        throw new Error('Failed to fetch book')
    }
}
