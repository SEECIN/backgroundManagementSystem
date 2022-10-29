<template>
  <div class="table">
    <el-table :data="tableData"
              border
              row-key="id"
              :tree-props="{children: 'child'}"
              :max-height="maxHeight"
              @expand-change="expandChange"
              stripe>
      <el-table-column v-if="$route.name === '订单管理'"
                       type="expand">
        <template slot-scope="scope">
          <el-steps direction="vertical"
                    :space="70">
            <el-step v-for="item,idx in scope.row.positions"
                     :key="idx"
                     status="process"
                     icon="el-icon-delete-location"
                     :title="item.address"
                     :description="item.time"></el-step>
          </el-steps>
        </template>
      </el-table-column>
      <el-table-column v-if="$route.name === '商品列表'"
                       type="expand">
        <template slot-scope="scope">
          <div class="table-expand">
            <div class="expand-image">
              <p>商品图片：</p>
              <div v-if="scope.row.productImages.length > 0">
                <vuescroll :ops="ops">
                  <div v-for="item,idx in scope.row.productImages"
                       :key="idx"
                       class="expand-image--img">
                    <el-image style="height: 120px"
                              ref="previewImg"
                              :src="item"
                              :preview-src-list="scope.row.productImages">
                    </el-image>
                    <span class="expand-image--mask">
                      <span @click="showPreview(item)"><i class="el-icon-zoom-in"
                           style="color:#fff"></i></span>
                      <span @click="handleImageDelete(item,scope.row)"><i class="el-icon-delete"
                           style="color:#fff"></i></span>
                    </span>
                  </div>
                </vuescroll>
              </div>
              <div v-else>
                <img src="../../../assets/images/no-image.webp"
                     alt="">
              </div>
            </div>
            <div class="expand-upload">
              <div class="expand-upload--head">
                <span>添加图片：</span>
                <div>
                  <el-button @click="resetDatas(scope.row.id)"
                             type="info"
                             size="mini"
                             round>清空已选文件</el-button>
                  <el-button @click="handleImageUpload((scope.row.id))"
                             type="primary"
                             size="mini"
                             round>上传图片</el-button>
                </div>
              </div>
              <div class="expand-upload--main">
                <el-upload ref="upload"
                           style="vertical-align: middle"
                           action=""
                           list-type="picture-card"
                           :show-file-list="false"
                           multiple
                           :auto-upload="false"
                           :limit=10
                           :on-change="(file)=>{handleUploadChange(file,scope.row.id)}"
                           :http-request="handleImageUpload">
                  <i slot="default"
                     class="el-icon-plus"></i>
                </el-upload>
                <div class="expand-upload--preview">
                  <vuescroll :ops="ops">
                    <div v-for="(item,idx) in uploadFilesPreview[scope.row.id]"
                         :key="item.uid"
                         class="expand-image--img">
                      <el-image style="height: 120px"
                                ref="uploadPreviewImg"
                                :src="item.url"
                                :preview-src-list="uploadPreviews[scope.row.id]">
                      </el-image>
                      <span class="expand-image--mask">
                        <span @click="showUploadPreview(item.url)"><i class="el-icon-zoom-in"
                             style="color:#fff"></i></span>
                        <span @click="deleteUploadPreview(scope.row.id,item.uid,idx)"><i class="el-icon-delete"
                             style="color:#fff"></i></span>
                      </span>
                    </div>
                  </vuescroll>
                </div>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-for="item,idx in tableHeadData"
                       :key="idx"
                       :label="item.name">
        <template slot-scope="scope">
          <span v-if="item.type==='text'">{{scope.row[item.field] || '/'}}</span>
          <el-tag v-if="item.type==='tag'"
                  :type="scope.row.tagData.type">{{scope.row.tagData.text}}</el-tag>
          <el-switch v-if="item.type==='switch'"
                     :value="scope.row.status "
                     :active-value="1"
                     @change="handleChangeSwitch(scope.row,item.messageType,item.axiosType)"
                     active-color="#13ce66"
                     inactive-color="#ff4949">
          </el-switch>
          <template v-if="item.type==='button'">
            <el-button v-for="curr,id in item.field"
                       :key="id"
                       :type="curr.type"
                       @click="hanldeClickButton(curr.axiosType,scope.row)">
              {{curr.text}}
            </el-button>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import vuescroll from "vuescroll"
