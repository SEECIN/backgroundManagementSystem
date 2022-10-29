export default {
  '权限列表': [
    {
      name: "权限名称",
      field: "name",
      type: "text"
    },
    {
      name: "路径",
      field: "path",
      type: "text"
    },
    {
      name: "权限等级",
      field: "level",
      type: "tag",
    }
  ],
  '用户列表': [
    {
      name: "用户名",
      field: "username",
      type: "text"
    },
    {
      name: "角色",
      field: "roleName",
      type: "text"
    },
    {
      name: "状态",
      field: "status",
      type: "switch",
      messageType: "changeStatus",
      axiosType: "editUser"
    },
    {
      name: "操作",
      type: "button",
      field: [
        {
          type: 'primary',
          text: "修改用户信息",
          axiosType: 'editUser'
        },
        {
          type: 'danger',
          text: "删除",
          axiosType: 'deleteUser'
        }
      ]
    }
  ],
  '角色列表': [
    {
      name: "角色",
      field: "roleName",
      type: "text"
    },
    {
      name: "角色描述",
      field: "roleDescription",
      type: "text"
    },
    {
      name: "操作",
      type: "button",
      field: [
        {
          type: 'primary',
          text: "修改角色信息",
          axiosType: 'editRole'
        },
        {
          type: 'danger',
          text: "删除",
          axiosType: 'deleteRole'
        }
      ]
    }
  ],
  '订单管理': [
    {
      name: "订单ID",
      field: "id",
      type: "text"
    },
    {
      name: "下单时间",
      field: "orderTime",
      type: "text"
    },
    {
      name: "收件人",
      field: "addressee",
      type: "text"
    },
    {
      name: "电话号码",
      field: "phone",
      type: "text"
    },
    {
      name: "收件地址",
      field: "address",
      type: "text"
    },
    {
      name: "备注",
      field: "remarks",
      type: "text"
    }
  ],
  '商品分类': [
    {
      name: "分类名称",
      field: "categoryName",
      type: "text"
    },
    {
      name: "分类等级",
      field: "level",
      type: "tag"
    },
    {
      name: "操作",
      type: "button",
      field: [
        {
          type: 'primary',
          text: "修改分类信息",
          axiosType: 'editProductsCategory'
        },
        {
          type: 'danger',
          text: "删除",
          axiosType: 'deleteProductsCategory'
        }
      ]
    }
  ],
  "商品列表": [
    // {
    //   name: "商品编号",
    //   field: "id",
    //   type: "text"
    // },
    {
      name: "商品名称",
      field: "productName",
      type: "text"
    },
    {
      name: "商品描述",
      field: "productDescription",
      type: "text"
    },
    {
      name: "商品分类",
      field: "productClassify",
      type: "text"
    },
    {
      name: "商品价格(￥)",
      field: "productPrice",
      type: "text"
    },
    {
      name: "商品净重(kg)",
      field: "productWeight",
      type: "text"
    },
    {
      name: "操作",
      type: "button",
      field: [
        {
          type: 'primary',
          text: "修改商品信息",
          axiosType: 'editProduct'
        },
        {
          type: 'danger',
          text: "删除",
          axiosType: 'deleteProduct'
        }
      ]
    }
  ]
}
