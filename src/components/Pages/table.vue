<template>
  <div id="Index">
    <div class="action">
      <div class="title">{{$route.meta[0]}}</div>
      <el-button class="btn" type="primary" icon="el-icon-download">下载</el-button>
      <el-input 
      class="search"
      placeholder="请输入内容"
      prefix-icon="el-icon-search"
      v-model="searchVal">
      </el-input>
    </div>
    <el-table
      class="table"
      ref="multipleTable"
      :data="tableData"
      border
      tooltip-effect="dark"
      style="width: 100%"
      @filter-change="filterChange"
      @sort-change="sortChange"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="num"
        label="编号" >
      </el-table-column>
      <el-table-column
        prop="date"
        label="时间">
      </el-table-column>
      <el-table-column
        prop="company"
        label="厂家">
      </el-table-column>
      <el-table-column
        sortable="custom"
        prop="budgetAmount"
        label="预算金额(元)">
        <template slot-scope="scope">
          <p style="text-align: right;">{{scope.row.budgetAmount.toLocaleString()}}</p>
        </template>
      </el-table-column>
      <el-table-column
        sortable="custom"
        prop="createAmount"
        label="生产金额(元)">
        <template slot-scope="scope">
          <p style="text-align: right;">{{scope.row.createAmount.toLocaleString()}}</p>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        column-key="STATUS"
        :filters="[{ text: '未完成', value: 0 }, { text: '已完成', value: 1 }]"
        :filter-multiple="false"
        label="状态">
        <template slot-scope="scope">
          <p style="color: #f56c6c;" v-if="scope.row.status == 0">未完成</p>
          <p style="color: #67c23a;" v-if="scope.row.status == 1">已完成</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width='200' fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" class="ac-btn" @click="handleEdit(scope.row, scope.$index)">编辑</el-button>
          <el-button size="mini" class="ac-btn" type="danger">删除</el-button>
          <el-button size="mini" class="ac-btn" type="primary" @click="checkDetails(scope.row.num)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      @prev-click="currentChange" 
      @next-click="currentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="searchData.length">
    </el-pagination>

    <el-dialog title="编辑数据" :visible.sync="editVisible" :modal-append-to-body="false">
      <el-form :model="form">
        <el-form-item label="厂家" :label-width="formLabelWidth">
          <el-input v-model="form.company" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="预算金额(元)" :label-width="formLabelWidth">
          <el-input v-model="form.budgetAmount" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="生产金额(元)" :label-width="formLabelWidth">
          <el-input v-model="form.createAmount" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-select v-model="form.status == 0 ? '未完成' : '已完成'" placeholder="请选择状态">
            <el-option label="未完成" value="0"></el-option>
            <el-option label="已完成" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editSuccess">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import api from './../../axios/index.js'
  export default {
    data () {
      return {
        searchVal: '',
        data: [],
        searchData: [],
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        multipleSelection: [],
        showEdit: false,
        scopeData: '',
        editVisible: false,
        form: {
          name: '',
          region: '',
        },
        index: '',
        formLabelWidth: '120px',
        prop: '',
        order: ''
      }
    },
    mounted(){
      this.getData();
    },
    methods: {
      getData(){
        api.$http('/news/index', '')
        .then( res => {
          this.data = res.data;
          this.searchData = res.data;
          this.tableData = this.searchData.slice(0, 10)
        }).catch(err => {
          console.log(err)
        })
      },
      sizeChange(val){
        this.pageSize = 1;
        this.pageSize = val;
        this.tableData = this.searchData.slice((this.currentPage -1)*val, this.currentPage*val)
      },
      currentChange(page){
        this.currentPage = page;
        this.tableData = this.searchData.slice((page-1)*this.pageSize, page*this.pageSize)
      },
      handleEdit(row, index){
        this.editVisible = true;
        this.form = row;
        this.index = index;
      },
      editSuccess(){
        this.editVisible = false;
        this.searchData[this.index] = this.form;
      },
      dialogEditVisible(){

      },
      handleSelectionChange(val){
        this.multipleSelection = val
      },
      sortChange(obj){
          // console.log(obj)
          this.prop = obj.prop;
          this.order = obj.order;
          this.setSort(this.prop, this.order, this.searchData);
      },
      setSort(prop, order, data){
        if(order == 'descending') {
          data.sort((a,b) => {
            return b[prop] - a[prop]
          })
        }else  if(order == 'ascending') {
          data.sort((a,b) => {
            return a[prop] - b[prop]
          })
        }
        this.tableData = this.searchData.slice((this.currentPage -1)*this.pageSize, this.currentPage*this.pageSize)
      },
      filterChange(filters){
        let val = filters.STATUS[0];
        let filterArr = [];
        if(val == 0 || val == 1){
          filterArr = this.data.filter(item => {
            return item.status == val
          })
        }else {
          filterArr = this.data
        }
        console.log(filterArr)
        this.searchData = filterArr;
        this.tableData = this.searchData.slice((this.currentPage -1)*this.pageSize, this.currentPage*this.pageSize)
      },
      checkDetails(row){
        this.$router.push({
          path: '/details',
          query: {
            id: row
          }
        })
      }
    }
  }
</script>
<style>
  .el-table th {
    padding: 8px 0;
  }
  .el-table td  {
    padding: 4px 0;
  }  
</style>
<style lang="less" scoped>
  .action {
    overflow: hidden;
    .title {
      padding-left: 20px;
      float: left;
      line-height: 40px;
    }
    .el-button {
      float: right;
      margin-right: 20px;
    }
    .el-input {
      float: right;
      margin-right: 20px;
      width: 300px;
    }
  }
  .table {
    margin-top: 20px;
  }
  .el-pagination {
    float: right;
    margin-top: 10px;
  }
  .ac-btn {
    padding: 4px 8px;
  }
</style>