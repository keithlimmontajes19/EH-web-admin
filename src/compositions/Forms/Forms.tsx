import { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  StyledText,
  StyledInput,
  StyledButton,
  HeaderStyles,
  DivEmptyStyles,
  TableContainer,
  ModalContainer,
  ImgEmptyStyles,
  InputCreateStyles,
  StyledButtonResult,
} from './styled';

import NoForms from 'assets/icons/NoFormsIcon.svg';
import { Layout, PageHeader, Table, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import { columns } from './columns';
import Results from 'compositions/Results';

/* reducer action */
import { RootState } from 'ducks/store';
import { useSelector, useDispatch } from 'react-redux';
import { getForms } from 'ducks/forms/actionCreator';

const Forms = (): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [formtitle, setFormName] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const {
    forms: { data, loading },
  }: any = useSelector<RootState>((states) => states.forms);

  useEffect(() => {
    dispatch(getForms());
  }, []);

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

  return (
    <>
      <Layout style={{ paddingRight: 50, background: 'transparent' }}>
        <TableContainer style={{ background: 'none' }} hasData={data.length}>
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
                <>
                  <Results />
                </>
              ),
              <>
                <StyledButton onClick={modalShowClose}>CREATE</StyledButton>
                <ModalContainer
                  centered
                  onOk={handleOk}
                  title="Create Forms"
                  visible={isModalVisible}
                  onCancel={modalShowClose}
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
            prefix={<SearchOutlined style={{ color: '#635ffa' }} />}
          />

          <Table
            rowKey="-id"
            dataSource={data}
            loading={loading}
            pagination={false}
            columns={columns()}
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
