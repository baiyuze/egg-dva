import React from 'react';
import { connect } from 'dva';
import './index.less';


function IndexPage() {
  return (
    <div className="normal">
      <h1 className="title">Yay! Welcome to dva!!</h1>
      <div className="welcome" />
      <ul className="list">
        <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        <li><a href="#/products">Getting Started</a></li>
      </ul>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
