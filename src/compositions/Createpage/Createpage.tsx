import { ReactElement, useState } from "react";
import {
  PageHeader,
  Breadcrumb,
  Row,
  Col,
  Layout,
  InputNumber,
  Button,
} from "antd";

import {
  RedoOutlined,
  CheckOutlined,
  PlusOutlined,
  UnderlineOutlined,
} from "@ant-design/icons";
import { Editor, EditorState, RichUtils } from "draft-js";
import type { PropsType } from "./types";
import {
  StyledButton,
  StyledButtonCancle,
  MenuContainer,
  FontStyleContainer,
  ItemContainer,
  EditorContainer,
} from "./styled";
// import { StyledText } from "compositions/TableDashboards/styled";
import { Link } from "react-router-dom";
// import ColorPicker, { colorPickerPlugin } from "draft-js-color-picker";

// Add preset colors to the picker
const presetColors = [
  "#ff00aa",
  "#F5A623",
  "#F8E71C",
  "#8B572A",
  "#7ED321",
  "#417505",
  "#BD10E0",
  "#9013FE",
  "#4A90E2",
  "#50E3C2",
  "#B8E986",
  "#000000",
  "#4A4A4A",
  "#9B9B9B",
  "#FFFFFF",
];

const Createpage = (props: PropsType): ReactElement => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  // const updateEditorstate = setEditorState({ ...editorState });

  const boldText = () => {
    const nextState = RichUtils.toggleInlineStyle(editorState, "BOLD");

    setEditorState(nextState);
  };

  const UnderLineText = () => {
    const textdecoration = RichUtils.toggleInlineStyle(
      editorState,
      "UNDERLINE"
    );
    setEditorState(textdecoration);
  };

  const ItalicText = () => {
    const textdecoration = RichUtils.toggleInlineStyle(editorState, "ITALIC");
    setEditorState(textdecoration);
  };

  // let picker = colorPickerPlugin(setEditorState(editorState), editorState);
  return (
    <>
      <PageHeader
        breadcrumb={
          <Breadcrumb separator="<">
            <Breadcrumb.Item> </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/team/pages" style={{ textDecoration: "underline" }}>
                Back to Pages
              </Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        }
        ghost={false}
        style={{
          background: "none",
          paddingTop: 8,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        extra={[
          <RedoOutlined
            style={{
              fontSize: "25px",
              paddingRight: "24px",
              cursor: "pointer",
            }}
          />,
          <StyledButton>
            <CheckOutlined /> Publish
          </StyledButton>,
          <StyledButtonCancle>Cancle</StyledButtonCancle>,
        ]}
      />
      <Layout
        style={{
          background: "none",
        }}
      >
        <Row>
          <Col flex="1 1 200px">
            <EditorContainer>
              <Editor editorState={editorState} onChange={setEditorState} />
            </EditorContainer>
          </Col>
          <Col flex="0 1 300px">
            <MenuContainer style={{ minHeight: "800px", height: "auto" }}>
              <FontStyleContainer>
                <ItemContainer>
                  <InputNumber
                    style={{ borderRadius: "15px", width: "40px" }}
                    type="number"
                  />
                </ItemContainer>
                <ItemContainer>
                  <Button
                    ghost={false}
                    onClick={boldText}
                    style={{ borderRadius: "15px" }}
                  >
                    B
                  </Button>
                </ItemContainer>
                <ItemContainer>
                  <Button ghost={false} onClick={ItalicText}>
                    I
                  </Button>
                </ItemContainer>
                <UnderlineOutlined onClick={UnderLineText} />
                {/* <ColorPicker toggleColor={(color) => picker.addColor(color)} /> */}
              </FontStyleContainer>
            </MenuContainer>
          </Col>
        </Row>
      </Layout>
    </>
  );
};

export default Createpage;
