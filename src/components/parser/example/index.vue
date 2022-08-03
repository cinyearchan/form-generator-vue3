<template>
  <div class="test-form">
    <parser :form-conf="formConf" @submit="submitForm1"></parser>
    <!-- <parser :key="key2" :form-conf="formConf" @submit="submitForm2"></parser> -->
    <!-- <el-button @click="change"> change </el-button> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/runtime-core"
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const Parser = require("../parser.js")
import Parser from "../parser"

export default defineComponent({
  name: "ParseExample",
  components: {
    Parser
  },
  props: {},
  data() {
    return {
      key2: +new Date(),
      formConf: {
        fields: [
          {
            __config__: {
              label: "单行文本",
              labelWidth: null,
              showLabel: true,
              changeTag: true,
              tag: "el-input",
              tagIcon: "input",
              required: true,
              layout: "colFormItem",
              span: 24,
              document: "https://element.eleme.cn/#/zh-CN/component/input",
              regList: [
                {
                  pattern: "/^1(2|4|5|6|7|8|9)\\d{9}$/",
                  message: "手机号格式错误"
                }
              ]
            },
            __slot__: {
              prepend: "",
              append: ""
            },
            __vModel__: "mobile",
            placeholder: "请输入手机号",
            style: {
              width: "100%"
            },
            clearable: true,
            "prefix-icon": "el-icon-mobile",
            "suffix-icon": "",
            mexlength: 11,
            "show-word-limit": true,
            readonly: false,
            disabled: false
          }
        ],
        __methods__: {
          clickTestButton1() {
            console.log(123123)
          }
        },
        formRef: "elForm",
        formModel: "formData",
        size: "small",
        labelPosition: "right",
        labelWidth: 100,
        formRules: "rules",
        gutter: 15,
        disabled: false,
        span: 24,
        formBtns: true,
        unFocusedComponentBorder: false
      },
      formConf2: {
        fields: [
          {
            __config__: {
              label: "日期范围",
              tag: "el-date-picker",
              tagIcon: "date-range",
              defaultValue: null,
              span: 24,
              showLabel: true,
              labelWidth: null,
              required: true,
              layout: "colFormItem",
              regList: [],
              changeTag: true,
              document:
                "https://element.eleme.cn/#/zh-CN/component/date-picker",
              formId: 101,
              renderKey: 1585980082729
            },
            style: {
              width: "100%"
            },
            type: "daterange",
            "range-separator": "至",
            "start-placeholder": "开始日期",
            "end-placeholder": "结束日期",
            disabled: false,
            clearable: true,
            format: "yyyy-MM-dd",
            "value-format": "yyyy-MM-dd",
            readonly: false,
            __vModel__: "field101"
          }
        ],
        formRef: "elForm",
        formModel: "formData",
        size: "small",
        labelPosition: "right",
        labelWidth: 100,
        formRules: "rules",
        gutter: 15,
        disabled: false,
        span: 24,
        formBtns: true,
        unFocusedComponentBorder: false
      }
    }
  },
  computed: {},
  watch: {},
  mounted() {
    // 表单数据回填，模拟异步请求场景
    setTimeout(() => {
      // 请求回来的表单数据
      const data = {
        mobile: "18812345678"
      }
      // 回填数据
      this.fillFormData(this.formConf, data)
      // 更新表单
      this.key2 = +new Date()
    }, 2000)
  },
  methods: {
    fillFormData(form: any, data: any) {
      form.fields.forEach((item: any) => {
        const val = data[item.__vModel__]
        if (val) {
          item.__config__.defaultValue = val
        }
      })
    },
    // change() {
    //   this.key2 = +new Date()
    //   const t = this.formConf
    //   this.formConf = this.formConf2
    //   this.formConf2 = t
    // },
    submitForm1(data: any) {
      console.log("submitForm1 提交的数据：", data)
    },
    submitForm2(data: any) {
      console.log("submitForm2 提交的数据：", data)
    }
  }
})
</script>
