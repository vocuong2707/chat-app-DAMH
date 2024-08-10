const Router = require('express')
const {
    newGroups,
    removeMembersFromGroup,
    setCoLeader,
    transferOwnership,
    getGroupMembers,
    getNonGroupFriends,
    addMembersToGroup,
    getGroupList,
    deleteGroup,
    leaveGroup,
} = require('../controllers/groupController')
const groupRouter = Router()


groupRouter.post('/new-groups', newGroups)
groupRouter.delete('/:groupId/removeMember', removeMembersFromGroup)
groupRouter.put('/set-co-leader/:groupId/:memberId', setCoLeader)
groupRouter.put('/:groupId/transferOwnership/:newOwnerId', transferOwnership)
groupRouter.get('/get-group-members/:groupId', getGroupMembers)
groupRouter.get('/get-non-group-friends', getNonGroupFriends)
groupRouter.post('/:groupId/members', addMembersToGroup)
groupRouter.get('/get-group-list/:userId', getGroupList)
groupRouter.delete('/deleteGroup/:groupId', deleteGroup)
groupRouter.delete('/leaveGroup/:groupId/:userId', leaveGroup)




module.exports = groupRouter