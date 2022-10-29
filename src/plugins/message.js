import { MessageBox, Message } from 'element-ui'
export default function message({ messageInfo, confirmCallback, cancelCallback }) {
  MessageBox.confirm(messageInfo, {
    showClose: false,
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    confirmCallback && confirmCallback()
  }).catch(() => {
    cancelCallback && cancelCallback()
    Message({
      type: 'info',
      message: '已取消此操作'
    })
  })
}
