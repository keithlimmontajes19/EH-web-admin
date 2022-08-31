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
  StyledFormTitle,
  InputCreateStyles,
  StyledButtonResult,
} from "./styled";

import { columns } from "./columns";
import { SearchOutlined } from "@ant-design/icons";
import { Layout, PageHeader, Table, Input } from "antd";

import Results from "compositions/Results";
import NoForms from "assets/icons/NoFormsIcon.svg";

/* reducer action */
import {
  getForms,
  deleteForm,
  getOneForm,
  getAllResults,
} from "ducks/forms/actionCreator";
import { RootState } from "ducks/store";
import { useSelector, useDispatch } from "react-redux";

const Forms = (): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [formtitle, setFormName] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const {
    results,
    forms: { data, loading },
  }: any = useSelector<RootState>((states) => states.forms);

  const modalShowClose = () => history.push(`/team/forms/createforms/form`);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    dispatch(getForms());
    dispatch(getAllResults());
  }, []);

  return (
    <>
      <Layout style={{ paddingRight: 50, background: "transparent" }}>
        <TableContainer style={{ background: "none" }} hasData={data.length}>
          <PageHeader
            ghost={false}
            title={<StyledFormTitle>Forms</StyledFormTitle>}
            style={{ paddingTop: 8, background: '#f5f5fa' }}
            extra={[
              data.length === 0 ? (
                <StyledButtonResult type="default">
                  SEE RESULTS
                </StyledButtonResult>
              ) : (
                <Results data={results?.data} loading={results?.loading} />
              ),
              <>
                <StyledButton onClick={modalShowClose}>CREATE</StyledButton>
              </>,
            ]}
          />

          <StyledInput
            placeholder="Type"
            prefix={<SearchOutlined style={{ color: "#A2A1BD" }} />}
          />

          <Table
            rowKey="_id"
            dataSource={data}
            loading={loading}
            pagination={false}
            columns={columns(
              selectedRowKeys,
              dispatch,
              deleteForm,
              history,
              getOneForm
            )}
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
