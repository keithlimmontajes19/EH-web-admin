import { ReactElement, useEffect } from "react";

import {
  StyledHeader,
  CarouselContainer,
  NoAnnouncementContainer,
} from "./styled";

import { Image } from "antd";
import { Carousel } from "react-responsive-carousel";

/* reducer action */
import { RootState } from "ducks/store";
import { useDispatch, useSelector } from "react-redux";
import { getAnnouncements } from "ducks/announcement/actionCreator";

import ReactPlayer from "react-player";
import NO_ANNOUNCEMENT from "assets/images/noannouncement.png";

const CarouselAnnouncement = (): ReactElement => {
  const dispatch = useDispatch();

  const { data, loading }: any = useSelector<RootState>(
    (state) => state.announcement
  );

  useEffect(() => {
    dispatch(getAnnouncements());
  }, []);

  const carouseContent = (item: any) => {
    if (item?.imageId) {
      return (
        <Image
          width="100%"
          height={452}
          src={item?.imageURL}
          style={{ borderRadius: 15 }}
        />
      );
    } else if (item?.videoId) {
      return (
        <div className="video-wrapper">
          <ReactPlayer
            controls={true}
            width="100%"
            height="100%"
            url={[
              {
                src: item?.videoURL,
                type: "video/mp4",
              },
            ]}
          />
        </div>
      );
    } else {
      return (
        <>
          <p>{item?.title}</p>
          <p>{item?.description}</p>
        </>
      );
    }
  };

  const carouselAnnouncement = () => {
    return (
      <CarouselContainer>
        <Carousel
          width="100%"
          showThumbs={false}
          showStatus={false}
          dynamicHeight={false}
        >
          {(data || []).map((item) => (
            <div key={item?._id} style={{ borderRadius: 15 }}>
              {carouseContent(item)}
            </div>
          ))}
        </Carousel>
      </CarouselContainer>
    );
  };

  const noAnnouncement = () => {
    return (
      <NoAnnouncementContainer>
        <img src={NO_ANNOUNCEMENT} alt="image" />
        <StyledHeader>No Announcement</StyledHeader>
      </NoAnnouncementContainer>
    );
  };

  return data?.length ? carouselAnnouncement() : noAnnouncement();
};

export default CarouselAnnouncement;
