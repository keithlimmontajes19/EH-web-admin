import React, { ReactElement, useEffect, useState } from "react";
import { Modal, Button, Collapse, Checkbox, Row, Spin } from "antd";
import type { PropsType } from "./types";
import { StyledButton } from "compositions/TableDashboards/styled";
import { Container, ModalContainer } from "./styled";
import {
  EnterOutlined,
  EditOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import Collapsetab from "components/Collapsetab";
import { render } from "@testing-library/react";
import { theme } from "utils/colors";
import { getOnePage, getPages } from "ducks/pages/actionCreator";
import { useDispatch } from "react-redux";

const ListOfPages = ({
  visible,
  defaultVal,
  handleOk,
  handleCancel,
}): ReactElement => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {
    dispatch(
      getPages({
        callback: (e) => {
          if (!e) return;
          iterateDispatchPage();
          setData(e);
        },
      })
    );
  }, []);

  const iterateDispatchPage = (count = 0) => {
    if (count >= data.length) return;
    dispatch(
      getOnePage({
        pageId: data[count]._id,
        callback: (e) => {
          iterateDispatchPage(count + 1);
          if (e)
            setData((prev) => {
              prev[count].forms = e.forms;
              return prev;
            });
        },
      })
    );
  };

  const makeTitle = (record) => {
    const { forms } = record;
    const testA = forms ? forms.length > 0 : false;
    const toCollapse = (arr) => (
      <Collapse ghost>
        <Collapse.Panel header={record.title} key="2">
          {typeof arr[0] !== "object" ? (
            <div>
              <EnterOutlined
                style={{
                  transform: "scale(-1,1)",
                  margin: "0 10px 0 21px",
                }}
              />
              <Spin indicator={<LoadingOutlined spin />} />
            </div>
          ) : (
            arr.map(({ title }) => (
              <div>
                <EnterOutlined
                  style={{
                    transform: "scale(-1,1)",
                    margin: "0 10px 0 21px",
                  }}
                />
                <span style={{ color: theme.BLACK }}>{String(title)}</span>
              </div>
            ))
          )}
        </Collapse.Panel>
      </Collapse>
    );
    return testA ? (
      toCollapse(forms)
    ) : (
      <span className="ant-no-collapse" style={{ marginLeft: 36 }}>
        {record.title}
      </span>
    );
  };

  const okHandler = () => {
    const filteredId = selectedData.filter((id) => !defaultVal.includes(id));
    const result = data.filter((item) => filteredId.includes(item._id));
    setSelectedData([]);
    handleOk(result);
  };

  return (
    <ModalContainer
      title="List of Pages"
      visible={visible}
      onOk={okHandler}
      onCancel={() => {
        setSelectedData([]);
        handleCancel();
      }}
      okText="ADD PAGES"
      cancelText="CANCEL"
      style={{ borderRadius: "15px" }}
    >
      <Checkbox.Group value={selectedData} onChange={(e) => setSelectedData(e)}>
        {data.map((item, i) => (
          <Row key={i}>
            <Checkbox value={item._id} disabled={defaultVal.includes(item._id)}>
              {makeTitle(item)}
            </Checkbox>
          </Row>
        ))}
      </Checkbox.Group>
    </ModalContainer>
  );
};

export default ListOfPages;