import MIXIN from '@/core/mixin'
import message from '@/plugins/message'
import TABLE_HEAD_DATA from '@/config/tableHead.config.js'
import MESSAGE_DATA from '@/config/message.config.js'
import { Message } from 'element-ui'
export default {
  name: 'Table',
  components: {
    vuescroll
  },
  data() {
    return {
      tableHeadData: [],
      transmitData: {},
      productFormData: {},
      dialogImageUrl: '',
      dialogVisible: false,
      ops: {
        vuescroll: {
          mode: 'native',
          sizeStrategy: '120px',
          detectResize: false,
          /** 锁定一种滚动方向， 锁定的方向为水平或者垂直方向上滑动距离较大的那个方向 */
          locking: false,
        },
        scrollPanel: {
          initialScrollY: false,
          initialScrollX: false,
          scrollingX: true,
          scrollingY: false,
          speed: 300,
          easing: undefined,
          verticalNativeBarPos: 'right',
          maxHeight: undefined,
          maxWidth: undefined,
        },
        bar: {
          showDelay: 500,
          onlyShowBarOnScroll: false,
          keepShow: false,
          background: '#c1c1c1',
          opacity: 1,
          hoverStyle: false,
          specifyBorderRadius: false,
          minSize: false,
          size: '6px',
          disable: false,
        }
      },
      uploadFilesPreview: {},
      uploadPreviews: {}
    }
  },
  mixins: [MIXIN],
  props: {
    tableData: {
      type: Array
    }
  },
  created() {
    this.tableHeadData = TABLE_HEAD_DATA[this.$route.name]
  },
  computed: {
    maxHeight() {
      return (window.innerHeight - 310) + 'px'
    },
    expand() {
      return TABLE_HEAD_DATA[this.$route.name]?.expand
    }
  },
  methods: {
    async handleChangeSwitch(row, messageType, type) {
      let msgInfo = MESSAGE_DATA[messageType][Number(row.status)].message
      message({
        messageInfo: msgInfo, confirmCallback: async () => {
          try {
            row.status = row.status ? 0 : 1
            await this.$axios(type, row)
          } catch (error) {
            row.status = row.status ? 0 : 1
            console.log(error);
          }
        }
      })
    },
    async hanldeClickButton(type, item) {
      let _item = Object.assign({}, item)
      if (type.includes('edit')) {
        this.$bus.$emit('transmitFormData', _item)
        this.openModal(type)
      }
      if (type.includes('delete')) {
        message({
          messageInfo: "是否要删除此数据，删除后不可恢复", confirmCallback: async () => {
            try {
              let result = await this.$axios(type, _item)
              let data = type === "deleteProductsCategory" ? result.data.result : _item
              this.$bus.$emit('changeData', data, type)
              if (type === "deleteProductsCategory") {
                this.$bus.$emit('formatSelectOptions')
              }
            } catch (error) {
              console.log(error)
            }
          }
        })
      }
    },
    showPreview(imageUrl) {
      this.$refs.previewImg.map(item => {
        if (item.src === imageUrl) item.showViewer = true
      })
    },
    async handleImageDelete(deleteImageUrl, productData) {
      message({
        messageInfo: "是否删除此图片，删除后不可恢复", confirmCallback: async () => {
          let data = { id: productData.id, deleteImageUrl }
          let result = await this.$axios("editProduct", data)
          this.$bus.$emit('changeData', result.data.result)
        }
      })
    },
    handleUploadChange(file, id) {
      let maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        Message({
          type: "warning",
          message: "文件不得大于5M"
        })
        return false
      }
      if (!(/image/g.test(file.raw.type))) {
        Message({
          type: "warning",
          message: "只能选择图片格式的文件"
        })
        return false
      }
      this.uploadFilesPreview[id].push(file)
      this.uploadPreviews[id].push(file.url)
      this.productFormData[id].append(id + file.uid, file.raw)
    },
    async handleImageUpload(id) {
      if (this.uploadFilesPreview[id].length === 0) {
        Message({
          type: "warning",
          message: "未选择图片"
        })
        return false
      }
      this.productFormData[id].append("id", id)
      try {
        let result = await this.$axios("addProduct", this.productFormData[id])
        this.$bus.$emit('changeData', result.data.result)
        this.resetDatas(id)
      } catch (error) {
        console.log(error)
      }
    },
    expandChange(row) {
      if (!this.uploadFilesPreview[row.id]) this.$set(this.uploadFilesPreview, row.id, [])
      if (!this.uploadPreviews[row.id]) this.$set(this.uploadPreviews, row.id, [])
      if (!this.productFormData[row.id]) this.$set(this.productFormData, row.id, new FormData())
    },
    showUploadPreview(url) {
      this.$refs.uploadPreviewImg.filter(item => {
        if (item.src === url) item.showViewer = true
      })
    },
    deleteUploadPreview(id, uid, idx) {
      this.uploadFilesPreview[id].splice(idx, 1)
      this.uploadPreviews[id].splice(idx, 1)
      this.productFormData[id].delete(id + uid)
    },
    resetDatas(id) {
      this.uploadFilesPreview[id] = []
      this.uploadPreviews[id] = []
      this.productFormData[id] = new FormData()
    }
  }
}
</script>

