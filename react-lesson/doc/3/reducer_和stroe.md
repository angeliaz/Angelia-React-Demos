# redux中的Reducer 和Store
前面，配了下环境，忽悠了个理念，基本没干啥事。本篇可以真正研究`redux`的。

顺便说一句，如果要跟本系列，一定要把代码pull下来，运行并随意修改。

====

Array中的`reduce`方法，个人感觉出镜率并不高。但是和函数式有点关系的语言或库，这个东西都是标配。

Redux有很明显的函数式风格。其中的`reducer`，和上面的那个是一致的。`reducer`是有如下签名的函数

	（state,action） =>  nextState
	
给一个状态，和一个动作，返回下一个状态。这个思想简直不能再朴素。具体到程序上来，

- state一般是一组数据，比如一个文章的列表；
- action表示发生的什么动作，比如向文章列表中添加新文章等。action一般有两个属性，一个是`type`，表明是什么类型的动作，一个是`payLoad`,这个动作的额外信息。比如

		{type:'add_post',payLoad:{title:'标题',content:'内容'}}
		
	表明是添加了一篇文章，payLoad中有文章的标题很内容信息。
	
这个函数有几点原则：

1. 确定性，对于相同的参数（state和action），总是产生相同的结果。
2. 不要修改state，返回的nextState必须是全新的。且`nextState`会作为下一个`reducer`的第一个参数。

写个简单的`reducer`

	function listReducer(state,action){
    	if(action.type == 'add'){
        	return state.push(action.payLoad)
    	}
    	if(action.type == 'deleteById'){
        	//过滤掉这个id即可
        	let id = action.payLoad.id;
        	return state.filter(item=>{return item.id !==id})
    	}

    	if(action.type == 'update'){
        	var id = action.payLoad.id;
        	var index = state.findIndex(item=>{return item.id == id});
        	//if index == -1, 这里不考虑update时，没有相应item的情况
        	return state.set(index,action.payLoad)
    	}

    	return state; //注意：默认返回原state
	}
	
	
	
很简单，根据不同的`type`，进行相应的操作。需要注意的是，因为本系列一直使用`immutable js`,所以直接返回。如何使用`Array`,`push`等操作返回就是新的state对象。这时就必须处理一下，如下所示。
	
	if(action.type=='add'){
		//新语法
		return [
			...state,
			action.payLoad
		]
		//老语法
		//return [].concat(state.slice(),action.payLoad)
	}
	
	
	
这样，数据的处理都可以交给这个函数了

	var initState = Immutable.List.of()

	let curState = initState;

	curState = listReducer(curState,{type:'add',payLoad:{id:1,title:'你'}})
	curState = listReducer(curState,{type:'add',payLoad:{id:2,title:'很'}})
	curState = listReducer(curState,{type:'add',payLoad:{id:3,title:'帅'}})
	curState = listReducer(curState,{type:'deleteById',payLoad:{id:2}})
	curState = listReducer(curState,{type:'update',payLoad:{id:1,title:'我'}})

	curState.forEach(item=>console.log(item))
	
	
这里，我们自己维护一个全局的`curState`,显然有点low。

`redux`提供了一个函数`createStore`，帮我们去维护。

	var store = createStore(listReducer, initState);

	//监听之后的每一次变化，观察者模式
	var unSubscribe = store.subscribe(function(){
    	console.log('dispatch!!!')
	})

	//统一的dispatch方法，对state做变更
	store.dispatch({type:'add',payLoad:{id:1,title:'你'}})
	store.dispatch({type:'add',payLoad:{id:2,title:'很'}})

	store.getState().forEach(item=>console.log(item));
	
就是做了个闭包，然后对外返回了一个`store`对象,方便外面处理。

store中两个重要的方法：

1.`dispatch`,统一的接口，处理action。并维护最近的`state`
2.`getState`,得到最新的`state`

对比一下`dispatch`和上面的`listReducer`的调用，应该能看到，就是个简单的包装。

还有一个重要的方法，`subscribe`。就是为store注册监听器（listener）.每次调用了`dispatch`，就会执行注册过的监听器。这个函数官方说是比较底层的接口，建议大家不要直接用，而是使用`react-redux`。但是为了学习吗，我看一下它的使用情景


	//import listStore from 'somewhere'
	class PostListPage extends React.Component{
    	constructor(props,context){
        	super(props,context)
        	
        	//注册一个监听器
        	listStore.subscribe(()=>{
            	if(this.state.list == listStore.getState())return;
            	//console.log('update')
            	this.setState({list:listStore.getState()})
        	})
        	
    	}

    	//shouldComponentUpdate(nextProps,nextState){
    	//    return this.state.list !== nextState.list;
    	//}

    	render(){
        	var list = this.state.list;
        	return(
            	<div className='post-container'>
                	<PostList store={list}/>
                	<div className='post-load-more'>加载更多</div>
            	</div>
        	)
    	}
	}
	
`constructor`里的，注册了一个监听器，不管`listStore`在代码的各个角落（好难维护的感觉），只要有`listStore.dispatch`的调用，就会执行上面的代码，然后`setState`,更新react组件的状态，然后重绘。由于不变量，判断数据有没有改变就很高效，直接`==`比较就好。这样`shouldComponentUpdate`方法的主要职责，也做掉了。

##小总结
个人认为，以上基本就是`redux`的核心了（-_-=!）。大家去看`redux`的代码，一共对外暴露的5个方法，除了`createStore`，其他4个都是`utils`目录下的。

当然上面的很多地方都可以优化或者做相应的变化。比如各种`type`应该是常量；action 对象可以通过函数生成。生成action对象的函数，叫`actionCreator`

	store.dispatch({type:'add',payLoad:{id:1,title:'你'}})

	// =>
	
	function addItem(payLoad){
		return {
			type:'add',
			payLoad
		}
	}
	store.dispatch(addItem({id:1,title:'你'}))
	
这里，省下了指定`type`，变成了函数调用。当然这里是有两次函数调用，可以进一步简化为一次。`redux`提供了`bindActionCreators`方法

	function addItem(payLoad){
    	return {
        	type:'add',
        	payLoad
    	}
	}

	function deleteItemById(payLoad){
    	return {
        	type:'deleteById',
        	payLoad
    	}
	}

	store.dispatch(addItem({id:1,title:"你"})) //变成了二次函数调用
	store.dispatch(deleteItemById({id:1}))

	let boundActionCreator = bindActionCreators({
    	addItem,
    	deleteItemById
	},store.dispatch)

	boundActionCreator.addItem({id:10086,title:"你"}) //变成了一次函数调用。

	store.getState().forEach(item=>console.log(item))
	
不过本人觉得`bindActionCreators`不够直观，用的不多。但是如果考虑到传递给子组件，只要传递`boundActionCreator`即可,不然要传递`dispatch`和 `actionCreators`，子组件的依赖就多了一个。

	
	
