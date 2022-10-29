<template>
  <div>
    <el-dialog class="dialogModal"
               :title="title"
               :show-close="false"
               :visible="isShow">
      <BaseForm :type="type"
                :form='form'
                :treeData="treeData"
                :roleList="roleList"
                :rules="rules"
                :token="token"
                :modalFormData="modalFormData"
                :categoryList="categoryList"
                :selectOptions='selectOptions'
                :handleUploadChange="handleUploadChange"
                :handleUploadRequest="handleUploadRequest"
                ref="form" />
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="closeModal">取 消</el-button>
        <el-button type="primary"
                   @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import store from "store"
import MODAL_FORM_DATA from '@/config/modalForm.config'
import VALIDATE_DATA from '@/config/validate.config'
import BaseForm from "components/base/BaseForm"
import { dynamicRoutes } from "@/router/index"
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapActions } = createNamespacedHelpers('modal')
import { Message } from 'element-ui'
export default {
  name: 'BaseModal',
  components: {
    BaseForm
  },
  data() {
    return {
      form: {},
      selectOptions: {},
      categoryList: [],
      firstCategory: [],
      secondCategory: [],
      thirdCategory: [],
      roleList: [],
      axiosResult: {},
      productFormData: new FormData()
    }
  },
  created() {
    this.$bus.$on('transmitFormData', data => {
      this.form = data
    })
    this.$bus.$on('formatSelectOptions', data => {
      this.formatSelectOptions(data || this.categoryList)
    })
  },
  watch: {
    async type(type) {
      if (type.includes('User')) {
        let result = await this.$axios('getRoleList')
        this.roleList = result.data.roleList
      }
      if (['addProduct', 'editProduct'].includes(type)) {
        let result = await this.$axios('getProductsCategory')
        this.categoryList = result.data.result
      }
    },
    isShow(val) {
      if (!val) {
        this.$bus.$on('formatSelectOptions', data => {
          this.formatSelectOptions(data || this.categoryList)
        })
        let tree
        if (this.type.includes('Role')) {
          tree = this.$refs['form'].$refs['tree'][0]
          tree.setCheckedKeys([])
        }
        this.form = {}
        this.$bus.$on('transmitFormData', data => {
          this.form = data
          if (tree) tree.setCheckedKeys(data.roleAuth)
        })
        this.productFormData = new FormData()
        if (this.type.includes("addProduct")) this.$refs["form"].$refs["upload"][0].uploadFiles = []
      } else {
        this.$bus.$off('transmitFormData')
        this.$bus.$off('formatSelectOptions')
      }
    },
    form: {
      handler: function(newVal) {
        if (this.$route.path === "/productsclassify") {
          let existFirstCategory = this.firstCategory.filter(item => item.categoryName === this.form.firstCategory)
          if (existFirstCategory.length === 0) {
            this.secondCategory = []
            this.thirdCategory = []
          }
          this.categoryList.filter(item => {
            if (newVal.firstCategory === item.categoryName) {
              this.secondCategory = item.child.reduce((acc, curr) => {
                acc.push({
                  categoryName: curr.categoryName,
                  id: curr?.id,
                  rootName: curr?.rootName
                })
                return acc
              }, [])
              if (newVal.secondCategory) {
                item.child.filter(children => {
                  if (newVal.secondCategory === children.categoryName) {
                    this.thirdCategory = children.child.reduce((acc, curr) => {
                      acc.push({
                        categoryName: curr.categoryName,
                        id: curr?.id,
                        parentName: curr?.parentName
                      })
                      return acc
                    }, [])
                  }
                })
              }
            }
          })
          this.selectOptions = { firstCategory: this.firstCategory, secondCategory: this.secondCategory, thirdCategory: this.thirdCategory }
        }
      },
      deep: true
    },
    secondCategory(newVal, oldVal) {
      if (newVal[0]?.rootName !== oldVal[0]?.rootName && this.form.secondCategory) {
        this.form.secondCategory = ""
        if (this.form.thirdCategory) this.form.thirdCategory = ""
      }
      let existFirstCategory = this.firstCategory.filter(item => item.categoryName === this.form.firstCategory)
      let existSecondCateory = oldVal.filter(item => item.categoryName === this.form.secondCategory)
      if (existFirstCategory.length > 0 && existSecondCateory.length === 0 && this.form.secondCategory) this.thirdCategory = []
    },
    thirdCategory(newVal, oldVal) {
      if (newVal[0]?.parentName !== oldVal[0]?.parentName && this.form.thirdCategory) this.form.thirdCategory = ""
    }
  },
  computed: {
    ...mapState(['isShow', 'type']),
    title() {
      return MODAL_FORM_DATA[this.type]?.title
    },
    treeData() {
      return this.formatTreeData(dynamicRoutes)
    },
    rules() {
      return VALIDATE_DATA
    },
    modalFormData() {
      return MODAL_FORM_DATA[this.type]?.children
    },
    token() {
      return store.get(process.env.VUE_APP_USER_INFO)?.token
    }
  },
  methods: {
    submit() {
      if (this.type.includes('Role')) {
        const tree = this.$refs['form'].$refs['tree'][0]
        let checkedKeys = tree.getCheckedKeys()
        this.$refs['form'].form.roleAuth = checkedKeys
      }
      this.$refs['form'].$refs['validateForm'].validate(async valid => {
        if (valid) {
          try {
            if (["addProduct"].includes(this.type)) {
              await this.handleUploadRequest()
            } else {
              this.axiosResult = await this.$axios(this.type, this.$refs['form'].form)
            }
            if (!this.axiosResult) return false
            this.$bus.$emit('changeData', this.axiosResult.data.result)
            this.$bus.$emit('transmitFormData', this.axiosResult.data.result)
            if (this.type === "addProductsCategory") this.formatSelectOptions(this.categoryList)
            this.close()
          } catch (error) {
            console.log(error)
          }
        } else {
          return false
        }
      })
    },
    formatSelectOptions(data) {
      this.categoryList = data
      this.firstCategory = data.reduce((acc, curr) => {
        acc.push({
          categoryName: curr.categoryName,
          id: curr?.id
        })
        return acc
      }, [])
      this.selectOptions = { firstCategory: this.firstCategory, secondCategory: this.secondCategory, thirdCategory: this.thirdCategory }
    },
    formatTreeData(datas) {
      return datas.map(item => {
        if (!item.children) {
          return {
            id: item.meta.id,
            name: item.name
          }
        }
        if (item.children) {
          return {
            id: item.meta.id,
            name: item.name,
            children: this.formatTreeData(item.children)
          }
        }
      })
    },
    handleUploadChange(file) {
      let maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        Message({
          type: "warning",
          message: "文件不得大于5M"
        })
        this.$refs["form"].$refs["upload"][0].handleRemove(file)
        return false
      }
      if (!(/image/g.test(file.raw.type))) {
        Message({
          type: "warning",
          message: "只能选择图片格式的文件"
        })
        this.$refs["form"].$refs["upload"][0].handleRemove(file)
        return false
      }
      this.productFormData.append("file", file.raw)
    },
    async handleUploadRequest() {
      for (const key in this.$refs['form'].form) {
        this.productFormData.append(key, this.$refs['form'].form[key])
      }
      this.axiosResult = await this.$axios(this.type, this.productFormData)
    },
    closeModal() {
      this.$bus.$emit("initTableData")
      this.close()
    },
    ...mapActions(['close'])
  },
  beforeDestroy() {

  }
}
</script>

<style lang="stylus">
.dialogModal .el-dialog 
  max-height 70vh
  overflow-y: auto
  .el-dialog__header
    text-align center
</style>
