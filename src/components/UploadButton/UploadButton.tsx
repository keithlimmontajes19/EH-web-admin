import { Fragment, ReactElement, useState } from "react";
import {} from "./styled";

import { Upload, message, Button } from "antd";
import type { UploadProps } from "antd";

const App = ({
  values,
  setValues,
  setImageUrl,
  placeholder = "Upload",
  border = "1px solid #635FFA",
}: any) => {
  /**
   * =============================================================
   * MAIN URL https://engage-hub-platform-dev.herokuapp.com/api/v1
   * LOCAL URL http://localhost:8080/api/v1/upload
   * =============================================================
   */
  const baseURL = "https://engage-hub-platform-dev.herokuapp.com/api/v1/upload";

  const uploadProps: UploadProps = {
    maxCount: 1,
    name: "file",
    action: baseURL,
    showUploadList: false,
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
      <Button
        style={{
          border: border,
          fontWeight: 500,
          color: "#635FFA",
          borderRadius: 15,
        }}
      >
        {placeholder}
      </Button>
    </Upload>
  );
};

export default App;
