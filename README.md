---
highlight: a11y-light
theme: fancy
---
# JavaScript实现简单的Todo list项目

这次我们来通过html、css、JavaScript，配合一点点less预处理来实现一个比较简单的Todo List案例，源代码放在github上：https://github.com/Roy-LYBBQ/Simple-Todo-List.git

**ToDo List 项目需求**

**概述：** 创建一个基于 Web 的 ToDo List 应用，使用户能够添加、编辑、标记完成和删除任务。

**功能要求：**

1.  **任务显示：** 在页面上显示一个任务列表，每个任务应包括标题和状态（已完成或未完成）。
2.  **添加任务：** 用户应该能够在页面上添加新任务。为此，提供一个输入框和“添加”按钮。
3.  **标记完成：** 用户可以标记任务为已完成或未完成。这可以通过复选框、按钮或任务条目的样式变化来表示。
4.  **删除任务：** 用户可以删除不再需要的任务。可以为每个任务提供一个“删除”按钮。

**ToDo List 项目分析**

1.  **添加task：** 通过input标签输入内容，然后通过对应的botton进行点击添加。
2.  **task显示：** 分两个部分进行显示，一个部分为未做的tasks，一个部分为已完成的tasks
3.  **task操作：** 每个task项对应两个操作项：一个是状态改变，另一个是删除功能。
4.  **操作提示：** 进行添加、删除操作时，会进行弹框提示。

**ToDo List 项目实现**
1.  首先构建html和css基本样式，css采用less，部分span图标采用的是阿里的iconfont图标库。
2.  通过js，获取部分DOM对象，便于后续增删操作和获取其属性。

```js
const taskInput = document.querySelector('.taskInput')
const addButton = document.querySelector('.addButton')
const leftWrap = document.querySelector('.left-wrap')
const rightWrap = document.querySelector('.right-wrap')
```
3.  对部分DOM对象进行事件绑定，当事件触发时执行相应功能。

```js
addButton.addEventListener('click', () => {
  const inputInfo = taskInput.value;
  if(inputInfo.length == 0) {
    alert("请输入待做事项~")
  } else {
    // 重置输入框内容
    taskInput.value = ''
    // 添加内容
    addNode(leftWrap, inputInfo)
    alert("已添加，要好好完成哦~")
  }
})

// 给wrap挂载点击事件
wrapAddClick([leftWrap, rightWrap])
// wrap点击事件添加方法
function wrapAddClick (wrap) {
  wrap.map( item => item.addEventListener('click', e => {wrapClick(e)}))
}
```
4.  对task列表定义相应的增删和触发方法

```js
// 添加li方法
function addNode(wrap, addValue) {
  const flag = wrap.classList.contains('left-wrap')
  wrap.innerHTML += `<li class="left-item item flex">
  <div class="item-left">
    <span class="task">${addValue}</span>
  </div>
  <div class="item-right flex">
    <span class="iconfont ${flag ? 'add' : 'un-add'}">&#xe${flag ? '8df' : '867'};</span>
    <span class="iconfont del">&#xe6a0;</span>
  </div>
</li>`
}

// 删除li方法
function delNode(node, flag = window.confirm('确认删除吗？')) {
  if (flag) node.parentNode.removeChild(node)
}

// wrap点击方法
function wrapClick (e) {
  // 获取点击对应li的DOM
  const liDOM = e.target.parentNode.parentNode
  if(['add', 'un-add'].some(className => e.target.classList.contains(className))
  ) {
    const flag = e.target.classList.contains('add') ? true : false
    console.log('add')
    // 获取点击对应li的value
    const liValue = liDOM.querySelector('.task').innerHTML
    // 删除当前wrap中的对应li
    delNode(liDOM, true)
    // 在另一个wrap中添加li
    addNode(flag ? rightWrap : leftWrap, liValue)
  } else if(e.target.classList.contains('del')) {
    console.log('del')
    delNode(liDOM)
  }
}
```
**ToDo List 使用指南**

**效果图：**

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bdb876cb132f4e4dbc628847232404f8~tplv-k3u1fbpfcp-watermark.image?)

1.  在任务输入栏中输入task内容，点击添加，即可添加成功。
2.  左侧Todo表展示待完成的tasks，右侧点击圆圈可以更改完成状态，点击垃圾桶删除。
3.  右侧Completed表展示已完成的tasks，右侧点击圆圈可以更改完成状态，点击垃圾桶删除。

**声明**

该项目仅为练手项目，重在功能实现，并未完全考虑实际用途，同时可能存在类似没有数量限制的bug，请多多包涵。
