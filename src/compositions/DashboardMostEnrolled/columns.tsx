import moment from 'moment';
import { StyledTitle, StyledSubtitle } from './styled';
import Card from './MyCourses';

export const columns = () => [
  {
    key: 0,
    title: '',
    align: 'center',
    dataIndex: '_id',
    render: (_a, _b, c) => {
      return <StyledSubtitle>{c + 1}</StyledSubtitle>;
    },
  },
  {
    key: 1,
    align: 'left',
    title: <StyledTitle>Recent Added Courses</StyledTitle>,
    dataIndex: 'title',
    render: (_a, b) => {
      console.log(b);
      return <Card data={b} />;
    },
  },
  {
    key: 2,
    align: 'center',
    title: <StyledSubtitle>Date</StyledSubtitle>,
    dataIndex: 'createdAt',
    render: (a) => {
      return <StyledSubtitle>{moment(a).format('LL')}</StyledSubtitle>;
    },
  },
  // {
  //   title: <StyledSubtitle>Completed</StyledSubtitle>,
  // },
];
