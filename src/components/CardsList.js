import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Card from '../components/Card';

const grid = 8;
const listStyling = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 500,
});
const cardStyling = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? 'lightgreen' : '#FFFFFF',
  ...draggableStyle,
});

class CardsList extends Component {
  state ={
    projects: []
  }
  componentDidMount(){

  }
  
  render(){
    return(
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="projects">
          {(provided, snapshot) => (
            <div ref={provided.innerRef} style={listStyling(snapshot.isDraggingOver)}>
              {this.state.projects.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={cardStyling(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <Card project={item} services={this.props.services}/>
                    </div>
                  )}  
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

CardsList.propTypes = {
  projects: PropTypes.array,
  services: PropTypes.object.isRequired,
};