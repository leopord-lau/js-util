# js-utils-leo

js 常用工具封装，将这些方法分类成`array`，`date`，`number`，`storage`，`string`，`type`，`other`这些类型。

## 使用

使用`npm`安装

```shell
npm i js-utils-leo
```

在项目中使用
```js
import { install, TypeFn, OtherFn } from 'js-utils-leo';
install();

const typeFn = new TypeFn();
typeFn.isFalse(0);
```

调用`install`方法，直接将`ArrayFn`，`DateFn`、`NumberFn`、`Storage`、`StringFn`这些实例添加到对应的原型上。不需要手动初始化。
```js
  Array.prototype._jsUtils = new ArrayFn();
  Number.prototype._jsUtils = new NumberFn();
  String.prototype._jsUtils = new StringFn();
  Date.prototype._jsUtils = new DateFn();
  Object.prototype._jsUtils = new TypeFn();
  Storage.prototype._jsUtils = new StorageFn({
    prefix,
    isEncrypt
  });
```

如果想在`node`中使用，请勿实例化`StorageFn`。

## array

处理数组相关。

### has(arr: number, val: any)

判断数组中是否存在某个元素

### unique(arr: number)

去重

### remove(arr: number, val: any)

删除数组中的某个元素

### max(arr: array)

获取数组中的最大值

### min(arr: array)

获取数组中的最大值

### sum(arr: array)

数组元素求和

### average(arr: array)

数组元素平均值

### form(arr: Object)

将类数组转换成数组

### map(arr: array, fn: Function, context: any)

传入一个函数和数组并遍历将数组中得值作为函数参数，返回所有返回值组合成得数组

### union(a: array, b: array)

求两个集合的并集

### intersect(a: array, b: array)

求两个集合的交集

### sort(arr: array, type: number)

数组排序

`type`: 排序类型
- 1: 从小到大
- 2: 从大到小


### flatten(arr: array)

数组扁平化

### shuffle(arr: array)

数组内元素随机交换

### randomInarray(arr: array)

数组内元素随机生成

## Date

处理日期相关。

### formatTime(time: number | String, cFormat: String)

格式化时间，可传入格式，例如`'{y}-{m}-{d} {h}:{i}:{s}'`或者`{y}/{m}/{d} {h}:{i}:{s} 星期{a}`，注意`y`、`m`、`d`、`h`、`i`、`s`、`a`这些字符不能更改。

### getMonths(time: number | String, len: number, direction: number)

返回指定长度的月份集合。

如果没有传入`len`和`direction`，那么默认返回当前日期的1月份到当前日期的月份数。

`len`: 要返回的月份个数；

`direction`: 选择月份的方向（往前、往后，以当前月份为轴线往前往后各取`len/2`个月）
- 1： 往前
- 2： 往后
- 3： 以当前月份为轴线往前往后各取`len/2`个月

### getDays(time: number | String, len: number, direction: number)

返回指定长度的天数集合。

如果没有传入`len`和`direction`，那么默认返回当前日期。

`len`: 要返回的天数；

`direction`: 选择天数的方向（往前、往后，以当前日期份为轴线往前往后各取`len/2`个天）
- 1： 往前
- 2： 往后
- 3： 以当前日期为轴线往前往后各取`len/2`个天


### formatHMS(s: number)

将秒数转换成 1h1m1s 格式

### getMonthOfDay(time)

获取某月有多少天

### getYearOfDay(time)

获取某年有多少天

### getFirstDayOfYear(time)

获取某年的第一天

### getLastDayOfYear(time)

获取某年的最后一天

### getDayOfYear(time)

获取某个日期是当年中的第几天

### getDayOfYearWeek(time)

获取某个日期在这一年的第几周


## number

处理数字类型

### random(min: number, max: number)

在范围内取一个随机值

### formatInToThousand(number: number, separator: String)

千位分隔符

### numberToChinese(num: number)

将阿拉伯数字翻译成中文的大写数字

### changeToChinese(num: number)

将数字转换为大写金额

## Storage

`cookie`、`localStorage`、`sessionStorage`相关，在初始化实例可以传入参数

例如
```js
const storageFn = new StorageFn({
  prefix: 'test',
  isEncrypt: true
})
```

`prefix`: `key`前面加的前缀，默认为空；
`isEncrypt`: 是否对`value`进行加密，默认为`false`。(只对`localStorage`和`sessionStorage`进行加密，`cookie`不加密)

**注意：通过api获取的存储数据并不是加密的，只是在浏览器的控制台上显示的是加密的**

### setCookie(key: any, value: any, day: number)

设置`cookie`，

`day`：`cookie`保存天数，默认为0;

### getCookie(key: any)

获取`cookie`

### removeCookie(key: any)

