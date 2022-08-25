import { ReactElement, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Params } from './types';

import { Layout, PageHeader } from 'antd';
import { StyledTitle } from 'views/private/Learn/Learn/styled';

import StyledButton from 'components/StyledButton';
import TableCourses from 'compositions/TableCourses';
import BuilderCourse from 'compositions/BuilderCourse';
import CreateCourses from 'compositions/CreateCourses';

const Courses = (): ReactElement => {
  const params: Params = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      {params.page ? (
        <BuilderCourse id={params.subpage} />
      ) : (
        <Layout style={{ paddingRight: 50, background: 'transparent' }}>
          <PageHeader
            ghost={false}
            title={<StyledTitle>Courses</StyledTitle>}
            style={{ background: 'none', paddingTop: 8 }}
            extra={[
              <StyledButton w={130} onClick={() => setIsModalVisible(true)}>
                CREATE
              </StyledButton>,
            ]}
          />
          <TableCourses />
          <CreateCourses
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
          />
        </Layout>
      )}
    </>
  );
};

export default Courses;
