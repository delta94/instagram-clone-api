const Notification = require('../../models/notification.model')
const {Exception} = require('../../utils')
const { statusCodes } = require('../../config/globals')
const getNotificationByUser = async (req, res , next) => {
    try {
        const {id: userId} = req.params
        let {page = 0, limit = 5} = req.query
        page = +page
        limit = +limit
        const authId = req.auth._id
        if(userId !== authId) throw new Exception('invalid userId')
        const skip = page  * limit
        const notifications = await Notification.find(
            {toUserId: userId}, null, {skip, limit})
            .sort({createdAt: -1})
            .populate('byUser', 'username avatarUrl')
        if(!notifications) throw new Exception('notification not found', statusCodes.NOT_FOUND)

        return res.status(statusCodes.OK).send({notifications})
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getNotificationByUser
}