import { ReactElement, useEffect, useState } from "react";
import type { PropsType, Params } from "./types";
import { Link, useParams } from "react-router-dom";

/* styles antd */
import {
  StyledText,
  ContainerImg,
  StyledButton,
  ImgaeContainer,
  TitleContainer,
  ScreenContainer,
  StyledButtonCancle,
  MainScreenContainer,
  DescreptionContainer,
} from "./styled";
import { theme } from "utils/colors";
import { PageHeader, Breadcrumb, Input } from "antd";

/* icon */
import UploadButton from "components/UploadButton";
import galleryicon from "assets/icons/gallery-icon.svg";
import { RedoOutlined, MoreOutlined } from "@ant-design/icons";

/* reducer action */
import { RootState } from "ducks/store";
import { useSelector, useDispatch } from "react-redux";
import { postOnboarding } from "ducks/onboarding/actionCreator";

const AddOnboardingScreen = (props: PropsType): ReactElement => {
  const dispatch = useDispatch();
  const params: Params = useParams();

  const [imageUrl, setImageUrl] = useState("");
  const [values, setValues] = useState({
    name: params?.screenname || "",
    title: "",
    imageURL: "",
    description: "",
  });

  return (
    <>
      <PageHeader
        ghost={false}
        breadcrumb={
          <Breadcrumb separator="<">
            <Breadcrumb.Item> </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link
                to="/team/onboarding"
                style={{ fontSize: 16, color: "#A2A1BD" }}
              >
                Back to Onboarding Screens
              </Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        }
        style={{
          paddingTop: 8,
          display: "flex",
          background: "none",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        extra={[
          <RedoOutlined
            style={{
              fontSize: "25px",
              cursor: "pointer",
              paddingRight: "24px",
            }}
          />,
          <StyledButton onClick={() => dispatch(postOnboarding(values))}>
            Save
          </StyledButton>,
          <StyledButtonCancle>Cancel</StyledButtonCancle>,
          <MoreOutlined
            style={{ color: `${theme.DEFAULT}`, cursor: "pointer" }}
          />,
        ]}
      />

      <MainScreenContainer>
        <StyledText>{params?.screenname || ""}</StyledText>

        <ScreenContainer>
          <div style={{ padding: "30px 30px 0px 30px", marginBottom: 10 }}>
            <ContainerImg>
              <ImgaeContainer src={imageUrl || galleryicon} />
            </ContainerImg>
          </div>

          <UploadButton
            values={values}
            setValues={setValues}
            setImageUrl={setImageUrl}
          />

          <TitleContainer>
            <Input
              style={{
                width: "275px",
                height: "45px",
                fontSize: "20px",
                margin: "5px 0px",
                fontWeight: "700",
                borderColor: "none",
                textAlign: "center",
                background: "#F8F8F8",
              }}
              placeholder="Title"
              value={values?.title}
              onChange={(e) => setValues({ ...values, title: e.target.value })}
            />
          </TitleContainer>

          <DescreptionContainer>
            <Input.TextArea
              style={{
                width: "275px",
                height: "80px",
                marginTop: "0px",
                fontSize: "14px",
                fontWeight: "400",
                textAlign: "center",
                padding: "0px 32px",
                background: "#F8F8F8",
              }}
              placeholder="Description"
              value={values?.description}
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </DescreptionContainer>
        </ScreenContainer>
      </MainScreenContainer>
    </>
  );
};

export default AddOnboardingScreen;
