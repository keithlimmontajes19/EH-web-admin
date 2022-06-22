import { ReactElement, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import {
  StyledText,
  StyledInput,
  ButtonLabel,
  StyledButton,
  ButtonStyled,
  HeaderStyles,
  DivEmptyStyles,
  TableContainer,
  ModalContainer,
  ImgEmptyStyles,
  InputCreateStyles,
  StyledButtonResult,
} from "./styled";

import { columns } from "./columns";
import { SearchOutlined } from "@ant-design/icons";
import { Layout, PageHeader, Table, Input } from "antd";

import Results from "compositions/Results";
import NoForms from "assets/icons/NoFormsIcon.svg";

/* reducer action */
import { RootState } from "ducks/store";
import { useSelector, useDispatch } from "react-redux";
import { getForms, deleteForm } from "ducks/forms/actionCreator";

const Forms = (): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [formtitle, setFormName] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const {
    forms: { data, loading },
  }: any = useSelector<RootState>((states) => states.forms);

  const modalShowClose = () => setIsModalVisible(!isModalVisible);

  const handleOk = () => {
    setIsModalVisible(false);
    history.push(`/team/forms/createforms/${formtitle}`);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    dispatch(getForms());
  }, []);

  return (
    <>
      <Layout style={{ paddingRight: 50, background: "transparent" }}>
        <TableContainer style={{ background: "none" }} hasData={data.length}>
          <PageHeader
            ghost={false}
            title={<StyledText fS={30}>Forms</StyledText>}
            style={{ paddingTop: 8 }}
            extra={[
              data.length === 0 ? (
                <StyledButtonResult type="default">
                  SEE RESULTS
                </StyledButtonResult>
              ) : (
                <Results />
              ),
              <>
                <StyledButton onClick={modalShowClose}>CREATE</StyledButton>
                <ModalContainer
                  centered
                  onOk={handleOk}
                  title="Create Forms"
                  maskClosable={false}
                  visible={isModalVisible}
                  onCancel={modalShowClose}
                  footer={[
                    <ButtonStyled onClick={handleOk}>
                      <ButtonLabel>CREATE</ButtonLabel>
                    </ButtonStyled>,
                  ]}
                >
                  <Input
                    size="large"
                    style={InputCreateStyles}
                    placeholder="Input form name"
                    onChange={(e) => setFormName(e.target.value)}
                  />
                </ModalContainer>
              </>,
            ]}
          />

          <StyledInput
            placeholder="Search Forms"
            prefix={<SearchOutlined style={{ color: "#635ffa" }} />}
          />

          <Table
            rowKey="_id"
            dataSource={data}
            loading={loading}
            pagination={false}
            columns={columns(selectedRowKeys, dispatch, deleteForm)}
            rowSelection={rowSelection}
            locale={{
              emptyText: (
                <div style={DivEmptyStyles}>
                  <img src={NoForms} style={ImgEmptyStyles}></img>
                  <h3 style={HeaderStyles}>No Forms</h3>
                </div>
              ),
            }}
          />
        </TableContainer>
      </Layout>
    </>
  );
};

export default Forms;