<style lang="stylus">
.table
  width 100%
  height 100%
  margin 30px 0
  .el-table .el-table__expanded-cell
    background-color #e6e7e9
    .el-steps
      padding 24px 20px 0
      .el-step
        .el-step__icon
          background-color #e6e7e9
          .el-step__icon-inner
            font-size: 16px
        .el-step__title
          font-weight normal
        .el-step__description
          color:#282a2a6e
  .el-table .el-table__expanded-cell:hover
    background-color #e6e7e9!important
  .el-upload--picture-card
    width 120px
    height 120px
    line-height 120px
    margin-right 10px
  .table-expand
    display: flex
    flex-direction: row
    justify-content: space-between
    align-items: center
    padding-bottom: 10px
    .expand-image
      width 50%
      padding-left: 10px
      line-height 0
      >div
        width 100%
        height 120px
        margin-right 10px
        border-radius: 6px
        overflow: hidden
        img
          width 120px
          height 120px
          border-radius 6px
    .expand-upload
      width 50%
      padding-left 10px
      border-left 1px dotted #ccc
      overflow: hidden
      .expand-upload--head
        display: flex
        justify-content: space-between
        align-items: center
        >div
          padding-right 50px
      .expand-upload--main
        display: flex
        flex-direction: row
        height 120px
        .expand-upload--preview
          display: flex
          flex-direction: row
          margin-right 10px
          border-radius: 6px
          overflow: hidden
    .__view
      display: flex
      flex-direction: row
      align-items: center
      width 100%
      height 100%
      .expand-image--img
        position: relative
        height 120px
        margin-right 10px
        border-radius: 6px
        overflow: hidden
        flex-shrink: 0
        .expand-image--mask
          display: flex
          justify-content: space-evenly
          flex-direction: row
          align-items: center
          position: absolute
          width auto
          height 120px
          top 0
          left 0
          right: 0
          bottom: 0
          background-color: rgba(0,0,0,.5)
          scale: (0)
          transition: .3s  all
          span
            cursor: pointer
      .expand-image--img:hover .expand-image--mask
        scale: (1)
</style>
