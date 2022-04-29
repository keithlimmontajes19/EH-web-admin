import React from 'react';
import { StyledText } from 'compositions/TableDashboards/styled';
import { RootContainer, StyledButtonCancle, HeaderContainer, AddContainer, PlusImg, StyledButton } from './styled';
import { useHistory } from 'react-router-dom'

// antdesing componenets import here
import { Row, Col } from 'antd'
import { Breadcrumb } from 'antd';
import { PageHeader } from 'antd';
import { RedoOutlined, CheckOutlined, PlusOutlined } from '@ant-design/icons'



// icons imported here
import plusicon from '../../../../assets/icons/plus-Icon.svg'


const CreateDashboard = (props) => {
    const history = useHistory()

    const pushHistory = (route: string) => {
        history.push(route)
    }
    return (
        <RootContainer>
            <Breadcrumb separator="<">
                <Breadcrumb.Item href="/team/dashboards"> Back to Dashboards</Breadcrumb.Item>
            </Breadcrumb>
            <Row gutter={16}>
                <Col span={12} className="gutter-row">
                    <PageHeader
                        title={<StyledText>Dashboard Name 1</StyledText>}
                    />
                </Col>
                <Col span={12} className="gutter-row">
                    <Row gutter={45} justify="center">
                        <Col className='gutter-row'>
                            <Row>
                                <Col>
                                    <RedoOutlined />
                                </Col>
                                <Col>
                                    <StyledButton onClick={() => pushHistory('/team/dashboards/create/addbord')}><PlusOutlined /> BOARD</StyledButton>
                                </Col>
                            </Row>
                        </Col>
                        <Col className='gutter-row'>
                            <StyledButton><CheckOutlined /> PUBLISH</StyledButton>
                        </Col>
                        <Col className='gutter-row'>
                            <StyledButtonCancle>Cancle</StyledButtonCancle>
                        </Col>
                    </Row>

                </Col>
            </Row>
            <Row gutter={16} align="middle">
                <Col span={12} className="gutter-row">
                    <AddContainer><PlusImg src={plusicon} /></AddContainer>
                </Col>
                <Col span={12} className="gutter-row">
                    <AddContainer><PlusImg src={plusicon} /></AddContainer>

                </Col>
            </Row>

        </RootContainer >
    )
}

export default CreateDashboard