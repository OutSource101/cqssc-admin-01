<template>
  <div class="app-container">
    <el-input @keyup.enter.native="" style="width: 200px;margin-right: 10px" class="filter-item" placeholder="盘口名称" v-model="listQuery.title">
    </el-input>
    <el-button class="filter-item" style="margin-bottom: 20px;" @click="handleCreate" type="primary" icon="user">添加新盘口</el-button>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="拼命加载中" border fit highlight-current-row>
      <el-table-column align="center" label='ID'>
        <template scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>

      <el-table-column label="盘口名称" align="center">
        <template scope="scope">
          <span>{{scope.row.author}}</span>
        </template>
      </el-table-column>
      <el-table-column label="排序" align="center">
        <template scope="scope">
          {{scope.row.pageviews}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-button size="small" type="danger" icon="delete">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        title: null
      }
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList(this.listQuery).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },
    handleCreate() {
    }
  }
}
</script>
