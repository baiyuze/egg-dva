import React from 'react';
import { connect } from 'dva';
import './index.less';


function Home() {
  return (
    <div className="normal">
      <h1 className="title">Yay! Welcome to dva!!</h1>
      <div className="welcome" />
      <ul className="list">
        <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
      </ul>
    </div>
  );
}



export default connect((({ home }) => {
  return {
    home
  }
}))(Home);
