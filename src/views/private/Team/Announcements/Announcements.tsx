import { ReactElement } from "react";

import type { PropsType } from "./types";
import {} from "./styled";
import Announcement from "compositions/Announcements";

const Announcements = (props: PropsType): ReactElement => {
  return (
    <>
      <Announcement />
    </>
  );
};

export default Announcements;
