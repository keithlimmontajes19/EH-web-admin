import React from "react";
import { StyledButton, StyledText } from 'compositions/TableDashboards/styled';
import { RootContainer, StyledButtonCancle, HeaderContainer, AddContainer, PlusImg, BoardContainer, BodyContainer } from './styled';


// antdesing componenets import here
import { Row, Col } from 'antd'
import { Breadcrumb } from 'antd';
import { PageHeader } from 'antd';
import { RedoOutlined, CheckOutlined, PlusOutlined } from '@ant-design/icons'



const AddBoard = (props) => {
    return (
        <RootContainer>
            <Breadcrumb separator="<">
                <Breadcrumb.Item href="/team/dashboards/create"> Back to Recent Dashboards</Breadcrumb.Item>
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
                                    <StyledButton ><PlusOutlined /> Edit</StyledButton>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <BoardContainer>
                        <HeaderContainer>
                            <Row justify="space-between">
                                <Col span={6}>Board Name_1</Col>
                                <Col span={6} style={{ color: "" }}>...</Col>
                            </Row>
                        </HeaderContainer>
                        <BodyContainer></BodyContainer>
                    </BoardContainer>
                </Col>
            </Row>

        </RootContainer >
    )
}

export default AddBoard