import {ReactElement, useState, useEffect} from 'react';
import type {PropsType} from './types';

import {Container} from './styled';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import {TitleStyled, QuestionStyled} from 'compositions/QuizStepper/styled';

import IconImage from 'components/IconImage';
import SORT_ICON from 'assets/icons/drag-icon.png';

const QuizSort = ({item, submit}: PropsType): ReactElement => {
  const [SORT_LIST, SET_SORT_LIST] = useState(item?.resource?.answer || []);

  const onDragEnd = (result) => {
    const {destination, source, draggableId} = result;
    if (!destination) return;
    if (
      destination.droppableId === source.draggableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newObjects = Array.from(SORT_LIST);

    newObjects.splice(source.index, 1);
    newObjects.splice(destination.index, 0, draggableId);

    SET_SORT_LIST(newObjects);
  };

  useEffect(() => {
    submit(SORT_LIST);
  }, [SORT_LIST]);

  return (
    <>
      <TitleStyled>{item?.title}</TitleStyled>
      <QuestionStyled>{item?.description}</QuestionStyled>

      <DragDropContext onDragEnd={onDragEnd}>
        {(SORT_LIST || []).map((choice, index) => {
          return (
            <Droppable droppableId={index.toString()}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  innerRef={provided.innerRef}
                  {...provided.droppableProps}>
                  <Draggable draggableId={choice.toString()} index={index}>
                    {(provided1) => (
                      <div
                        ref={provided1.innerRef}
                        innerRef={provided1.innerRef}
                        {...provided1.draggableProps}
                        {...provided1.dragHandleProps}>
                        <Container>
                          <IconImage
                            source={SORT_ICON}
                            width={50}
                            height={60}
                          />
                          &nbsp;&nbsp;
                          {choice}
                        </Container>
                      </div>
                    )}
                  </Draggable>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </DragDropContext>
    </>
  );
};

export default QuizSort;
