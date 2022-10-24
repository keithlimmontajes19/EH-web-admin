import { ReactElement } from 'react';

import { StyledTree, TreeNodeStyle } from './styled';
import IconImage from 'components/IconImage';
import Text from 'components/Text';
import Input from 'components/Input';
import SORT_ICON from 'assets/icons/drag-icon.png';
import { Col, Modal, Row, Space, Tree } from 'antd';
import { PlusCircleFilled, EditOutlined } from '@ant-design/icons';
import { theme } from 'utils/colors';

const TreeNode = Tree.TreeNode;

const BuilderQuizSort = ({ item, submitQ, deleteQ }: any): ReactElement => {
  const data = { ...item };

  const generateData = (x, i) => {
    const props = {
      title: (
        <>
          <Text
            fS={25}
            fC={`${theme.PRIMARY}88`}
            className="ant-tree-title-number"
          >
            {i + 1}
          </Text>
          <Input
            isNaked={true}
            value={x}
            placeholder={`Answer #${i + 1}`}
            onChange={(e) => {
              data.resource.answer[i] = e.target.value;
              submitQ(data);
            }}
          />
        </>
      ),
      key: i,
    };
    return <TreeNode {...props} style={TreeNodeStyle} />;
  };

  const onDrop = (info) => {
    const dropIndex = Number(info.node.props.eventKey);
    const dragIndex = Number(info.dragNode.props.eventKey);
    if (dropIndex === dragIndex) return;

    const tmp = [...data.answer];
    const a = tmp[dragIndex];
    const b = tmp[dropIndex];
    tmp[dragIndex] = b;
    tmp[dropIndex] = a;
    data.answer = tmp.filter((x) => x);

    submitQ(data);
  };

  const onDelete = () => {
    Modal.confirm({
      title: 'Are you sure, you want to delete this record?',
      okText: 'Yes',
      okType: 'danger',
      onOk: () => {},
    });
  };

  return (
    <div className="question">
      <Row justify="start" gutter={15}>
        <Col flex={1}>
          <Input
            isNaked={true}
            placeholder="Sort Title"
            defaultValue={data?.title}
            style={{ height: 48, borderRadius: 8 }}
            onChange={(e) => {
              data.title = e.target.value;
              submitQ(data);
            }}
          />
        </Col>

        <Col span={3}>
          <Input
            placeholder="0"
            isNumber={true}
            value={data?.points}
            onChange={(e) => {
              if (!/^\d{0,2}$/.test(e.target.value)) return;
              data.points = { points: e.target.value };
              submitQ(data);
            }}
            style={{
              height: 48,
              maxWidth: 255,
              borderRadius: 8,
              border: '1px solid #635FFA',
            }}
          />
        </Col>

        <Col>
          <p>
            <br />
            point
            <EditOutlined
              style={{ fontSize: 20, color: '#4C4B7B', marginLeft: 5 }}
            />
          </p>
        </Col>
      </Row>

      <StyledTree
        onDrop={onDrop}
        showLine={false}
        selectable={false}
        draggable={{
          icon: <IconImage source={SORT_ICON} width={60} height={60} />,
          nodeDraggable: () => true,
        }}
      >
        {data?.answer.map(generateData)}
      </StyledTree>

      <Space size={0} style={{ margin: '10px 0 50px 50px' }}>
        <Text fS={30}>
          <PlusCircleFilled
          // onClick={() => {
          //   data?.answer.push('');
          //   submitQ(data);
          // }}
          />
          {/* <MinusCircleFilled
            onClick={() => {
              if (data.resource.answer.length <= 1) return;
              data.resource.answer.pop();
              submitQ(data);
            }}
          /> */}
        </Text>
        <Text fS={18}>ANSWER</Text>
      </Space>
    </div>
  );
};

export default BuilderQuizSort;
