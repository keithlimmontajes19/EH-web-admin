import { ReactElement } from "react";

import { LineInput, StyledText, StyledTree, TreeNodeStyle } from "./styled";
import IconImage from "components/IconImage";
import SORT_ICON from "assets/icons/drag-icon.png";
import { Col, Modal, Row, Space, Tree } from "antd";
import { PlusCircleFilled, MinusCircleFilled } from "@ant-design/icons";
import { theme } from "utils/colors";

const TreeNode = Tree.TreeNode;

const BuilderQuizSort = ({ item, submitQ, deleteQ }: any): ReactElement => {
  const data = { ...item };

  const generateData = (x, i) => {
    const props = {
      title: (
        <>
          <StyledText
            fS={25}
            fC={`${theme.PRIMARY}88`}
            className="ant-tree-title-number"
          >
            {i + 1}
          </StyledText>
          <LineInput
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

    const tmp = [...data.resource.answer];
    const a = tmp[dragIndex];
    const b = tmp[dropIndex];
    tmp[dragIndex] = b;
    tmp[dropIndex] = a;
    data.resource.answer = tmp.filter((x) => x);

    submitQ(data);
  };

  const onDelete = () => {
    Modal.confirm({
      title: "Are you sure, you want to delete this record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {},
    });
  };

  return (
    <div className="question">
      <Row justify="start" style={{ marginBottom: 50 }}>
        <Col flex={1} style={{ justifyContent: "center", paddingRight: 35 }}>
          <LineInput
            value={data.title}
            placeholder="Sort Title"
            onChange={(e) => {
              data.title = e.target.value;
              submitQ(data);
            }}
          />
        </Col>
        <Col flex={23} style={{ justifyContent: "center" }}>
          <LineInput
            defaultValue={data.description}
            placeholder="Sort Description"
            onChange={(e) => {
              data.description = e.target.value;
              submitQ(data);
            }}
          />
        </Col>
        <Col span={3}>
          <Row justify="end">
            <StyledText fS={18} onClick={deleteQ} className="question-delete">
              DELETE
            </StyledText>
          </Row>
        </Col>
      </Row>
      <StyledTree
        draggable={{
          icon: <IconImage source={SORT_ICON} width={60} height={60} />,
          nodeDraggable: () => true,
        }}
        selectable={false}
        onDrop={onDrop}
        showLine={false}
      >
        {data.resource.answer.map(generateData)}
      </StyledTree>
      <Space size={0} style={{ margin: "10px 0 50px 50px" }}>
        <StyledText fS={30}>
          <PlusCircleFilled
            onClick={() => {
              data.resource.answer.push("");
              submitQ(data);
            }}
          />
          <MinusCircleFilled
            onClick={() => {
              if (data.resource.answer.length <= 1) return;
              data.resource.answer.pop();
              submitQ(data);
            }}
          />
        </StyledText>
        <StyledText fS={18}>ANSWER</StyledText>
      </Space>
    </div>
  );
};

export default BuilderQuizSort;
