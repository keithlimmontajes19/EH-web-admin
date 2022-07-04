import { ReactElement } from "react";
import type { PropsType } from "./types";

import { StyledText } from "./styled";
import { Upload, message } from "antd";

const { Dragger } = Upload;

const UploadComponent = (props: PropsType): ReactElement => {
  const { setFileList } = props;
  const accessToken = localStorage.getItem("accessToken");
  // const API_URL = 'http://localhost:8080/api/file/post';
  const API_URL = "https://noblemen.herokuapp.com/api/file/post";

  const uploadInnerProps = {
    name: "file",
    multiple: true,
    action: API_URL,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        filterGetIDs(info.fileList);
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const filterGetIDs = (info: any) => {
    const arr: Array<string> = [];

    (info || []).filter((x) => arr.push(x.response.data._id));

    setFileList(arr);
  };

  return (
    <Dragger {...uploadInnerProps}>
      <StyledText>Drop files here or click to upload</StyledText>
    </Dragger>
  );
};

export default UploadComponent;
