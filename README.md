# Nscroll

一个利用JS实现数字滚动特效的库。

## 开始使用

```js
var ns=new Nscroll(divname, width, fontsize); //初始化对象
ns.show() //输入数字即可实现滚动效果
```

divname: 元素名称;

width 数字宽度，显示的数字宽度过多会使用0占位；

fontsize 字体大小

## 注意事项

默认设定取1.1s-1.5s范围内的随机时间滚动一次，需要修改时间请修改源码。

```js
getRandom() {
    return (Math.floor(Math.random() * 5) + 11) / 10
}
```

## 修改样式

每个数字位的class为num 通过.num 为其增加样式。