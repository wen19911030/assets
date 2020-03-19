<!-- 基础组件 -->
<template>
  <div class="table-container" :class="[{'table-scrollable-x': scrollX, 'table-scrollable-y': scrollY, sticky: sticky && isIos}]">
    <div v-if="showHeader" class="table-header-wrapper" :class="{isFixed: titleFixed}" ref="headerWrapper" :style="{top: sticky && typeof headerTop === 'number' ? headerTop+'px': ''}">
      <table ref="tableHeader" :style="{
          width: bodyWidth ? bodyWidth + 'px' : ''
        }">
        <colgroup>
          <col v-for="(item, index) in targetColumns" :key="index" :align="item.headerAlign" :width="item.width">
        </colgroup>
        <thead>
          <tr v-for="(item, index) in tableHeaderData" :key="index">
            <th v-for="(one, i) in item" :key="i" :colspan="one.colspan" :rowspan="one.rowspan" :class="[{'is-hidden': one.fixed}, 'is-'+one.headerAlign]">
              <div class="cell" v-html="one.label"></div>
            </th>
          </tr>
        </thead>
      </table>
    </div>
    <!-- headerWrapper元素fixed, bodyWrapper跳动 -->
    <div v-if="showHeader" v-show="titleFixed" :style="{height: headerHeight ? headerHeight+'px': ''}"></div>

    <div class="table-body-wrapper" ref="bodyWrapper" :class="[scrollX ? `is-scrolling-${scrollPosition}` : 'is-scrolling-none']" :style="bodyWrapperStyle">
      <table ref="tableBody" :style="{
           width: bodyWidth ? bodyWidth + 'px' : ''
        }">
        <colgroup>
          <col v-for="(item, index) in targetColumns" :key="index" :align="item.align" :width="item.width">
        </colgroup>
        <tbody>
          <tr v-for="(item, index) in tableBodyData" :key="index" :class="{'sub-table': !!item.originData.parent}">
            <td v-for="(one, i) in item.data" :colspan="one.colspan" :rowspan="one.rowspan" :key="i" :class="[{'is-hidden': one.fixed}, 'is-' + one.align]">
              <slot :name="`col${i}`" v-bind:cell="one">
                <div class="cell" @click.stop="toggleSubTable(item, index)" :class="item.originData.isOpend?'is-open':'is-close'" v-if="i===0 && item.originData.children && item.originData.children.length>0">{{one.value}} <b class="more-btn"></b></div>
                <div class="cell" v-else>{{one.value}} </div>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="table-fixed-wrapper" v-if="fixedColumns.length > 0" ref="leftFixedWrapper" :class="{moved: scrollPosition==='left'}" :style="{
        width: fixedWrapperWidth ? fixedWrapperWidth + 'px' : ''
        }">
      <div v-if="showHeader" class="table-left-fixed-header-wrapper" ref="fixedHeaderWrapper" :class="{isFixed: titleFixed}" :style="{
          top: typeof headerTop === 'number' ? headerTop+'px': '',
          width: fixedWrapperWidth ? fixedWrapperWidth + 'px' : ''
          }">
        <table ref="fixedTableHeader" :style="{width: bodyWidth ? bodyWidth + 'px' : ''}">
          <colgroup>
            <col v-for="(item, index) in targetColumns" :key="index" :align="item.headerAlign" :width="item.width">
          </colgroup>
          <thead>
            <tr v-for="(item, index) in tableHeaderData" :key="index">
              <th v-for="(one, i) in item" :key="i" :colspan="one.colspan" :rowspan="one.rowspan" :class="[{'is-hidden': !one.fixed, 'is-fixed-last': i == fixedColumns.length - 1}, 'is-'+one.headerAlign]">
                <div class="cell" v-html="one.label"></div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <!-- fixedHeaderWrapper元素fixed, fixedBodyWrapper跳动 -->
      <div v-if="showHeader" v-show="titleFixed" :style="{height: headerHeight ? headerHeight+'px': '', width: fixedWrapperWidth ? fixedWrapperWidth + 'px' : ''}"></div>
      <div class="table-left-fixed-body-wrapper" ref="fixedBodyWrapper" :style="{height: fixedBodyHeight ? fixedBodyHeight + 'px' : ''}">
        <table ref="fixedTableBody" :style="{
           width: bodyWidth ? bodyWidth + 'px' : ''
        }">
          <colgroup>
            <col v-for="(item, index) in targetColumns" :key="index" :align="item.align" :width="item.width">
          </colgroup>
          <tbody>
            <tr v-for="(item, index) in tableBodyData" :key="index" :class="{'sub-table': !!item.originData.parent}">
              <td v-for="(one, i) in item.data" :key="i" :colspan="one.colspan" :rowspan="one.rowspan" :class="[{'is-hidden': !one.fixed, 'is-fixed-last': i == fixedColumns.length - 1}, 'is-' + one.align]">
                <slot :name="`col${i}`" v-bind:cell="one">
                  <div class="cell" @click.stop="toggleSubTable(item, index)" :class="item.originData.isOpend?'is-open':'is-close'" v-if="i===0 && item.originData.children && item.originData.children.length>0">{{one.value}} <b class="more-btn"></b></div>
                  <div class="cell" v-else :class="{'spec-size': one.value == '回收金额（万）'}">{{one.value}}</div>
                </slot>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { throttle } from 'throttle-debounce';
