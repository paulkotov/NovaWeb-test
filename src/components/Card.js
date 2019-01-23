import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Cont = styled.div`
  width: 450px;
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 10px;
  margin: 10px
  background-color: #eeeeee;
  font-size: 12;
`;

class Card extends React.Component {
  state = {
    showComment: true,
    comment: null
  }

  editComment = () => {
    this.setState({
      showComment: !this.state.showComment
    });
  }

  handleChange = e => {
    this.setState({
      ...this.state,
      comment: e.target.value
    });
  }

  submit = () => {
    const { updateComment } = this.props.services;
    updateComment(this.props.project.id, this.state.comment);
    this.editComment();
    this.props.services.fetchData();
  }

  render(){
    const { id, title, type, comment } = this.props.project;
    const { showComment } = this.state;
    return (
      <Cont className="card">
        <div>
          ID: <b>{id}</b> 
        </div>
        <div>
          Title: <b>{title}</b> 
        </div>
        <div>
          Type: <b>{type}</b>
        </div>
        <div style={{ cursor: 'pointer' }}>
          <span onClick={this.editComment}>Comment:</span>
          { 
            showComment ?
            <div><b>{comment}</b></div> :
            <div>
              <input defaultValue={comment} type="text" onChange={this.handleChange}/>
              <button onClick={this.submit}>Ok</button>
            </div>
          }
        </div>
      </Cont>
    );
  }   
}

Card.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    type: PropTypes.string,
    comment: PropTypes.string
  }),
  services: PropTypes.object
};

export default Card;