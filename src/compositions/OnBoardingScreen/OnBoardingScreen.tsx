import { ReactElement } from 'react';

import type { PropsType, Params } from './types';
import { PageHeader, Breadcrumb, Layout, Input, Button } from 'antd';
import { Link, useParams } from 'react-router-dom';
import { RedoOutlined, MoreOutlined } from '@ant-design/icons'
import { StyledButton, StyledButtonCancle, StyledText, UploadButton, ContainerImg, ScreenContainer, MainScreenContainer, ImgaeContainer, TitleContainer, DescreptionContainer } from './styled';
import { theme } from 'utils/colors';

// icons imported here
import galleryicon from "assets/icons/gallery-icon.svg"



const OnBoardingScreen = (props: PropsType): ReactElement => {
  const params: Params = useParams()
  return <>
    <PageHeader
      breadcrumb={
        <Breadcrumb separator="<">
          <Breadcrumb.Item> </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to="/team/onboarding" style={{ textDecoration: "underline" }}>
              Back to Onboarding Screen
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
          }} />, <StyledButton>Save</StyledButton>, <StyledButtonCancle>Cancle</StyledButtonCancle>, <MoreOutlined style={{ color: `${theme.DEFAULT}`, cursor: 'pointer' }} />
      ]}
    >

    </PageHeader>
    <MainScreenContainer>

      <StyledText>{params.screenname || 'Screen name 1'}</StyledText>

      <ScreenContainer>
        <div style={{ padding: '30px 30px 0px 30px' }}>
          <ContainerImg>
            <ImgaeContainer src={galleryicon} />
            <UploadButton>Upload</UploadButton>
          </ContainerImg>
        </div>
        <TitleContainer>
          <Input
            placeholder='Title Text'
            style={{ background: "#F8F8F8", height: '45px', fontSize: '20px', borderColor: 'none', fontWeight: '700', textAlign: 'center', margin: '5px 0px', width: '275px' }}
            defaultValue={"Title Text"}

          >
          </Input>
        </TitleContainer>
        <DescreptionContainer><Input.TextArea
          placeholder="Short Descreption"
          style={{
            background: "#F8F8F8",
            height: "80px",
            marginTop: '0px',
            padding: '0px 32px',
            fontSize: "14px",
            textAlign: 'center',
            fontWeight: '400',
            width: '275px'

          }}
          defaultValue={"Short Descreption"}
        >

        </Input.TextArea></DescreptionContainer>
      </ScreenContainer>
    </MainScreenContainer>

  </>;
};

export default OnBoardingScreen;
