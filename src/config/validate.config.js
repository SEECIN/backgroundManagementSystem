export default {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' }
  ],
  role: [
    { required: true, message: '请选择角色', trigger: 'blur' }
  ],
  roleName: [
    { required: true, message: '请输入角色名', trigger: 'blur' }
  ],
  roleDescription: [
    { required: true, message: '请输入角色描述', trigger: 'blur' }
  ],
  roleAuth: [
    { required: true, message: '请选择权限', trigger: 'blur' }
  ],
  firstCategory: [
    { required: true, message: '一级分类参数必填', trigger: 'blur' }
  ],
  secondCategory: [
    { required: true, message: '二级分类参数必填', trigger: 'blur' }
  ],
  thirdCategory: [
    { required: true, message: '三级分类参数必填', trigger: 'blur' }
  ],
  categoryName: [
    { required: true, message: '参数名称必填', trigger: 'blur' }
  ],
  productName: [
    { required: true, message: '输入商品名称', trigger: 'blur' }
  ],
  productDescription: [
    { required: true, message: '输入商品描述', trigger: 'blur' }
  ],
  productClassify: [
    { required: true, message: '选择商品分类', trigger: 'blur' }
  ],
  productPrice: [
    { required: true, message: '请输入正确的商品价格', trigger: 'blur' },
    { pattern: /^(d*.d{0,2}|d+).*$/ }
  ],
  productWeight: [
    { required: true, message: '请输入正确的商品价格', trigger: 'blur' },
    { pattern: /^(d*.d{0,2}|d+).*$/ }
  ]
}
