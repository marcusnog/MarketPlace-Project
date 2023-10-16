// import mock from '../mock'
// import { paginateArray } from '../utils'

// const data = {
//   success: true,
//   data: [
//     {
//       id: "1",
//       name: "Casas Bahia",
//       acceptCardPayment: true,
//       creationDate: 1646947564522,
//       deletionDate: null,
//       active: true
//     },
//     {
//       id: "2",
//       name: "Extra",
//       acceptCardPayment: false,
//       creationDate: 1645947564522,
//       deletionDate: 1646947564522,
//       active: false
//     }
//   ]
// }

// // GET ALL DATA
// mock.onGet('/api/users/list/all-data').reply(200, data.data)

// // POST: Add new user
// mock.onPost('/apps/users/add-user').reply(config => {
//   // Get event from post data
//   const user = JSON.parse(config.data)

//   const { length } = data.users
//   let lastIndex = 0
//   if (length) {
//     lastIndex = data.users[length - 1].id
//   }
//   user.id = lastIndex + 1

//   data.users.unshift(user)

//   return [201, { user }]
// })

// // GET Updated DATA
// mock.onGet('/api/users/list/data').reply(config => {
//   const { q = '', perPage = 10, page = 1, role = null, currentPlan = null, status = null } = config

//   /* eslint-disable  */
//   const queryLowered = q.toLowerCase()
//   debugger
//   const filteredData = data.data.filter(
//     user =>
//       user.name.toLowerCase().includes(queryLowered)/* &&
//       user.role === (role || user.role) &&
//       user.currentPlan === (currentPlan || user.currentPlan) &&
//       user.status === (status || user.status)*/
//   )
//   /* eslint-enable  */

//   return [
//     200,
//     {
//       users: paginateArray(filteredData, perPage, page),
//       total: filteredData.length
//     }
//   ]
// })

// // GET USER
// mock.onGet('/api/users/user').reply(config => {
//   const { id } = config
//   const user = data.users.find(i => i.id === id)
//   return [200, { user }]
// })

// // DELETE: Deletes User
// mock.onDelete('/apps/users/delete').reply(config => {
//   // Get user id from URL
//   let userId = config.id

//   // Convert Id to number
//   userId = Number(userId)

//   const userIndex = data.users.findIndex(t => t.id === userId)
//   data.users.splice(userIndex, 1)

//   return [200]
// })
