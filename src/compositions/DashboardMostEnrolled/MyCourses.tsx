import React from 'react';
import noImage from 'assets/images/no-image.png';
import userIcon from 'assets/images/user-icon.png';
import styles from './MyCourses.module.css';

const MyCourses = (props: any) => {
  const course = props?.data;

  return (
    <div key={course._id} className={`${styles.container}`}>
      <img className={`${styles.preview}`} src={course.preview || noImage} />
      <div className={`${styles.courseInfo}`}>
        <h3 className={`${styles.courseTitle}`}>{course.title}</h3>
        <div className={`${styles.instructor}`}>
          <img className={`${styles.instructorIcon}`} src={userIcon} />
          <span className={`${styles.instructorName}`}>
            {course.instructor.title} {course.instructor.name}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MyCourses;
