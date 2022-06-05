import { Fragment, ReactElement, useState } from "react";
import {} from "./styled";

import { Upload, message, Button } from "antd";
import type { UploadProps } from "antd";

const App = ({ values, setValues, setImageUrl }: any) => {
  const uploadProps: UploadProps = {
    maxCount: 1,
    name: "file",
    showUploadList: false,
    action: "http://localhost:8080/api/v1/upload",
    onChange(info) {
      if (info.file.status === "done") {
        const fileUrl = info?.file?.response?.data?.url;
        const fileID = info?.file?.response?.data?.uid;

        setImageUrl(fileUrl);
        setValues({ ...values, imageURL: fileID });
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Upload {...uploadProps}>
      <Button style={{ borderRadius: 15, fontWeight: 700 }}>Upload</Button>
    </Upload>
  );
};

export default App;
