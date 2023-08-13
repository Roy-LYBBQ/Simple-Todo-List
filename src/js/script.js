const taskInput = document.querySelector('.taskInput')
const addButton = document.querySelector('.addButton')
const leftWrap = document.querySelector('.left-wrap')
const rightWrap = document.querySelector('.right-wrap')

// 点击添加按钮，获取输入框信息并添加到todo列表中
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

// wrap点击事件添加方法
function wrapAddClick (wrap) {
  wrap.map( item => item.addEventListener('click', e => {wrapClick(e)}))
}