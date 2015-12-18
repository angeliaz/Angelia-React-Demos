import React from 'react'
import Immutable from 'immutable'
import SimpleList from './SimpleList.js'
import Test from './test.js'

var list = Immutable.List.of(
    {id:1,content:'dog1'},
    {id:2,content:'cat1'},
    {id:3,content:'pig'}
)
let listElement = <SimpleList list={list}></SimpleList>

React.render(
    listElement,
    document.getElementById('mount-dom')
)

