<template>
  <div class="">
    <el-form :model="form"
             :rules="rules"
             ref="validateForm">
      <el-form-item v-for="item in modalFormData"
                    :key="item.query"
                    :prop="item['query']"
                    :label="item.label"
                    label-width="100px">
        <template v-if="['text','email'].includes(item.type)">
          <el-input v-model="form[item['query']]"
                    :show-password="item['query'] === 'password'"
                    :placeholder="item.placeholder"></el-input>
        </template>
        <template v-if="item.type==='select'">
          <el-select v-model="form[item['query']]"
                     :placeholder="item.placeholder">
            <el-option v-for="opt in roleList"
                       :key="opt.id"
                       :label="opt.roleName"
                       :value="opt.id"></el-option>
          </el-select>
        </template>
        <template v-if="item.type==='tree'">
          <el-tree :data="treeData"
                   :props="{children: 'children',lable: 'name'}"
                   default-expand-all
                   ref="tree"
                   show-checkbox
                   node-key="id"
                   :default-checked-keys="form.roleAuth"
                   highlight-current>
            <span class="custom-tree-node"
                  slot-scope="{data}">
              <span>{{data.name }}</span>
            </span>
          </el-tree>
        </template>
        <template v-if="item.type==='allowCreateSelect'">
          <el-select v-model="form[item['query']]"
                     filterable
                     allow-create
                     default-first-option
                     :placeholder="item['placeholder']">
            <el-option v-for="option in selectOptions[item['query']]"
                       :key="option.categoryName"
                       :value="option.categoryName"></el-option>
          </el-select>
        </template>
        <template v-if="item.type==='inputNumber'">
          <el-input-number v-model="form[item['query']]"
                           :placeholder="item.placeholder"
                           :precision="2"
                           :step="1"></el-input-number>
          &nbsp;
          <span>{{item.unit}}</span>
        </template>
        <template v-if="item.type==='cascader'">
          <el-cascader v-model="form[item['query']]"
                       :options="categoryList"
                       :props="{ expandTrigger: 'hover',value:'categoryName',label:'categoryName',children:'child',multiple:true }"></el-cascader>
        </template>
        <template v-if="item.type==='upload'">
          <el-upload ref="upload"
                     :headers="{'Authorization': `Bearer ${token}`}"
                     :action="item.action"
                     list-type="picture-card"
                     multiple
                     :limit=10
                     :on-change="handleUploadChange"
                     :http-request="handleUploadRequest"
                     :auto-upload="false">
            <i slot="default"
               class="el-icon-plus"></i>
          </el-upload>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'BaseForm',
  components: {

  },
  data() {
    return {

    }
  },
  props: {
    type: {
      type: String
    },
    form: {
      type: Object
    },
    token: {
      type: String
    },
    selectOptions: {
      type: Object
    },
    treeData: {
      type: Array
    },
    roleList: {
      type: Array
    },
    modalFormData: {
      type: Array
    },
    rules: {
      type: Object
    },
    categoryList: {
      type: Array
    },
    handleUploadChange: {
      type: Function
    },
    handleUploadRequest: {
      type: Function
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<style lang="stylus" scoped>

</style>
