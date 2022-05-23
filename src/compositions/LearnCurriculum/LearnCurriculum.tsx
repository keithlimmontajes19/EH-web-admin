import {ReactElement} from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';

/* styled */
import {
  FlexRow,
  MarginTop,
  CardStyled,
  TextStyled,
  TitleStyled,
  SubtitleStyled,
  FlexSpaceBetween,
  ProgressContainer,
} from './styled';
import {Image} from 'antd';

/* images */
// import SampleImage from 'assets/images/image.png';
// import DefaultImage from 'assets/images/no-image.png';
import UserImage from 'assets/images/user-icon.png';

/* recuer action */
import {RootState} from 'ducks/store';
import {useSelector} from 'react-redux';
import {getCurriculum} from 'ducks/lms/actionCreator';

/* components */
import IconImage from 'components/IconImage';
import CircularProgress from 'components/CircularProgress';

const LearnCurriculum = (): ReactElement => {
  const history = useHistory();
  const dispatch = useDispatch();

  const {ongoingCourses}: any = useSelector<RootState>((state) => state.lms);

  return (
    <CardStyled>
      <TextStyled>My Courses</TextStyled>
      <MarginTop />

      {(ongoingCourses || []).map((item) => {
        return (
          <FlexRow
            key={item?._id}
            onClick={() => {
              dispatch(getCurriculum(item));

              history.push('/learn/curriculum');
              localStorage.setItem('courseId', item?._id);
              localStorage.setItem('organizationId', item?.organizationId);
            }}>
            <Image
              width={90}
              height={90}
              preview={false}
              src={item?.preview?.ref}
            />

            <FlexSpaceBetween>
              <div>
                <TitleStyled> {item?.title} </TitleStyled>
                <br />
                <IconImage source={UserImage} height={13} width={10} />
                <SubtitleStyled>
                  {item?.instructor?.title + ' ' + item?.instructor?.name}
                </SubtitleStyled>
              </div>
            </FlexSpaceBetween>

            <ProgressContainer>
              <CircularProgress
                status={item?.progress?.status}
                percent={item?.progress?.percent}
              />
            </ProgressContainer>
          </FlexRow>
        );
      })}
    </CardStyled>
  );
};

export default LearnCurriculum;