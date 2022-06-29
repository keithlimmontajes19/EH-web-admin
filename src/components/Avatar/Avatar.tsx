import { ReactElement } from "react";
import type { PropsType } from "./types";

import { Avatar, Image } from "antd";
import UserIcon from "assets/icons/user-white.png";

const AvatarComponent = (props: PropsType): ReactElement => {
  const {
    size = 16,
    width = 30,
    height = 40,
    source = "",
    icon = UserIcon,
    background = "#a19cfd",
  } = props;

  const avatarProps = {
    size: size,
    src: source,
    style: {
      background: background,
    },
    icon: (
      <Image
        src={icon}
        preview={false}
        style={{ width: width, height: height }}
      />
    ),
  };

  !source && delete avatarProps.src;

  return <Avatar {...avatarProps} />;
};

export default AvatarComponent;
