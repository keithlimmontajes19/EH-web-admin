import React, { Fragment, useEffect } from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

import {
  FlexRow,
  Container,
  RatingText,
  UserStyles,
  StyledName,
  StyledTitle,
  TitleCourse,
  SubtitleText,
  FlexContainer,
  ImageContainer,
  RatingContainer,
  AvatarContainer,
} from './styled';
import { Image } from 'antd';
import { NO_IMAGE } from 'utils/constants';
import { useHistory } from 'react-router-dom';
import { getCurriculum } from 'ducks/lms/actionCreator';

/* components */
import IconImage from 'components/IconImage';
import RatingStar from 'components/RatingStar';
import USER_LOGO from 'assets/images/user-icon.png';
import LEFT_ARROW from 'assets/icons/left-icon.png';
import RIGHT_ARROW from 'assets/icons/right-icon.png';
import ORGANIZATION from 'assets/icons/organization.png';

/* recuer action */
import { RootState } from 'ducks/store';
import { useSelector, useDispatch } from 'react-redux';
import { getListOrganization } from 'ducks/organization/actionCreator';

const LeftArrow = () => {
  const { scrollPrev } = React.useContext(VisibilityContext);
  return (
    <div
      onClick={() => scrollPrev()}
      style={{
        flex: 1,
        zIndex: 2,
        display: 'flex',
        marginRight: 10,
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 5,
      }}
    >
      <IconImage source={RIGHT_ARROW} width={23} height={104} />
    </div>
  );
};

const RightArrow = () => {
  const { scrollNext } = React.useContext(VisibilityContext);
  return (
    <div
      onClick={() => scrollNext()}
      style={{
        flex: 1,
        zIndex: 2,
        display: 'flex',
        marginLeft: 10,
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 5,
      }}
    >
      <IconImage source={LEFT_ARROW} width={23} height={104} />
    </div>
  );
};

const Card = ({ item, itemId, onClick }) => {
  const visibility = React.useContext(VisibilityContext);
  visibility.isItemVisible(itemId);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        marginRight: 122,
      }}
    >
      <AvatarContainer>
        <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
          <IconImage source={ORGANIZATION} width={40} height={53} />
        </div>
      </AvatarContainer>

      <StyledName>{item?.name || ''}</StyledName>
    </div>
  );
};

const OrganizationList = () => {
  const dispatch = useDispatch();

  const { organizations }: any = useSelector<RootState>(
    (state) => state.organization
  );

  const { data, loading } = organizations;
  const [selected, setSelected] = React.useState([]);

  useEffect(() => {
    dispatch(getListOrganization());
  }, []);

  const isItemSelected = (id) => !!selected.find((el) => el === id);
  const handleClick = (id) => () => {
    const itemSelected = isItemSelected(id);

    setSelected((currentSelected) =>
      itemSelected
        ? currentSelected.filter((el) => el !== id)
        : currentSelected.concat(id)
    );
  };

  return (
    <div style={{ marginTop: 30 }}>
      {data?.length && <StyledTitle>Groups</StyledTitle>}
      <ScrollMenu
        LeftArrow={() => (data?.length ? LeftArrow() : <></>)}
        RightArrow={() => (data?.length ? RightArrow() : <></>)}
        options={{
          ratio: 0.9,
          rootMargin: '5px',
          threshold: [0.01, 0.05, 0.5, 0.75, 0.95, 1],
        }}
      >
        {(data || []).map((item) => (
          <Card
            item={item}
            key={item?._id}
            itemId={item?._id}
            onClick={handleClick(item?._id)}
          />
        ))}
      </ScrollMenu>
    </div>
  );
};

export default OrganizationList;
