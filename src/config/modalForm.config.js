export default {
  "addUser": {
    title: "添加用户",
    children: [
      {
        label: "用户名",
        query: "username",
        type: "text",
        placeholder: "请输入用户名"
      },
      {
        label: "密码",
        query: "password",
        type: "text",
        placeholder: "请输入密码"
      },
      {
        label: "角色",
        query: "role",
        type: "select",
        placeholder: "请选择角色"
      },
    ]
  },
  "editUser": {
    title: "修改用户信息",
    children: [
      {
        label: "用户名",
        query: "username",
        type: "text",
        placeholder: "请输入用户名"
      },
      {
        label: "角色",
        query: "role",
        type: "select",
        placeholder: "请选择角色"
      },
    ]
  },
  "addRole": {
    title: "添加角色",
    children: [
      {
        label: "角色名",
        query: "roleName",
        type: "text",
        placeholder: "请输入角色名"
      },
      {
        label: "角色描述",
        query: "roleDescription",
        type: "text",
        placeholder: "请输入角色描述"
      },
      {
        label: "权限",
        query: "roleAuth",
        type: "tree",
        placeholder: "请选择权限"
      }
    ]
  },
  "editRole": {
    title: "修改角色信息",
    children: [
      {
        label: "角色名",
        query: "roleName",
        type: "text",
        placeholder: "请输入角色名"
      },
      {
        label: "角色描述",
        query: "roleDescription",
        type: "text",
        placeholder: "请输入角色描述"
      },
      {
        label: "权限",
        query: "roleAuth",
        type: "tree",
        placeholder: "请选择权限"
      }
    ]
  },
  "addProductsCategory": {
    title: "添加商品分类参数",
    children: [
      {
        label: "一级分类",
        query: "firstCategory",
        type: "allowCreateSelect",
        placeholder: "选择已有分类或添加新分类"
      },
      {
        label: "二级分类",
        query: "secondCategory",
        type: "allowCreateSelect",
        placeholder: "选择已有分类或添加新分类"
      },
      {
        label: "三级分类",
        query: "thirdCategory",
        type: "allowCreateSelect",
        placeholder: "选择已有分类或添加新分类"
      }
    ]
  },
  "editProductsCategory": {
    title: "修改商品分类参数",
    children: [
      {
        label: "参数名称",
        query: "categoryName",
        type: "text"
      }
    ]
  },
  "addProduct": {
    title: "添加商品",
    children: [
      {
        label: "商品名称",
        query: "productName",
        type: "text",
        placeholder: "输入商品名称"
      },
      {
        label: "商品描述",
        query: "productDescription",
        type: "text",
        placeholder: "输入商品描述"
      },
      {
        label: "商品分类",
        query: "productClassify",
        type: "cascader",
        placeholder: "选择商品分类"
      },
      {
        label: "商品价格",
        query: "productPrice",
        type: "inputNumber",
        placeholder: "商品价格",
        unit: "￥"
      },
      {
        label: "商品净重",
        query: "productWeight",
        type: "inputNumber",
        placeholder: "商品净重",
        unit: "kg"
      },
      {
        label: "商品图片",
        query: "productImages",
        type: "upload",
        placeholder: "商品图片",
        action: "api/product"
      }
    ]
  },
  "editProduct": {
    title: "修改商品信息",
    children: [
      {
        label: "商品名称",
        query: "productName",
        type: "text",
        placeholder: "输入商品名称"
      },
      {
        label: "商品描述",
        query: "productDescription",
        type: "text",
        placeholder: "输入商品描述"
      },
      {
        label: "商品分类",
        query: "productClassify",
        type: "cascader",
        placeholder: "选择商品分类"
      },
      {
        label: "商品价格",
        query: "productPrice",
        type: "inputNumber",
        placeholder: "商品价格",
        unit: "￥"
      },
      {
        label: "商品净重",
        query: "productWeight",
        type: "inputNumber",
        placeholder: "商品净重",
        unit: "kg"
      }
    ]
  }
}
