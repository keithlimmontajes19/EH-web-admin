import {ReactElement} from 'react';

import {
  PageHeader,
  Breadcrumb,
  Row,
  Col,
  Layout,
  InputNumber,
  Button,
  message,
  Menu,
} from "antd";
import Dropdown from 'components/Dropdown';
import type{MenuProps} from 'antd'
import type {PropsType,Params} from './types';
import{PlusOutlined ,UserOutlined,DownOutlined} from "@ant-design/icons"
import {StyledText,StyledButton} from './styled';
import { Link, Route, useHistory, useParams } from 'react-router-dom';


const headerActions = [
  {
    name: 'action 1',
    action: () => console.log('action 1'),
  },
  {
    name: 'action 2',
    action: () => console.log('action 2'),
  },
];



const CreateForm = (props: PropsType): ReactElement => {

  const history = useHistory()

  const params:Params = useParams();
  function handleButtonClick(e) {
    message.info('Click on left button.');
    console.log('click left button', e);
  }
  
  function handleMenuClick(e) {
    message.info('Click on menu item.');
    console.log('click', e);
  }
  const pushHistory = (route:string)=>{
    history.push(route)
  }

  
  return <>
  <PageHeader
     breadcrumb={
      <Breadcrumb separator="<">
        <Breadcrumb.Item> </Breadcrumb.Item>
        <Breadcrumb.Item>
          <Link to="/team/forms" style={{ textDecoration: "underline" }}>
            Back to Forms
          </Link>
        </Breadcrumb.Item>
      </Breadcrumb>}
      ghost={false}
     
      style={{
       
      }}
      extra={[
        
        <StyledButton
                w={130}
                onClick={() => history.push('/learn/courses/add')}
              >
                <PlusOutlined />
                ADD
              </StyledButton>,
     
        <Dropdown
        menu={headerActions}
        title={
          <span style={{paddingLeft: 50}}>
            <StyledText fS={20}>
              Actions&nbsp;
              <DownOutlined style={{fontSize: 15}} />
            </StyledText>
          </span>
        }
      />
      ]}
  />
  <StyledText fS={30} style={{color:'#000',padding:'5px'}}>{params.formtitle}</StyledText>
    </>;
};

export default CreateForm;