import { parseHeight } from '@/assets/js/utils';

export default {
  name: 'basic-table',
  props: {
    tableData: {
      type: Array,
    },
    // 仅支持1层嵌套
    columns: {
      type: Array,
      default: () => [
        {
          label: '',
          field: '',
          fixed: false,
          hide: false,
          filter: () => {},
          width: '',
          textAlign: '',
          children: [],
        },
      ],
    },
    width: [String, Number],
    height: [String, Number],
    maxHeight: [String, Number],
    headerTop: {
      type: [String, Number],
      default: 108,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    sticky: {
      type: Boolean,
      default: true,
    },
    spanMethod: {
      type: Function,
    },
  },
  data() {
    return {
      layout: {},
      isLeftFixed: false,
      isRightFixed: false,
      tableHeaderData: [],
      tableBodyData: [],
      targetColumns: [],
      fixedColumns: [],
      rightFixedColumns: [],
      fixedWrapperWidth: null,
      bodyWidth: null,
      bodyHeight: null,
      fixedBodyHeight: null,
      scrollX: false,
      scrollY: false,
      titleFixed: false,
      scrollPosition: 'right',
      baseSize: 60,
      headerHeight: null,
    };
  },
  computed: {
    isIos() {
      return this.$store.state.platform === 'ios';
    },
    shouldUpdateHeight() {
      return (
        this.height
        || this.maxHeight
        || this.fixedColumns.length > 0
        || this.rightFixedColumns.length > 0
      );
    },
    bodyWrapperStyle() {
      const obj = {};
      if (this.bodyHeight) {
        if (this.height) {
          obj.height = `${ this.bodyHeight }px`;
        }
        if (this.maxHeight) {
          obj['max-height'] = `${ Math.max(
            this.bodyHeight,
            this.maxHeight - this.headerHeight,
          ) }px`;
        }
      }
      return obj;
    },
  },
  watch: {
    columns: {
      handler(newV) {
        this.createTableHeader(newV);
        this.createTableBody();
        this.$nextTick(() => {
          this.doLayout();
        });
      },
      deep: true,
    },
    tableData: {
      handler() {
        this.createTableBody();
        this.$nextTick(() => {
          this.doLayout();
          this.bodyScrollFunc();
        });
      },
    },
    height: {
      handler(value) {
        this.setHeight(value);
      },
      immediate: true,
    },
    maxHeight: {
      handler(value) {
        this.setMaxHeight(value);
      },
      immediate: true,
    },
  },
  created() {
    this.createTableHeader(this.columns);
  },
  mounted() {
    // 绑定事件
    this.$refs.bodyWrapper.addEventListener(
      'touchstart',
      this.startFunc.bind(this),
    );
    this.$refs.bodyWrapper.addEventListener(
      'touchmove',
      this.moveFunc.bind(this),
    );
    this.$refs.bodyWrapper.addEventListener(
      'touchend',
      this.endFunc.bind(this),
    );

    if (this.sticky && !this.isIos) {
      window.addEventListener('scroll', this.handleScroll.bind(this));
    }
    // 设置每个单元宽度
    this.updateColumnsWidth();

    this.doLayout();
  },
  beforeDestroyed() {
    this.$refs.bodyWrapper.removeEventListener(
      'touchstart',
      this.startFunc.bind(this),
    );
    this.$refs.bodyWrapper.removeEventListener(
      'touchmove',
      this.moveFunc.bind(this),
    );
    this.$refs.bodyWrapper.removeEventListener(
      'touchend',
      this.endFunc.bind(this),
    );
    if (this.sticky && !this.isIos) {
      window.removeEventListener('scroll', this.handleScroll.bind(this));
    }
  },
  methods: {
    startFunc() {},
    moveFunc: throttle(17, function () {
      this.bodyScrollFunc();
    }),
    endFunc() {
      setTimeout(() => {
        this.bodyScrollFunc();
      }, 500);
    },
    bodyScrollFunc() {
      if (typeof this.$refs.bodyWrapper !== 'object') {
        return;
      }
      const { scrollLeft, scrollTop } = this.$refs.bodyWrapper;
      if (scrollLeft > 0) {
        this.scrollPosition = 'left';
      } else {
        this.scrollPosition = 'right';
      }
      this.$refs.tableHeader.style.transform = `translate3d(${ -scrollLeft }px, 0, 0)`;
      if (this.$refs.fixedTableBody && this.$refs.fixedTableBody.style) {
        this.$refs.fixedTableBody.style.transform = `translate3d(0, ${ -scrollTop }px, 0)`;
      }
      if (typeof this.$listeners === 'object' && this.$listeners['update:position']) {
        this.$emit('update:position', {
          left: scrollLeft,
          top: scrollTop,
        });
      }
    },
    handleScroll: throttle(17, function () {
      if (this.isIos) {
        this.titleFixed = false;
        return;
      }
      const offsetTop = this.$el.getBoundingClientRect().top;
      this.titleFixed = offsetTop <= Number(this.headerTop);
    }),
    createTableHeader(columns = []) {
      // 过滤掉需要隐藏的元素
      let filterColumns = columns.filter((item) => !item.hide);
      filterColumns.forEach((item) => {
        if (Array.isArray(item.children) && item.children.length > 0) {
          item.children = item.children.filter((one) => !one.hide);
        }
      });
      // 固定列不支持嵌套 重新排列
      const leftFixedColumns = filterColumns.filter(
        (column) => column.fixed === true || column.fixed === 'left',
      );
      const rightFixedColumns = filterColumns.filter(
        (column) => column.fixed === 'right',
      );
      const notFixedColumns = filterColumns.filter(
        (column) => !column.fixed,
      );
      filterColumns = [].concat(leftFixedColumns).concat(notFixedColumns).concat(rightFixedColumns);
      this.updateColumns(filterColumns);

      // 判断columns是否是二级表头
      const isExistChildren = filterColumns.some(
        (col) => Array.isArray(col.children) && col.children.length > 0,
      );
      // 生成表头，对每个单元格设置colspan rowspan
      const arr = isExistChildren ? [[], []] : [[]];
      for (const col of filterColumns) {
        const obj = Object.assign(
          {
            headerAlign: 'right',
            align: 'right',
            colspan: 1,
            rowspan: 1,
          },
          col,
        );
        // 如果该列存在子节点，对子节点进行处理
        if (Array.isArray(col.children) && col.children.length > 0) {
          obj.colspan = col.children.length;
          const arr2 = col.children.map((item) => Object.assign(
            {
              headerAlign: 'right',
              align: 'right',
              colspan: 1,
              rowspan: 1,
            },
            item,
          ));
          arr[1].push(...arr2);
        } else if (isExistChildren) {
          obj.rowspan = 2;
        }
        arr[0].push(obj);
      }
      this.tableHeaderData = arr;
    },
    updateColumns(filterColumns) {
      // 扁平化columns，将原columns转为一级表头
      this.flattenColumns = this.flatColumns(filterColumns).map((item) => {
        const obj = Object.assign(
          {
            headerAlign: 'right',
            align: 'right',
          },
          item,
        );
        return obj;
      });
      this.fixedColumns = this.flattenColumns.filter(
        (column) => column.fixed === true || column.fixed === 'left',
      );
      this.rightFixedColumns = this.flattenColumns.filter(
        (column) => column.fixed === 'right',
      );
      const notFixedColumns = this.flattenColumns.filter(
        (column) => !column.fixed,
      );
      this.targetColumns = []
        .concat(this.fixedColumns)
        .concat(notFixedColumns)
        .concat(this.rightFixedColumns);
    },
    getOneData(item, rowIndex) {
      const temp = {};
      temp.originData = item;
      temp.data = this.targetColumns.map((one, colIndex) => {
        const { rowspan = 1, colspan = 1 } = this.getSpan(item, one, rowIndex, colIndex);
        const obj = Object.assign({}, one);
        obj.row = item;
        obj.rowspan = rowspan;
        obj.colspan = colspan;
        if (
          obj.filter
          && typeof this.$options.filters[obj.filter] === 'function'
        ) {
          obj.value = this.$options.filters[obj.filter](item[obj.field]);
        } else {
          obj.value = item[obj.field];
        }
        return obj;
      });
      return temp;
    },
    getSpan(row, column, rowIndex, columnIndex) {
      let rowspan = 1;
      let colspan = 1;
      const fn = this.spanMethod;
      if (typeof fn === 'function') {
        const result = fn({
          row, column, rowIndex, columnIndex,
        });
        if (typeof result === 'object') {
          rowspan = result.rowspan;
          colspan = result.colspan;
        }
      }
      return { rowspan, colspan };
    },
    // 扁平化表头
    flatColumns(columns) {
      const result = [];
      columns.forEach((item) => {
        if (item.children) {
          result.push(...this.flatColumns(item.children));
        } else {
          result.push(item);
        }
      });
      return result;
    },
    // 扁平化表格数据，只扁平化一层
    flatTable(data) {
      const result = [];
      data.forEach((item, i) => {
        result.push(this.getOneData(item, i));
        if (item.isOpend && item.children) {
          result.push(...this.flatTable(item.children));
        }
      });
      return result;
    },
    createTableBody() {
      this.tableBodyData = this.flatTable(this.tableData);
    },
    // 二级表格展开或取消
    toggleSubTable(row, i) {
      if (row.originData.isOpend) {
        const len = (row.originData.children && row.originData.children.length) || 0;
        this.tableBodyData.splice(i + 1, len);
      } else {
        const copyArr = row.originData.children.map((item, index) => this.getOneData(item, index));
        this.tableBodyData.splice(i + 1, 0, ...copyArr);
      }
      row.originData.isOpend = !row.originData.isOpend;
      this.$nextTick(() => {
        this.moveFunc();
        this.updateElsHeight();
      });
    },
    doLayout() {
      if (this.shouldUpdateHeight) {
        this.updateElsHeight();
      }
      this.updateColumnsWidth();
    },
    // 计算表格内元素的高度
    updateElsHeight() {
      const { headerWrapper } = this.$refs;
      if (this.showHeader && !headerWrapper) {
        return;
      }
      // eslint-disable-next-line no-multi-assign
      const headerHeight = (this.headerHeight = this.showHeader
        ? headerWrapper.offsetHeight
        : 0);
      // eslint-disable-next-line no-multi-assign
      const tableHeight = (this.tableHeight = this.$el.clientHeight);
      if (this.height !== null) {
        this.bodyHeight = tableHeight - headerHeight;
      }
      this.fixedBodyHeight = this.bodyHeight;
      this.viewportHeight = tableHeight;
    },
    // 计算每列的实际宽度
    updateColumnsWidth() {
      const bodyWidth = this.$el.clientWidth;
      let bodyMinWidth = 0;
      const { targetColumns } = this;
      const flexColumns = targetColumns.filter(
        (column) => typeof column.width !== 'number',
      );
      targetColumns.forEach((column) => {
        column.minWidth = column.minWidth || this.baseSize;
        if (typeof column.width === 'number') {
          column.realWidth = column.width;
        }
      });
      if (flexColumns.length > 0) {
        targetColumns.forEach((column) => {
          bodyMinWidth += column.width || column.minWidth;
        });

        if (bodyMinWidth <= bodyWidth) {
          this.scrollX = false;
          const totalFlexWidth = bodyWidth - bodyMinWidth;

          if (flexColumns.length === 1) {
            flexColumns[0].realWidth = flexColumns[0].minWidth + totalFlexWidth;
          } else {
            const allColumnsWidth = flexColumns.reduce(
              (prev, column) => prev + column.minWidth,
              0,
            );
            const flexWidthPerPixel = totalFlexWidth / allColumnsWidth;
            let noneFirstWidth = 0;

            flexColumns.forEach((column, index) => {
              if (index === 0) return;
              const flexWidth = Math.floor(column.minWidth * flexWidthPerPixel);
              noneFirstWidth += flexWidth;
              column.realWidth = column.minWidth + flexWidth;
            });

            flexColumns[0].realWidth = flexColumns[0].minWidth + totalFlexWidth - noneFirstWidth;
          }
        } else {
          this.scrollX = true;
          flexColumns.forEach((column) => {
            column.realWidth = column.minWidth;
          });
        }
        this.bodyWidth = Math.max(bodyMinWidth, bodyWidth);
      } else {
        targetColumns.forEach((column) => {
          column.realWidth = column.width || column.minWidth;
          bodyMinWidth += column.realWidth;
        });
        this.scrollX = bodyMinWidth > bodyWidth;
        this.bodyWidth = Math.max(bodyWidth, bodyMinWidth);
      }
      this.targetColumns.forEach((item) => {
        item.width = targetColumns.find(
          (one) => one.field === item.field,
        ).realWidth;
      });
      this.fixedWrapperWidth = this.fixedColumns.map((item) => item.width || 0).reduce((pre, cur) => pre + cur, 0);
    },
    setHeight(val, prop = 'height') {
      const el = this.$el;
      const value = parseHeight(val);

      if (!el && (value || value === 0)) {
        return this.$nextTick(() => this.setHeight(value, prop));
      }
      this.scrollY = true;

      if (typeof value === 'number') {
        el.style[prop] = `${ value }px`;
        this.updateElsHeight();
      } else if (typeof value === 'string') {
        el.style[prop] = value;
        this.updateElsHeight();
      }
      return null;
    },
    setMaxHeight(value) {
      this.setHeight(value, 'max-height');
    },
  },
};
</script>

<style lang="less" scoped>
.table-container {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  -webkit-overflow-scrolling: none;
  width: 100%;
  min-width: 100%;
  background: #ffffff;
  &.table-scrollable-x,
  &.table-scrollable-y {
    overflow: auto;
    .table-body-wrapper {
      overflow: auto;
    }
  }
}
table {
  table-layout: fixed;
  border-collapse: separate;
}
.table-header-wrapper,
.table-left-fixed-header-wrapper {
  overflow: hidden;
}
tr {
  background: #ffffff;
}
thead tr {
  background: #cbd9e2;
}
tbody tr:nth-child(even) {
  background: #eff3f6;
}
th,
td {
  padding: 7px 0;
  min-width: 0;
  box-sizing: border-box;
  text-overflow: ellipsis;
  vertical-align: middle;
  position: relative;
  text-align: left;
  border-right: 0.5px solid #ffffff;
  &:last-child {
    border-right: none;
  }
  &.is-left {
    text-align: left;
    .cell {
      padding-left: 5px;
      padding-right: 0;
    }
  }
  &.is-center {
    text-align: center;
    div.cell {
      padding-left: 0;
      padding-right: 0;
    }
  }
  &.is-right {
    text-align: right;
    .cell,
    &:first-child .cell {
      padding-left: 0;
      padding-right: 5px;
    }
  }
}
tbody tr.sub-table {
  background: #f1f1f1;
}
.cell {
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  word-break: break-all;
  padding-right: 5px;
  line-height: 18px;
}
td:first-child .cell,
th:first-child .cell {
  padding-left: 10px;
  padding-right: 0;
}
td:last-child .cell,
th:last-child .cell {
  padding-right: 10px;
  padding-left: 0;
}
th {
  color: #265e70;
  font-size: 14px;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  user-select: none;
  > .cell {
    display: inline-block;
    position: relative;
    vertical-align: middle;
  }
}
// 二层表头
.table-container thead tr:first-child:nth-last-child(2),
.table-container thead tr ~ tr {
  th {
    padding: 3px 0;
  }
  th[colspan='2'][rowspan='1'],
  th[colspan='3'][rowspan='1'],
  th[colspan='4'][rowspan='1'],
  th[colspan='5'][rowspan='1']{
    border-bottom: 0.5px solid #fff;
  }
  th:first-child:nth-last-child(2),
  th ~ th {
    border-right: 0.5px solid #ffffff;
  }
}
tr td:nth-child(even) {
  color: #0090c6;
}
// 展开关闭按钮
.more-btn {
  position: absolute;
  display: inline-block;
  width: 0;
  height: 0;
  right: 6px;
  top: 8px;
  border: 3px solid;
  border-color: transparent transparent currentColor currentColor;
  transform: rotate(135deg);
  opacity: 0.8;
}
.is-open {
  color: #0090c6;
}
.is-close .more-btn {
  transform: rotate(-45deg);
  top: 5px;
}
.is-open,
.is-close {
  position: relative;
  padding-right: 10px;
  white-space: nowrap;
}
.table-fixed-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  z-index: 1;
  &.moved {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.12);
    .is-fixed-last,
    .table-left-fixed-header-wrapper .is-fixed-last {
      border-right-color: transparent;
    }
  }
}
.tableFontSize {
  font-size: 14px;
}
.table-left-fixed-body-wrapper,
.table-left-fixed-header-wrapper {
  overflow: hidden;
}
.is-hidden > * {
  visibility: hidden;
}

.table-container.sticky {
  overflow: inherit;
  .table-fixed-wrapper {
    overflow: inherit;
  }
  .table-header-wrapper,
  .table-left-fixed-header-wrapper {
    position: sticky;
    top: 60px;
    z-index: 1;
  }
}
.isFixed {
  position: fixed;
  z-index: 1;
}
.cell a {
  color: #0079ff;
}
.spec-size {
  font-size: 12px;
}
[colspan="0"], [rowspan="0"]{
  display: none!important;
}
</style>
