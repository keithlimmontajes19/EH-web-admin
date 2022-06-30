import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

/* icons */
import plusicon from "assets/icons/plus-Icon.svg";

/* styles antd */
import { Breadcrumb, Col, Input, Modal, PageHeader } from "antd";
import { RootContainer, FlexWrap, AddContainer, PlusImg } from "./styled";
import {
  RedoOutlined,
  MoreOutlined,
  PlusOutlined,
  CheckOutlined,
  EditOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { StyledText } from "compositions/TableDashboards/styled";

/* components */
import Board from "compositions/Board";
import ListOfPages from "compositions/ListOfPages";

/* reducer action */
import { RootState } from "ducks/store";
import { useDispatch, useSelector } from "react-redux";
import {
  getOneDashboard,
  postDashboard,
  updateDashboard,
} from "ducks/dashboard/actionCreator";
import StyledButton from "components/StyledButton";
import { theme } from "utils/colors";
import Loading from "components/Loading";

const BuilderDashboard = () => {
  const history = useHistory();
  const params: any = useParams();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [onDispatch, setOnDispatch] = useState(false);
  const [forceEdit, setForceEdit] = useState(false);
  const [editedData, setEditedData]: any = useState(false);
  const [pageState, setPageState]: any = useState({
    isVisible: false,
    defaultVal: [],
    pageResult: [],
    callback: () => {},
  });
  const [editInput, setEditInput]: any = useState({
    isVisible: false,
    title: "",
    inputVal: "",
    callback: () => {},
  });

  const { single_dashboard }: any = useSelector<RootState>(
    (state) => state.dashboard
  );

  useEffect(() => {
    if (params?.page === "create") {
      setEditedData({
        name: "New Dashboard",
        isPublish: true,
        boards: [],
        organization: [],
      });
      setLoading(false);
    } else
      dispatch(
        getOneDashboard({
          dashboardId: params?.page,
          callback: (res) => {
            if (!res) return;
            setLoading(false);
            setEditedData(false);
            setOnDispatch(false);
          },
        })
      );
  }, []);

  const handlePublish = () => {
    if (!editedData) return;
    if (onDispatch) return;

    setOnDispatch(true);
    if (params?.page === "create")
      return dispatch(
        postDashboard({
          data: editedData,
          callback: (res) => {
            if (!res) return;
            history.replace("team/dashboards/" + res._id);
            dispatch(
              getOneDashboard({
                dashboardId: res._id,
                callback: (res) => {
                  if (!res) return;
                  setLoading(false);
                  setEditedData(false);
                  setOnDispatch(false);
                },
              })
            );
          },
        })
      );

    localStorage.setItem("dashboardId", editedData._id);
    dispatch(
      updateDashboard({
        data: editedData,
        callback: (res) => {
          if (!res) return;
          dispatch(
            getOneDashboard({
              dashboardId: params?.page,
              callback: (res) => {
                if (!res) return;
                setLoading(false);
                setEditedData(false);
                setOnDispatch(false);
              },
            })
          );
        },
      })
    );
  };

  const handleBoardAdd = () => {
    resetInputs();
    if (onDispatch) return;
    if (!editedData) {
      const copy = JSON.parse(JSON.stringify(single_dashboard.data[0]));
      copy.boards = [
        ...copy.boards,
        {
          board_name: "Board " + (Number(copy.boards.length) + 1),
          board_items: [],
        },
      ];
      return setEditedData(copy);
    }

    const prev = JSON.parse(JSON.stringify(editedData));
    prev.boards = [
      ...prev.boards,
      {
        board_name: "Boards " + (prev.boards.length + 1),
        board_items: [],
      },
    ];
    setEditedData(prev);
  };
  const handleBoardChange = (index, data) => {
    resetInputs();
    if (onDispatch) return;
    if (!editedData)
      return setEditedData(() => {
        const copy = JSON.parse(JSON.stringify(single_dashboard.data[0]));
        copy.boards[index] = data;
        return copy;
      });

    setEditedData((prev) => {
      prev.boards[index] = data;
      return prev;
    });
  };
  const handleBoardDelete = (index) => {
    resetInputs();
    if (onDispatch) return;
    if (!editedData) {
      const copy = JSON.parse(JSON.stringify(single_dashboard.data[0]));
      copy.boards = copy.boards.filter((obj, i) => i !== index);
      return setEditedData(copy);
    }

    const prev = JSON.parse(JSON.stringify(editedData));
    prev.boards = prev.boards.filter((obj, i) => i !== index);
    setEditedData(prev);
  };

  const handleRenameDashboard = (e) => {
    resetInputs();
    if (onDispatch) return;
    if (!editedData) {
      const copy = JSON.parse(JSON.stringify(single_dashboard.data[0]));
      copy.name = e;
      setEditedData(copy);
    } else {
      const prev = JSON.parse(JSON.stringify(editedData));
      prev.name = e;
      setEditedData(prev);
    }
  };

  const resetPageState = () =>
    setPageState({
      isVisible: false,
      defaultVal: [],
      pageResult: [],
      callback: () => {},
    });
  const resetEditInput = () =>
    setEditInput({
      isVisible: false,
      title: "",
      inputVal: "",
      callback: () => {},
    });
  const resetInputs = () => {
    resetPageState();
    resetEditInput();
  };

  const HeadOfPage = () => (
    <PageHeader
      title={
        <StyledText
          onClick={() => {
            const title = editedData
              ? editedData?.name
              : single_dashboard?.data?.length
              ? single_dashboard?.data[0].name
              : "";
            setEditInput({
              isVisible: true,
              title: "Rename " + title,
              inputVal: title,
              callback: handleRenameDashboard,
            });
          }}
        >
          <span style={{ cursor: "pointer" }}>
            {editedData
              ? editedData?.name
              : single_dashboard?.data?.length
              ? single_dashboard?.data[0].name
              : ""}
          </span>
        </StyledText>
      }
      extra={[
        <RedoOutlined
          style={{
            fontSize: "25px",
            paddingRight: "24px",
            cursor: "pointer",
          }}
        />,
        editedData || forceEdit ? (
          <>
            <StyledButton w={134} onClick={handleBoardAdd}>
              <PlusOutlined /> BOARD
            </StyledButton>
            <StyledButton
              m="0 15px"
              onClick={handlePublish}
              disabled={forceEdit && !editedData}
            >
              {onDispatch ? <LoadingOutlined spin /> : <CheckOutlined />}{" "}
              PUBLISH
            </StyledButton>
            <StyledButton
              bg={"none"}
              c={theme.PRIMARY}
              w={104}
              onClick={() => {
                if (onDispatch) return;
                if (params.page === "create")
                  return history.push("/team/dashboards/");
                setEditedData(false);
                setForceEdit(false);
              }}
            >
              CANCEL
            </StyledButton>
          </>
        ) : (
          <>
            <StyledButton w={106} onClick={() => setForceEdit(true)}>
              <EditOutlined /> EDIT
            </StyledButton>
            <MoreOutlined
              style={{ fontSize: "26px", color: "#635FFA", cursor: "pointer" }}
            />
          </>
        ),
      ]}
    />
  );

  const BlankBoardFiller = ({ scalable }) => (
    <Col span={12}>
      <AddContainer scalable={scalable}>
        <PlusImg src={plusicon} onClick={handleBoardAdd} />
      </AddContainer>
    </Col>
  );

  return (
    <RootContainer style={{ background: "none !important" }}>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/team/dashboards"> {`< Back to Dashboards`}</Link>
        </Breadcrumb.Item>
      </Breadcrumb>
      {loading ? (
        <Loading />
      ) : (
        <>
          <HeadOfPage />

          <FlexWrap>
            {(editedData
              ? editedData?.boards
              : single_dashboard?.data?.length
              ? single_dashboard?.data[0]?.boards || []
              : []
            ).map((board, index) => (
              <Board
                key={index}
                index={index}
                item={board}
                saveBoard={handleBoardChange}
                deleteBoard={handleBoardDelete}
                setPageState={setPageState}
                setEditInput={setEditInput}
              />
            ))}
            {editedData || forceEdit ? (
              (
                editedData
                  ? editedData?.boards?.length % 2 === 0
                  : single_dashboard?.data?.length % 2 === 0
              ) ? (
                <>
                  <BlankBoardFiller scalable={false} />
                  <BlankBoardFiller scalable={false} />
                </>
              ) : (
                <BlankBoardFiller scalable={true} />
              )
            ) : (
              <></>
            )}
          </FlexWrap>
        </>
      )}
      <ListOfPages
        visible={pageState.isVisible}
        defaultVal={pageState.defaultVal}
        handleOk={(result) => {
          pageState.callback(result);
        }}
        handleCancel={resetPageState}
      />
      <Modal
        visible={editInput.isVisible}
        title={editInput.title}
        children={
          <Input
            value={editInput.inputVal}
            onChange={(e) =>
              setEditInput((prev) => ({ ...prev, inputVal: e.target.value }))
            }
          />
        }
        onOk={() => {
          editInput.callback(editInput.inputVal);
        }}
        onCancel={resetEditInput}
        okButtonProps={{ disabled: editInput.inputVal === "" }}
      />
    </RootContainer>
  );
};

export default BuilderDashboard;
