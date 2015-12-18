import React from 'react'

export default class App extends React.Component {

  constructor(props, context) {
    super(props, context)
  }

  static defalutProps = {};
  static propsType = {};

  state = {};

  render() {
    let appData = this.props.data;
console.log(appData)
    return (
      <div className='app'>
        <img src={appData.logo} className='app-logo' />
        <div>
          <p className='app-title'>{appData.title}</p>
          <p className='app-desc'>{appData.desc}</p>
          <a href={appData.download_url} target='_parent' className='install' />
        </div>
      </div>
      );
  }

}