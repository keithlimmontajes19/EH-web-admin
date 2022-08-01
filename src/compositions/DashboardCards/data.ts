import { theme } from "utils/colors";

import EMPLOYEE_ICON from "assets/icons/card-employee.png";
import ORG_ICON from "assets/icons/card-org.png";
import COURSES_ICON from "assets/icons/card-courses.png";
import VIDEOS_ICON from "assets/icons/card-videos.png";
import SURVEYS from "assets/icons/card-surveys.png";
import PAGES_ICON from "assets/icons/card-pages.png";

export const CARD_LIST = [
  {
    width: 24,
    height: 31,
    title: "Employees",
    icon: EMPLOYEE_ICON,
    color: theme.CARD_EMPLOYEE,
  },
  {
    width: 24,
    height: 31,
    title: "Organizations",
    icon: ORG_ICON,
    color: theme.CARD_ORG,
  },
  {
    width: 30,
    height: 31,
    title: "Courses",
    icon: COURSES_ICON,
    color: theme.CARD_COURSES,
  },
  {
    width: 35,
    height: 35,
    title: "Videos",
    icon: VIDEOS_ICON,
    color: theme.CARD_VIDEOS,
  },
  {
    width: 31,
    height: 39,
    title: "Surveys",
    icon: SURVEYS,
    color: theme.CARD_SURVEY,
  },
  {
    width: 29,
    height: 36,
    title: "Pages",
    icon: PAGES_ICON,
    color: theme.CARD_PAGES,
  },
];
