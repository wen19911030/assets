// .eslintrc.js
module.exports = {
  // 指定解析器
  parser: "babel-eslint", // 解析ES6
  // 指定解析器选项
  parserOptions: {
    ecmaVersion: 2018, // 启用ES8语法支持
    sourceType: "module" // module表示ECMAScript模块
  },
  root: true,
  // 指定脚本的运行环境 这些环境并不是互斥的
  env: {
    node: true,
    es6: true,
    browser: true
  },
  // extends: ["airbnb-base"],
  // 脚本在执行期间访问的额外的全局变量
  globals: {
    self: true,
  },
  // 启用的规则及其各自的错误级别
  // 每个规则对应的0，1，2分别表示off, warning, error三个错误级别
  rules: {
    "accessor-pairs": "error", // 设置了 setter ，必须相应设置 getter ，反之不必须
    "array-bracket-newline": ["off", "consistent"], // 在数组开括号后和闭括号前使用一致，前括号换行则闭括号也换行
    "array-bracket-spacing": ["error", "never"], // 数组方括号前后的空格使用规则,
    "array-callback-return": "error", // 数组的 map、filter、sort 等方法，回调函数必须有返回值
    "array-element-newline": "off", // 每个数组项是否独占一行
    "arrow-body-style": [
      "error",
      "as-needed",
      {
        requireReturnForObjectLiteral: false
      }
    ], // 箭头函数体使用大括号规则 按需使用
    "arrow-parens": ["error", "always"], // 要求箭头函数的参数使用圆括号
    "arrow-spacing": ["error", { before: true, after: true }], // 箭头函数的箭头(=>)之前或之后的空格风格
    "block-scoped-var": "error", // 强制把变量的使用限制在其定义的作用域范围内
    "block-spacing": ["error", "always"], // 强制在代码块中开括号前和闭括号后有空格
    "brace-style": ["warn", "1tbs", { allowSingleLine: true }], // 在代码块中使用一致的大括号风格, 大括号放在控制语句或声明语句同一行的位置
    camelcase: ["warn", { properties: "never", ignoreDestructuring: false }], // 骆驼拼写法命名约定
    "callback-return": "off", // callback 之后必须立即 return
    "capitalized-comments": "off", // 注释的首字母应该大写
    "class-methods-use-this": 'error', // class 的非静态方法必须包含 this 关键字
    "comma-dangle": [
      "warn",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "always-multiline"
      }
    ], // 对象的最后一项后面是否写逗号
    "comma-spacing": ["error", { before: false, after: true }], // 逗号周围使用空格 禁止在逗号前使用空格 要求在逗号后使用空格
    "comma-style": [
      "error",
      "last",
      {
        exceptions: {
          ArrayExpression: false,
          ArrayPattern: false,
          ArrowFunctionExpression: false,
          CallExpression: false,
          FunctionDeclaration: false,
          FunctionExpression: false,
          ImportDeclaration: false,
          ObjectExpression: false,
          ObjectPattern: false,
          VariableDeclaration: false,
          NewExpression: false
        }
      }
    ], // 将逗号放置在当前行的末尾
    complexity: ["warn", 20], // 禁止函数 if ... else if ... else 的复杂度超过 20
    "computed-property-spacing": ["error", "never"], // 使用方括号访问对象属性时，方括号前后的空格规则
    "consistent-return": "off", // 允许函数在不同条件下返回不同类型的值 有时候会希望通过参数获取不同类型的返回值
    "consistent-this": ["error", "self", "that"], // this 的别名规则，只允许 self 或 that
    "constructor-super": "error", // 构造函数中必须调用 super
    curly: ['error', "multi-line"], // if 后必须包含 { ，单行 if 除外
    "default-case": 'error', // switch 语句必须包含 default
    "dot-location": ["error", "property"], // 要求点操作符和属性放在同一行
    "eol-last": ["error", "always"], // 文件最后必须有空行
    eqeqeq: ['error', "always", { null: "ignore" }], // 必须使用 === 和 !== ，和 null 对比时除外
    "for-direction": 'error', // for 循环不得因方向错误造成死循环
    "func-call-spacing": ["error", "never"], // 禁止在函数标识符和其调用之间有空格
    "func-name-matching": [
      "off",
      "always",
      {
        includeCommonJSModuleExports: false,
        considerPropertyDescriptor: true
      }
    ], // 把函数赋给变量或对象属性时，函数名和变量名或对象属性名必须一致
    "func-names": "off", // 允许匿名函数
    "func-style": "off", // 不限制只使用函数申明或只使用函数表达式
    "generator-star-spacing": ["error", { before: false, after: true }], // generator 函数中 * 号周围空格使用规则
    "getter-return": ['error', { allowImplicit: true }], // getter 必须有返回值，允许返回 undefined
    "global-require": 'off', // 关闭 require 必须在全局作用域下 条件加载很常见
    "guard-for-in": 'error', // for in 时需检测 hasOwnProperty
    "handle-callback-err": 'error', // callback 中的 err、error 参数和变量必须被处理
    "id-blacklist": 'off', // 禁止使用的标识符
    "id-length": 'off', // 变量名长度限制
    "id-match": 'off', // 限制变量名必须匹配指定的正则表达式
    indent: [
      "error",
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        // MemberExpression: null,
        FunctionDeclaration: {
          parameters: 1,
          body: 1
        },
        FunctionExpression: {
          parameters: 1,
          body: 1
        },
        CallExpression: {
          arguments: 1
        },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        flatTernaryExpressions: false,
        // list derived from https://github.com/benjamn/ast-types/blob/HEAD/def/jsx.js
        ignoredNodes: [
          "JSXElement",
          "JSXElement > *",
          "JSXAttribute",
          "JSXIdentifier",
          "JSXNamespacedName",
          "JSXMemberExpression",
          "JSXSpreadAttribute",
          "JSXExpressionContainer",
          "JSXOpeningElement",
          "JSXClosingElement",
          "JSXText",
          "JSXEmptyExpression",
          "JSXSpreadChild"
        ],
        ignoreComments: false
      }
    ], // 缩进风格 两个空格
    "init-declarations": 'off', // 关闭 变量必须在定义的时候赋值
    "jsx-quotes": ['error', "prefer-double"], // jsx 语法中，属性的值必须使用双引号
    "key-spacing": ["error", { beforeColon: false, afterColon: true }], // 对象字面量的键和值之间空格规则
    "keyword-spacing": [
      "error",
      {
        before: true,
        after: true,
        overrides: {
          return: { after: true },
          throw: { after: true },
          case: { after: true }
        }
      }
    ], // 关键字前后空格规则
    "linebreak-style": ['off', "error", "windows"], // 换行符使用规则 LF CRLF
    "line-comment-position": [
      "off",
      {
        position: "above",
        ignorePattern: "",
        applyDefaultPatterns: true
      }
    ], // 单行注释位置
    "lines-around-comment": "off", // 注释前后是否要空一行
    "max-depth": ["off", 4], // 最大块嵌套深度为 4 层
    "max-len": 'off', // 限制单行代码的长度
    "max-lines": 'off', // 限制单个文件最大行数
    "max-nested-callbacks": 'off', // 最大回调深度
    "max-params": 'off', // 函数的形参个数
    "max-statements-per-line": 'off', // 限制一行中的语句数量
    "max-statements": 'off', // 限制函数块中的语句数量
    "multiline-ternary": ["off", "never"], // 三元表达式的换行规则
    "new-cap": [
      "error",
      {
        newIsCap: true,
        newIsCapExceptions: [],
        capIsNew: false,
        capIsNewExceptions: ["Immutable.Map", "Immutable.Set", "Immutable.List"]
      }
    ], // new关键字后类名应首字母大写
    "new-parens": 'error', // new 关键字后类应包含圆括号
    "newline-per-chained-call": ["error", { ignoreChainWithDepth: 4 }], // 链式调用是否要换行
    "no-alert": 'warn', // 禁止 alert，提醒开发者，上线时要去掉
    "no-array-constructor": 'error', // 禁止使用 Array 构造函数，使用 Array(num) 直接创建长度为 num 的数组时可以
    "no-await-in-loop": 'error', // 禁止将 await 写在循环里
    "no-bitwise": 'error', // 禁止位运算
    "no-buffer-constructor": 'error', // 禁止在 Node.js 中直接调用 Buffer 构造函数
    "no-case-declarations": 'error', // switch的条件中出现 var、let、const、function、class 等关键字，必须使用花括号把内容括起来
    "no-caller": 'error', // 禁止使用 arguments.caller 和 arguments.callee
    "no-catch-shadow": 'error', // catch中不得使用已定义的变量名
    "no-class-assign": 'error', // class定义的类名不得与其它变量重名
    "no-compare-neg-zero": 'error', // 禁止与 -0 做比较
    "no-cond-assign": ['error', "except-parens"], // 禁止在 if、for、while 中出现赋值语句，除非用圆括号括起来
    "no-confusing-arrow": ['error', { allowParens: true }], // 禁止出现难以理解的箭头函数，除非用圆括号括起来
    "no-console": 'warn', // 禁止使用 console，提醒开发者，上线时要去掉
    "no-constant-condition": ['error', { checkLoops: false }], // 禁止使用常量作为判断条件
    "no-const-assign": 'error', // 禁止对 const 定义重新赋值
    "no-continue": 'off', // 允许 continue
    "no-control-regex": 'error', // 禁止正则表达式中出现 Ctrl 键的 ASCII 表示，即/\x1f/
    "no-debugger": 'warn', // 禁止 debugger 语句，提醒开发者，上线时要去掉
    "no-delete-var": 'error', // 禁止对变量使用 delete 关键字，删除对象的属性不受限制
    "no-div-regex": 'off', // 关闭 禁止在正则表达式中出现形似除法操作符的开头，如 let a = /=foo/
    "no-dupe-args": 'error', // 函数参数禁止重名
    "no-dupe-keys": 'error', // 禁止对象出现重名键值
    "no-dupe-class-members": 'error', // 类方法禁止重名
    "no-duplicate-case": 'error', // 禁止 switch 中出现相同的 case
    "no-duplicate-imports": 'error', // 禁止重复 import
    "no-else-return": 'off',
    "no-empty": ['error', { allowEmptyCatch: true }], // 禁止出现空代码块
    "no-empty-function": [
      "error",
      {
        allow: ["arrowFunctions", "functions", "methods"]
      }
    ], // 禁止空的 function
    "no-empty-pattern": 'error', // 禁止解构中出现空 {} 或 []
    "no-eq-null": "off", // 允许 == 和 != 与 null 做比较
    "no-eval": 'error', // 禁止使用 eval
    "no-ex-assign": 'error', // catch 定义的参数禁止赋值
    "no-extend-native": 'error', // 禁止扩展原生对象
    "no-extra-bind": 'error', // 禁止额外的 bind
    "no-extra-boolean-cast": 'error', // 禁止额外的布尔值转换
    "no-extra-parens": [
      "off",
      "all",
      {
        conditionalAssign: true,
        nestedBinaryExpressions: false,
        returnAssign: false,
        ignoreJSX: "all", // delegate to eslint-plugin-react
        enforceForArrowConditionals: false
      }
    ], // 禁止额外的括号，仅针对函数体
    "no-extra-semi": 'error', // 禁止额外的分号
    "no-fallthrough": ['error', { commentPattern: "." }], // 每一个 switch 的 case 都需要有 break, return 或 throw 包含注释的情况下允许
    "no-floating-decimal": 'error', // 不允许使用 2. 或 .5 来表示数字，需要用 2、2.0、0.5 的格式
    "no-func-assign": 'error', // 禁止对函数声明重新赋值
    "no-global-assign": 'error', // 禁止对全局变量赋值
    "no-implicit-coercion": [
      "off",
      {
        boolean: false,
        number: true,
        string: true,
        allow: []
      }
    ], // 隐式转换
    "no-implied-eval": 'error', // 禁止在 setTimeout 和 setInterval 中传入字符串，因会触发隐式 eval
    "no-implicit-globals": 'error', // 禁止隐式定义全局变量
    "no-inline-comments": 'off', // 允许行内注释
    "no-inner-declarations": ['error', "both"], // 禁止在块作用域内使用 var 或函数声明
    "no-invalid-regexp": 'error', // 禁止使用非法的正则表达式
    "no-invalid-this": 'off', // 允许在类之外的地方使用 this
    "no-irregular-whitespace": "error", // 禁止使用不规范空格
    "no-iterator": 'error', // 禁止使用 __iterator__
    "no-label-var": 'error', // label 不得与已定义的变量重名
    "no-labels": 'off', // 允许使用 label，多重循环直接跳出
    "no-lone-blocks": 'error', // 禁止使用无效的块作用域
    "no-lonely-if": "error", // 禁止 else 中只有一个单独的 if
    "no-loop-func": 'error', // 禁止 for (var i) { function() { use i } }，使用 let 则可以
    "no-magic-numbers": 'off', // 允许魔法数字
    "no-mixed-operators": [
      'error',
      {
        groups: [["&&", "||"]]
      }
    ], // 禁止使用混合的逻辑判断，必须把不同的逻辑用圆括号括起来
    "no-mixed-requires": 'off', // 相同类型的 require 必须放在一起
    "no-mixed-spaces-and-tabs": 'error', // 禁止混用空格和 tab 来做缩进，必须统一
    "no-multi-assign": 'error', // 禁止连等赋值
    "no-multi-spaces": 'error', // 禁止使用连续的空格
    "no-multi-str": 'error', // 禁止使用 \ 来定义多行字符串，统一使用模板字符串来做
    "no-multiple-empty-lines": ["error", { max: 2, maxBOF: 1, maxEOF: 0 }], // 连续空行的数量限制
    "no-negated-condition": "off", // 禁止 if 中出现否定表达式 !==
    "no-nested-ternary": 'error', // 禁止嵌套的三元表达式
    "no-new-func": "error", // 禁止 new Function
    "no-new-object": 'error', // 禁止使用 new Object
    "no-new-require": 'error', // 禁止使用 new require
    "no-new-symbol": 'error', // 禁止使用 new Symbol
    "no-new-wrappers": 'error', // 禁止 new Boolean、Number 或 String
    "no-new": 'error', // 禁止 new 一个类而不存储该实例
    "no-obj-calls": 'error', // 禁止把原生对象 Math、JSON、Reflect 当函数使用
    "no-octal-escape": 'error', // 禁止使用八进制转义符
    "no-path-concat": 'error', // 禁止使用 __dirname + 'file' 的形式拼接路径，应该使用 path.join 或 path.resolve 来代替
    "no-param-reassign": 'error', // 禁止对函数的参数重新赋值
    "no-plusplus": 'off', // 允许 ++ 和 --
    "no-process-env": 'off', // 允许使用 process.env.NODE_ENV
    "no-process-exit": 'off', // 允许使用 process.exit('0')
    "no-prototype-builtins": 'off', // 允许使用 hasOwnProperty, isPrototypeOf 或 propertyIsEnumerable
    "no-proto": 'error', // 禁止使用 __proto__
    "no-redeclare": 'error', // 禁止重复声明
    "no-regex-spaces": 'error', // 禁止在正则表达式中出现连续空格
    "no-restricted-globals": [
      "warn",
      "isFinite",
      "isNaN",
      "addEventListener",
      "blur",
      "close",
      "closed",
      "confirm",
      "defaultStatus",
      "defaultstatus",
      "event",
      "external",
      "find",
      "focus",
      "frameElement",
      "frames",
      "history",
      "innerHeight",
      "innerWidth",
      "length",
      "location",
      "locationbar",
      "menubar",
      "moveBy",
      "moveTo",
      "name",
      "onblur",
      "onerror",
      "onfocus",
      "onload",
      "onresize",
      "onunload",
      "open",
      "opener",
      "opera",
      "outerHeight",
      "outerWidth",
      "pageXOffset",
      "pageYOffset",
      "parent",
      "print",
      "removeEventListener",
      "resizeBy",
      "resizeTo",
      "screen",
      "screenLeft",
      "screenTop",
      "screenX",
      "screenY",
      "scroll",
      "scrollbars",
      "scrollBy",
      "scrollTo",
      "scrollX",
      "scrollY",
      "self",
      "status",
      "statusbar",
      "stop",
      "toolbar",
      "top"
    ], // 禁止特定的全局变量
    "no-restricted-imports": 'off', // 禁止 import 特定的模块
    "no-restricted-modules": "off", // 禁止使用特定的模块
    "no-restricted-properties": [
      "warn",
      {
        object: "arguments",
        property: "callee",
        message: "arguments.callee is deprecated"
      },
      {
        object: "global",
        property: "isFinite",
        message: "Please use Number.isFinite instead"
      },
      {
        object: "self",
        property: "isFinite",
        message: "Please use Number.isFinite instead"
      },
      {
        object: "window",
        property: "isFinite",
        message: "Please use Number.isFinite instead"
      },
      {
        object: "global",
        property: "isNaN",
        message: "Please use Number.isNaN instead"
      },
      {
        object: "self",
        property: "isNaN",
        message: "Please use Number.isNaN instead"
      },
      {
        object: "window",
        property: "isNaN",
        message: "Please use Number.isNaN instead"
      },
      {
        property: "__defineGetter__",
        message: "Please use Object.defineProperty instead."
      },
      {
        property: "__defineSetter__",
        message: "Please use Object.defineProperty instead."
      },
      {
        object: "Math",
        property: "pow",
        message: "Use the exponentiation operator (**) instead."
      }
    ], // 禁止特定的对象属性
    "no-restricted-syntax": [
      "warn",
      {
        selector: "ForInStatement",
        message:
          "for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array."
      },
      {
        selector: "WithStatement",
        message:
          "`with` is disallowed in strict mode because it makes code impossible to predict and optimize."
      }
    ], // 禁止使用特定的语法
    "no-return-assign": 'error', // 禁止在return中赋值
    "no-return-await": 'error', // 禁止在 return 中使用 await
    "no-script-url": 'error', // 禁止 location.href = 'javascript:void'
    "no-self-assign": 'error', // 禁止将自己赋值给自己
    "no-self-compare": 'error', // 禁止自己与自己作比较
    "no-sequences": 'error', // 禁止逗号操作符
    "no-shadow-restricted-names": 'error', // 禁止使用保留字作为变量名
    "no-shadow": 'error', // 禁止在嵌套作用域中出现重名的定义，如 let a; function b() { let a }
    "no-sparse-arrays": 'error', // 禁止数组中出现连续逗号
    "no-sync": 'off', // 允许使用 node 中的同步的方法，比如 fs.readFileSync
    "no-tabs": 'error', // 禁止使用 tabs
    "no-template-curly-in-string": 'error', // 禁止普通字符串中出现模板字符串语法
    "no-ternary": 'off', // 允许三元表达式
    "no-this-before-super": 'error', // 禁止在构造函数的 super 之前使用 this
    "no-throw-literal": 'error', // 禁止 throw 字面量，必须 throw 一个 Error 对象
    "no-trailing-spaces": [
      'error',
      {
        skipBlankLines: false, // 不检查空行
        ignoreComments: false // 不检查注释
      }
    ], // 禁止行尾空格
    "no-undef-init": 'error', // 禁止将 undefined 赋值给变量
    "no-undef": 'error', // 禁止访问未定义的变量或方法
    "no-undefined": 'error', // 禁止使用 undefined，如需判断一个变量是否为 undefined，请使用 typeof a === 'undefined'
    "no-underscore-dangle": [
      "error",
      {
        allow: [],
        allowAfterThis: false, // 允许在 this 对象的成员变量上使用悬空下划线
        allowAfterSuper: false, // 允许在 super 对象的成员变量上使用悬空下划线
        enforceInMethodNames: false // 允许在方法名中使用悬空下划线
      }
    ], // 禁止变量名中使用下划线
    "no-unexpected-multiline": 'error', // 禁止出现难以理解的多行代码
    "no-unmodified-loop-condition": 'error', // 循环体内必须对循环条件进行修改
    "no-unneeded-ternary": ['error', { defaultAssignment: false }], // 禁止不必要的三元表达式
    "no-unreachable": 'error', // 禁止出现不可到达的代码，如在 return、throw 之后的代码
    "no-unsafe-finally": 'error', // 禁止在finally块中出现 return、throw、break、continue
    "no-unsafe-negation": 'error', // 禁止出现不安全的否定，如 for (!key in obj} {}，应该写为 for (!(key in obj)} {}
    "no-unused-expressions": [
      'error',
      {
        allowShortCircuit: true, // 允许使用 a() || b 或 a && b()
        allowTernary: true, // 允许在表达式中使用三元运算符
        allowTaggedTemplates: true // 允许标记模板字符串
      }
    ], // 禁止出现无用的表达式
    "no-unused-labels": 'error', // 禁止定义不使用的 label
    "no-unused-vars": [
      'error',
      {
        vars: "all", // 变量定义必须被使用
        args: "none", // 对于函数形参不检测
        ignoreRestSiblings: true, // 忽略剩余子项 fn(...args)，{a, b, ...coords}
        caughtErrors: "none" // 忽略 catch 语句的参数使用
      }
    ], // 禁止定义不使用的变量
    "no-use-before-define": [
      'error',
      {
        functions: true,
        classes: true,
        variables: true
      }
    ], // 禁止在变量被定义之前使用它
    "no-useless-call": 'error', // 禁止不必要的 call 和 apply
    "no-useless-computed-key": 'error', // 禁止使用不必要计算的key，如 var a = { ['0']: 0 }
    "no-useless-concat": 'error', // 禁止不必要的字符串拼接
    "no-useless-constructor": 'error', // 禁止无用的构造函数
    "no-useless-escape": 'error', // 禁止无用的转义
    "no-useless-rename": 'error', // 禁止无效的重命名，如 import {a as a} from xxx
    "no-useless-return": "error", // 禁止没有必要的 return
    "no-var": 'error', // 禁止使用 var，必须用 let 或 const
    "no-void": 'error', // 禁止使用void
    "no-warning-comments": 'warn', // 禁止注释中出现 TODO 或 FIXME，用这个来提醒开发者，写了 TODO 就一定要做完
    "no-whitespace-before-property": 'error',
    "no-whitespace-before-property": 'error',
    "no-with": 'error', // 禁止 with
    "nonblock-statement-body-position": 'error', // 禁止 if 语句在没有花括号的情况下换行
    "object-curly-newline": [
      "error",
      {
        ObjectExpression: {
          minProperties: 4,
          multiline: true,
          consistent: true
        },
        ObjectPattern: { minProperties: 4, multiline: true, consistent: true },
        ImportDeclaration: {
          minProperties: 4,
          multiline: true,
          consistent: true
        },
        ExportDeclaration: {
          minProperties: 4,
          multiline: true,
          consistent: true
        }
      }
    ], // 定义对象的花括号前后是否要加空行
    "object-curly-spacing": ["error", "always"], // 定义对象的花括号前后是否要加空格
    "object-property-newline": [
      "error",
      {
        allowAllPropertiesOnSameLine: true
      }
    ], // 对象每个属性必须独占一行或者出现在同一行
    "object-shorthand": 'error', // 用对象方法简写
    "one-var-declaration-per-line": ["error", "always"], // 每个变量声明必须独占一行
    "one-var": ["error", "never"], // 不允许使用逗号一次声明多个变量
    "operator-assignment": 'off', // 允许在可能的情况下使用简化的赋值操作符
    "operator-linebreak": ["error", "before", { overrides: { "=": "none" } }],
    "padded-blocks": [
      "error",
      {
        blocks: "never",
        classes: "never",
        switches: "never"
      },
      {
        allowSingleLineBlocks: true
      }
    ], // 代码块首尾必须要空行
    "padding-line-between-statements": "off", // 限制语句之间的空行规则，比如变量定义完之后必须要空行
    "prefer-arrow-callback": [
      "error",
      {
        allowNamedFunctions: false, // 禁止使用命名的函数作为回调函数或函数参数
        allowUnboundThis: true // 允许包含 this 的函数表达式被用作回调函数，只要问题函数没有被显式绑定
      }
    ], // 使用箭头函数作为回调
    "prefer-const": [
      "error",
      {
        destructuring: "any",
        ignoreReadBeforeAssign: true
      }
    ], // 声明后不再修改的变量必须使用 const
    "prefer-destructuring": [
      "error",
      {
        VariableDeclarator: {
          array: false,
          object: true
        },
        AssignmentExpression: {
          array: true,
          object: false
        }
      },
      {
        enforceForRenamedProperties: false
      }
    ], // 必须使用解构
    "prefer-numeric-literals": "off", // 关闭 禁用 parseInt() 和 Number.parseInt()，使用二进制，八进制和十六进制字面量
    "prefer-promise-reject-errors": 'error', // promise 的 reject 中必须传入 Error 对象，而不允许使用字面量
    "prefer-rest-params": 'error', // 必须使用解构 ...args 来代替 arguments
    "prefer-spread": 'error', // 建议使用扩展语法而非.apply()
    "prefer-template": 'error', // 要求使用模板字面量而非字符串连接
    quotes: [
      "error",
      "single",
      { avoidEscape: true, allowTemplateLiterals: true }
    ], // 字符串必须使用单引号
    "quote-props": [
      "error",
      "as-needed",
      { keywords: false, unnecessary: true, numbers: false }
    ], // 对象字面量的键名禁止用引号括起来
    radix: 'error', // parseInt方法必须传进制参数
    "require-await": 'off', // async 函数中必须存在 await 语句
    "require-jsdoc": "off", // 注释风格
    "require-yield": 'error', // generator 函数内必须有 yield
    "rest-spread-spacing": ['error', "never"], // ...后面不允许有空格
    "semi-spacing": ["error", { before: false, after: true }], // 分号前后的空格规则
    "semi-style": ['error', "last"], // 禁止行首出现分号
    semi: 'error', // 行尾必须使用分号结束
    "sort-vars": 'off', // 变量声明必须排好序
    "space-before-blocks": 'error', // function 等的花括号之前是否使用空格
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "never",
        asyncArrow: "always"
      }
    ], // function 的圆括号之前是否使用空格
    "space-in-parens": ["error", "never"], // 圆括号内的空格使用规则
    "space-infix-ops": 'error', // 操作符前后要加空格
    "space-unary-ops": [
      "error",
      {
        words: true,
        nonwords: false,
        overrides: {}
      }
    ], // new, delete, typeof, void, yield 等表达式前后必须有空格，-, +, --, ++, !, !! 等表达式前后不许有空格
    "spaced-comment": [
      'error',
      "always",
      {
        block: {
          exceptions: ["*"],
          balanced: true
        }
      }
    ], // 注释的斜线和星号后要加空格
    strict: ['error', "never"], // 禁用严格模式，禁止在任何地方出现 'use strict'
    "switch-colon-spacing": ["error", { after: true, before: false }], // switch 中冒号前后的空格规则
    "symbol-description": 'error', // 创建 Symbol 的时候必须传入描述
    "template-curly-spacing": ["error", "always"], // 模板字符串 ${} 前后的空格规则
    "template-tag-spacing": ["error", "never"], // 禁止在模板标记和它们的字面量之间有空格
    "unicode-bom": 'error', // 所有文件头禁止出现 BOM
    "use-isnan": 'error', // 禁止直接对 NaN 进行判断，必须使用 isNaN
    "valid-jsdoc": 'off', // 注释必须符合 jsdoc 的规范
    "valid-typeof": 'error', // typeof 判断条件只能是 "undefined", "object", "boolean", "number", "string", "function" 或 "symbol"
    "vars-on-top": 'off', // var 必须在作用域的最前面
    "wrap-iife": ['error', "inside"], // 自执行函数必须使用圆括号括起来，如 (function(){do something...})()
    "wrap-regex": 'off', // 正则表达式必须用圆括号括起来
    "yield-star-spacing": ["error", "after"], // yield 的 * 前后空格规则
    yoda: 'error' // 禁止Yoda格式的判断条件，如 if (true === a)，应使用 if (a === true)
  }
};
