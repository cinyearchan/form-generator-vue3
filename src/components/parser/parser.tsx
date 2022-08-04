import { deepClone } from "@/utils/index"
import render from "@/components/render/render"
import { defineComponent, h } from "vue"

type IElTag =
  | "el-input"
  | "el-input-number"
  | "el-select"
  | "el-radio-group"
  | "el-checkbox-group"
  | "el-cascader"
  | "el-time-picker"
  | "el-date-picker"
  | "el-rate"

const ruleTrigger: {
  [K in IElTag]: string
} = {
  "el-input": "blur",
  "el-input-number": "blur",
  "el-select": "change",
  "el-radio-group": "change",
  "el-checkbox-group": "change",
  "el-cascader": "change",
  "el-time-picker": "change",
  "el-date-picker": "change",
  "el-rate": "change"
}

const layouts = {
  colFormItem(h: any, scheme: any) {
    const config = scheme.__config__
    const listeners = buildListeners.call(this, scheme)

    let labelWidth = config.labelWidth ? `${config.labelWidth}px` : null
    if (config.showLabel === false) labelWidth = "0"
    return (
      <el-col span={config.span}>
        <el-form-item
          label-width={labelWidth}
          prop={scheme.__vModel__}
          label={config.showLabel ? config.label : ""}
        >
          <render conf={scheme} on={listeners} />
        </el-form-item>
      </el-col>
    )
  },
  rowFormItem(h: any, scheme: any) {
    let child = renderChildren.apply(this, [h, scheme])
    if (scheme.type === "flex") {
      child = (
        <el-row
          type={scheme.type}
          justify={scheme.justify}
          align={scheme.align}
        >
          {child}
        </el-row>
      )
    }
    return (
      <el-col span={scheme.span}>
        <el-row gutter={scheme.gutter}>{child}</el-row>
      </el-col>
    )
  }
}

// function renderForm(h) {
//   const formConfCopy = this.formConfCopy
//   console.log("renderForm")
//   return (
//     <el-row gutter={formConfCopy.gutter}>
//       <el-form
//         size={formConfCopy.size}
//         label-position={formConfCopy.labelPosition}
//         disabled={formConfCopy.disabled}
//         label-width={`${formConfCopy.labelWidth}px`}
//         ref={formConfCopy.formRef}
//         // model不能直接赋值 https://github.com/vuejs/jsx/issues/49#issuecomment-472013664
//         props={{ model: this[formConfCopy.formModel] }}
//         rules={this[formConfCopy.formRules]}
//       >
//         {renderFormItem.call(this, h, formConfCopy.fields)}
//         {formConfCopy.formBtns && formBtns.call(this, h)}
//       </el-form>
//     </el-row>
//   )
// }

function formBtns(h: any) {
  return (
    <el-col>
      <el-form-item size="large">
        <el-button type="primary" onClick={this.submitForm}>
          提交
        </el-button>
        <el-button onClick={this.resetForm}>重置</el-button>
      </el-form-item>
    </el-col>
  )
}

type ILayout = "colFormItem" | "rowFormItem"

function renderFormItem(h: any, elementList: any) {
  return elementList.map((scheme: any) => {
    const config = scheme.__config__ as { layout: ILayout }
    const layout = layouts[config.layout]

    if (layout) {
      return layout.call(this, h, scheme)
    }
    throw new Error(`没有与${config.layout}匹配的layout`)
  })
}

function renderChildren(h, scheme) {
  const config = scheme.__config__
  if (!Array.isArray(config.children)) return null
  return renderFormItem.call(this, h, config.children)
}

function setValue(event: string, config, scheme) {
  this.$set(config, "defaultValue", event)
  this.$set(this[this.formConf.formModel], scheme.__vModel__, event)
}

function buildListeners(scheme) {
  const config = scheme.__config__
  const methods = this.formConf.__methods__ || {}
  const listeners: { [propName: string]: (event: string) => void } = {}

  // 给__methods__中的方法绑定this和event
  Object.keys(methods).forEach(key => {
    listeners[key] = (event: string) => methods[key].call(this, event)
  })
  // 响应 render.js 中的 vModel $emit('input', val)
  listeners.input = (event: string) =>
    setValue.call(this, event, config, scheme)

  return listeners
}

export default defineComponent({
  components: {
    render
  },
  props: {
    formConf: {
      type: Object,
      required: true
    }
  },
  data() {
    const data = {
      formConfCopy: deepClone(this.formConf),
      [this.formConf.formModel]: {},
      [this.formConf.formRules]: {}
    }
    this.initFormData(data.formConfCopy.fields, data[this.formConf.formModel])
    this.buildRules(data.formConfCopy.fields, data[this.formConf.formRules])
    console.log("data", data)
    return data
  },
  methods: {
    initFormData(componentList: any, formData: any) {
      componentList.forEach((cur: any) => {
        const config = cur.__config__
        if (cur.__vModel__) formData[cur.__vModel__] = config.defaultValue
        if (config.children) this.initFormData(config.children, formData)
      })
    },
    buildRules(componentList: any, rules: any) {
      componentList.forEach((cur: any) => {
        const config = cur.__config__
        if (Array.isArray(config.regList)) {
          if (config.required) {
            const required = {
              required: config.required,
              message: cur.placeholder
            } as any
            if (Array.isArray(config.defaultValue)) {
              required.type = "array"
              required.message = `请至少选择一个${config.label}`
            }
            required.message === undefined &&
              (required.message = `${config.label}不能为空`)
            config.regList.push(required)
          }
          rules[cur.__vModel__] = config.regList.map(
            (item: { pattern: any; trigger: string | undefined }) => {
              item.pattern && (item.pattern = eval(item.pattern))
              item.trigger = ruleTrigger && ruleTrigger[config.tag as IElTag]
              return item
            }
          )
        }
        if (config.children) this.buildRules(config.children, rules)
      })
    },
    resetForm() {
      this.formConfCopy = deepClone(this.formConf)
      this.$refs[this.formConf.formRef].resetFields()
    },
    submitForm() {
      this.$refs[this.formConf.formRef].validate((valid: boolean) => {
        if (!valid) return false
        // 触发submit事件
        this.$emit("submit", this[this.formConf.formModel])
        return true
      })
    }
  },
  render() {
    // return renderForm.call(this, h)
    const formConfCopy = this.formConfCopy
    console.log("renderForm")
    return (
      <el-row gutter={formConfCopy.gutter}>
        <el-form
          size={formConfCopy.size}
          label-position={formConfCopy.labelPosition}
          disabled={formConfCopy.disabled}
          label-width={`${formConfCopy.labelWidth}px`}
          ref={formConfCopy.formRef}
          // model不能直接赋值 https://github.com/vuejs/jsx/issues/49#issuecomment-472013664
          props={{ model: this[formConfCopy.formModel] }}
          rules={this[formConfCopy.formRules]}
        >
          {renderFormItem.call(this, h, formConfCopy.fields)}
          {formConfCopy.formBtns && formBtns.call(this, h)}
        </el-form>
      </el-row>
    )
  }
})
