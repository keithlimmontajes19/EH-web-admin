import React, { ReactElement, useState } from "react";
import { Modal, Button, Collapse, Checkbox, Row } from "antd";
import type { PropsType } from "./types";
import { StyledButton } from "compositions/TableDashboards/styled";
import { Container, ModalContainer } from "./styled";
import { PlusOutlined, EnterOutlined } from "@ant-design/icons";
import Collapsetab from "components/Collapsetab";
import { render } from "@testing-library/react";
import { theme } from "utils/colors";
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world122222.
`;

const ListOfPages = (props: PropsType): ReactElement => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  // const toCollapse = (arr) => (

  // )

  const arr = [{ page1: 'page1' }, { page2: 'page2' }]
  return (
    <Container>
      <StyledButton onClick={showModal}>
        <PlusOutlined />
        Edit
      </StyledButton>
      <ModalContainer
        title="List of Pages"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ borderRadius: "15px" }}
      >

        {arr.map((item, index) => (
          <Row key={index}>
            <Checkbox>
              {Object.keys(item).map((t, index) => (
                <Collapse ghost>
                  <Collapse.Panel header={t} key="1">
                    <p key={index}>
                      <EnterOutlined
                        style={{
                          transform: 'scale(-1,1)',
                          margin: '0 10px 0 21px',
                        }}
                      />
                      <span style={{ color: theme.GRAY }}>{t}</span>
                    </p>
                  </Collapse.Panel>
                </Collapse>
              ))}
            </Checkbox>
          </Row>
        ))}

      </ModalContainer>
    </Container >
  );
};

export default ListOfPages;