移除`cookie`

### setLocal(key: any, value: any, expire: any)

设置`localStorage`，可以通过设置`expire`对数据进行过期判断.

`expire`: 保存天数，默认为0，不会自动过期

### getLocal(key: any) 

根据`key`获取对应的`localStorage`值，如果之前设置了过期时间并且已过期，返回`null`

### hasLocal(key: any)

该`key`是否已经在`localStorage`中被设置了

### getLocalKeys()

获取`localStorage`中所有的`key`

### getAllLocal()

获取全部`localStroage`

### getLocalLength()

获取`localStorage`长度

### removeLocal(key: any)

根据`key`移除对应的`localStorage`值

### clearLocal()

移除所有`localStorage`

### setSession(key: any, value: any, expire: any)

设置`sessionStorage`，可以通过设置`expire`对数据进行过期判断.

`expire`: 保存天数，默认为0，不会自动过期

### getSession(key: any) 

根据`key`获取对应的`sessionStorage`值，如果之前设置了过期时间并且已过期，返回`null`

### hasSession(key: any)

该`key`是否已经在`sessionStorage`中被设置了

### getSessionKeys()

获取`sessionStorage`中所有的`key`

### getAllSession()

获取全部`sessionStroage`

### getSessionLength()

获取`sessionStorage`长度

### removeSession(key: any)

根据`key`移除对应的`sessionStorage`值

### clearSession()

移除所有`sessionStorage`



## String

处理字符串

### trim(str: string, type: number)

清除字符串中的空格.

`type`: 清除类型
- 1: 所有空格  
- 2: 前后空格  
- 3: 前空格 
- 4: 后空格


### changeCase(str: string, type: number)

改变字符大小写

`type`：
- 1: 首字母大写  
- 2：首页母小写  
- 3：大小写转换  
- 4：全部大写  
- 5：全部小写


### randomString(length: number)

生成随机字符串


### convertToCamelCase(str: string)

将短横线格式转换成驼峰式


## Type

判断数据类型


### isString(obj: any)

是否是字符串类型

### isNumber(obj: any)

是否是数字类型

### isNumberOnly(obj: any)

字符串是否只包含数字

### assertNumber(obj: any)

将值转换成数字类型，如果转换后为`NaN`,则为0;

### isBoolean(obj: any)

是否是布尔类型

### isFunction(obj: any)

是否函数类型

### isNull(obj: any)

是否是`null`类型

### isUndefined(obj: any)

是否是`undefined`类型

### isObject(obj: any)

是否是对象类型

### isArray(obj: any)

是否是数组类型

### isDate(obj: any)

是否是日期类型

### isRegExp(obj: any)

是否是正则类型

### isError(obj: any)

是否是`Error`类型

### isSymbol(obj: any)

是否`Symbol`类型

### isPromise(obj: any)

是否`Promise`类型

### isString(obj: any)

是否是字符串类型

### isSet(obj: any)

是否`set`类型

### isFalse(obj: any)

是否为`false`

`''`, `undefined`, `null`， `'null'`, `'undefined'`, `0`, `false`, `NaN`均为`false`

### isTrue(obj: any)

是否为`true`，`!isFalse`

### isIOS()

设备是否为`ios`

### isPC()

设备是否为pc


### browserType()

浏览器类型


### isPhone(str: string)

手机号验证

### isTel(str: string)

座机号码验证

### isPostal(str: string)

邮政编码验证

### isQQ(str: string)

qq号码验证

### isEmail(str: string)

邮箱验证

### isPassword(str: string)

密码验证，密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线

### isUrl(str: string)

网址验证

### isIP(str: string)

是否为`IP`

### isDateFormat(str: string)

是否是日期时间 xxxx-xx-xx xx:xx:xx 或者 xxxx-xx-xx

### isLowercase(str: string)

是否是小写

### isUppercase(str: string)

是否是大写

### isEnglish(str: string)

是否是英文

### isChinese(str: string)

是否是中文

###  isHTML(str: string)

是否是html

### isIPv6(str: string)

是否是ipv6格式

### isCardID(str: string)

验证身份证号


## Other

### deepClone(obj: any)

深克隆

### debounce(fn, delay, immediate)

防抖

`delay`: 多少秒之后执行
`immediate`: 是否立即执行

### throttle(func, delay)

节流

`delay`: 多少秒之内执行一次

### encrypt(data: any, key?: string, iv?: string)

数据加密

`key`: 密钥，默认使用十六位十六进制数作为密钥
`iv`: 密钥偏移量，默认使用十六位十六进制数作为密钥偏移量

### decrypt(data: any, key?: string, iv?: string)

数据解密，解密的密钥跟密钥偏移量要跟加密时的保持一致