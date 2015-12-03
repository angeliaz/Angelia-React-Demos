那些填之不尽的神坑！

1. Warning: React.render is deprecated. Please use ReactDOM.render from require('react-dom') instead.

http://facebook.github.io/react/blog/2015/10/07/react-v0.14.html
其实人家已经说了。。
React.render被废弃了，请移步ReactDOM.render

2. Warning: Each child in an array or iterator should have a unique "key" prop. Check the render method of `CommentList`. See https://fb.me/react-warning-keys for more information.

http://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js
没有解决不了的问题。。
这样可以检测到最小颗粒的dom变化，并且更新dom变化的最小部分。
我未必真的真懂了。。