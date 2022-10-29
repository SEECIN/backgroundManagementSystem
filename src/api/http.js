import instance from "@/api/common"
import API_LIST from '@/config/api.config'
import encrypt from "@/util/encrypt"
import { Message } from "element-ui"
export default async function Http(type, data) {
  if (!(type in API_LIST)) {
    throw new Error('API请求错误')
  }
  let { url, method, rsaKey = "" } = API_LIST[type]
  try {
    if (rsaKey && data[rsaKey]) {
      data[rsaKey] = await encrypt(data[rsaKey])
    }
    data = method === 'get' ? { params: data } : method === 'delete' ? { data } : data
    let result = await instance[method](url, data)
    Message({
      message: result?.message,
      type: 'success'
    })
    return result
  } catch (error) {
    if (error.response) {
      let message = error.response.data.message
      Message.error(message)
    }
    return Promise.reject(error)
  }
}
