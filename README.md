# Nscroll

一个利用JS实现数字滚动特效的库。

## 开始使用

```js
var a=new Nscroll('#main', 8, 80); //初始化对象
a.show() //输入数字即可实现滚动效果
```

## 注意事项

默认设定为1.1s-1.5s滚动一次，需要修改时间请修改源码。

再修改完默认滚动时间后，请在此处进行修改，将时间改为比滚动时间间隔略大0.1s左右以实现最佳效果

```js
setTimeout(() => {that.updateDiv(numStr.toString())}, 1600)
```

