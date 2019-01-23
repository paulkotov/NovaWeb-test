import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import Card from '../components/Card';
import * as projectActions from '../redux/actions';
import { reorder } from '../lib/functions';

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

class App extends React.PureComponent {
  state = {
    error: null,
    info: null,
    projects: this.props.projects
  };

  componentDidUpdate(prevProps, prevState){
    const { updateStore } = this.props.services;

    if(prevProps.projects !== this.props.projects) {
      this.setState({
        projects: this.props.projects
      });
    }
    if(prevState.projects.length !== 0 && prevState.projects !== this.state.projects) {
      updateStore(this.state.projects);
    }
  }

  componentDidCatch(error, info){
    this.setState({
      error: error,
      info: info,
    });
  }

  onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const projects = reorder(
      this.state.projects,
      result.source.index,
      result.destination.index
    );

    this.setState({
      ...this.state,
      projects,
    });
  }

  renderApp = () => (
    <div>
      { this.props.projects.length === 0 ? <div>Loading... Please wait!</div> :
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
      }
    </div>
  );

  render(){
    if(this.state.error) {
      return (
        <div>
          <h3>Произошла ошибка!</h3>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.info.componentStack}
          </details>
        </div>
      );
    }
    return (
      <div>
        {this.renderApp()}
      </div>
    );
  }
}

App.propTypes = {
  projects: PropTypes.array,
  services: PropTypes.object.isRequired,
};

export default connect(
  state => ({ projects: state.projects.projects }),
  dispatch => ({
    services: {
      fetchData : () => dispatch(projectActions.fetchData()),
      updateComment: (id, comment) => dispatch(projectActions.updateComment({ id, comment })),
      updateStore: (data) => dispatch(projectActions.updateStore(data))
    }
  })
)(App);