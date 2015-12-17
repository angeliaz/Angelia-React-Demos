import Immutable from 'immutable';
import {createStore,bindActionCreators} from 'redux'


function listReducer(state,action){
    if(action.type == 'add'){
        return state.push(action.payLoad)
    }
    if(action.type == 'deleteById'){
        //对于删除，可以使用delete，
        //但是还有一种方法，过滤掉这个id

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

var initState = Immutable.List.of();
let curState = initState;

var store = createStore(listReducer, initState);
store.subscribe(() => {console.log('lalalall');});

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

let actionCreator = bindActionCreators({
    addItem,
    deleteItemById
}, store.dispatch);

var data = [
    {id: 1, name: 'n1'},
    {id: 2, name: 'n2'},
    {id: 3, name: 'n3'}
];

data.forEach(item => {actionCreator.addItem(item) });

store.getState().forEach(item => console.log(item));

var Test = {};

module.exports = Test;