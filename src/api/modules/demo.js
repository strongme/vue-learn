export default ({ service, request, serviceForMock, requestForMock, mock, faker, tools }) => ({
  DEMO_LIST (useMock = false) {
    if (useMock) {
      const makeData = (count = 10) => {
        return Array.from(Array(count), (v, k) => k).map(_ => {
          return {
            name: faker.name.findName(),
            email: faker.internet.email(),
            mobile: faker.phone.phoneNumber()
          }
        })
      }

      mock
        .onAny('/demo/list')
        .reply(...tools.responseSuccess(makeData()))
      return requestForMock({
        url: '/demo/list',
        method: 'get'
      })
    } else {
      return request({
        url: '/demo/list',
        method: 'get'
      })
    }
  }
})
