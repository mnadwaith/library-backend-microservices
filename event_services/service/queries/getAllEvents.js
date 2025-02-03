import eventModel from '../../model/event.js'

export async function getData(filter, currentYear) {
    try {
        const pipeline = [{ $match: filter }]
        if (Object.entries(filter).length !== 0 && currentYear) {

            pipeline.push({
                $match: {
                    timestamp: { $regex: `${currentYear}` }
                }
            })


            pipeline.push({
                $addFields: {
                    month: {
                        $dateToString: { format: '%Y-%m', date: { $dateFromString: { dateString: '$timestamp' } } }
                    }
                }
            })

            pipeline.push({
                $group: {
                    _id: '$month',
                    count: { $sum: 1 }
                }
            })

            pipeline.push({
                $sort: {
                    _id: 1
                }
            })
        }

        let output = await eventModel.aggregate(pipeline)
        return output
    } catch (error) {
        console.log("Error " + error)
        throw new Error("Events not found")
    }
}