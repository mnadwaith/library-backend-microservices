import reviewModel from "../../model/review.js"

export async function getData(limit = 0) {
    try {
        const pipeline = []

        pipeline.push({
            $lookup: {
                from: 'bookdatas',
                localField: 'book',
                foreignField: '_id',
                as: 'book'
            }
        })
        pipeline.push({ $unwind: '$book' })


        if (limit == -1) {
            pipeline.push({
                $group: {
                    _id: '$book.genre',
                    avgRating: { $avg: '$rating' }
                }
            })

            pipeline.push({
                $sort: { _id: 1 }
            });

            const output = await reviewModel.aggregate(pipeline)
            return output
        }

        pipeline.push({
            $project: {
                book: '$book.title',
                review: 1,
                rating: 1
            }
        })

        if (limit > 0) {
            pipeline.push({
                $group: {
                    _id: '$book',
                    totalReviews: { $sum: 1 },
                    avgRating: { $avg: '$rating' },
                }
            });

            pipeline.push({
                $sort: { totalReviews: -1, avgRating: -1 }
            });

            pipeline.push({
                $limit: limit
            });

            pipeline.push({
                $project: {
                    book: '$_id',
                    totalReviews: 1,
                    avgRating: 1,
                    _id: 0
                }
            });
        }

        const output = await reviewModel.aggregate(pipeline)
        return output
    } catch (error) {
        console.log("Error " + error.message)
        throw new Error("Failed to fetch review")
    }
}