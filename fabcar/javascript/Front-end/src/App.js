import React, { useState } from 'react';
import {
  Row,
  Col,
  Menu
} from 'antd';
import 'antd/dist/antd.css';
import './App.css';

import {
  CreateModel,
  AddPCtoModel,
  QueryModel,
  QueryComponent
} from './components';

function App() {
  const [selectedKey, changeSelectedKey] = useState('create-model');

  const onClick = ({item, key, keyPath, e}) => {
    changeSelectedKey(key);
  };

  const { SubMenu } = Menu;

  return (
    <div className="App">
      <Row className="wrapper">
        <Col span={6} className="menu">
          <Menu
            onClick={onClick}
            style={{ width: 256 }}
            defaultSelectedKeys={selectedKey}
            defaultOpenKeys={['invoke']}
            mode="inline"
          >
            <SubMenu
              key="invoke"
              title={
                <span>
                  <span>Invoke</span>
                </span>
              }
            >
              <Menu.Item key="create-model">Create Model</Menu.Item>
              <Menu.Item key="add-pc-model">Add PC to Model</Menu.Item>
            </SubMenu>
            <SubMenu
              key="query"
              title={
                <span>
                  <span>Query</span>
                </span>
              }
            >
              <Menu.Item key="query-model">Query Model</Menu.Item>
              <Menu.Item key="query-component">Query Component</Menu.Item>
            </SubMenu>
          </Menu>
        </Col>
        <Col span={18}>
          {selectedKey === 'create-model' &&
            <CreateModel />
          }
          {selectedKey === 'add-pc-model' &&
            <>
              <AddPCtoModel />
            </>
          }
          {selectedKey === 'query-model' &&
            <>
              <QueryModel />
            </>
          }
          {selectedKey === 'query-component' &&
            <>
              <QueryComponent />
            </>
          }
        </Col>
      </Row>
    </div>
  );
}

export default App;
