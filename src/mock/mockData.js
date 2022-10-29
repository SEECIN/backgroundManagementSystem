const Mock = require('mockjs')
Mock.Random.extend({
  phone: function() {
    const phonePrefixs = ['130', '134', '189', "177", "180", "156"] // 自己写前缀
    return this.pick(phonePrefixs) + Mock.mock(/\d{8}/) //Number()
  }
})
export const logistics = Mock.mock({
  "logistics|10": [
    {
      "id": "@natural",
      "orderTime": "@datetime",
      "addressee": "@cname",
      "phone": "@phone",
      "address": "@county(true)",
      "remarks": "@csentence",
      "positions|2-4": [
        {
          "time": "@datetime",
          "address": "@county(true)"
        }
      ]
    }
  ]
})

