import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { BsFillPencilFill } from 'react-icons/bs';
import styled from 'styled-components';
import * as colors from '../../styles/colors';
import SaveButton from '../Buttons/SaveButton';

const Icon = styled.span`
padding-top: 4px;
cursor: pointer;
font-size: 12px;
margin-right: 5px;

&:hover {
  color: ${colors.black};
}

.label {
  padding-left: 5px;
}

.edit-input {
  height: 20px;
}
`;

const RowWrapper = styled.div`
display: grid;
grid-template-columns: 10px 50px 150px 100px;
grid-gap: 5px;
height: 25px;
`;

const RowValue = styled.div`
white-space: nowrap;
overflow: hidden;
text-overflow: ellipsis;
width: 250px;
`;

function CardRow(props) {
  const [editMode, setEditMode] = useState(false);
  const [input, setInput] = useState('');

  function onEdit() {
    setEditMode(!editMode);
  }

  function onSave() {
    const newLabel = props.row.label.toLowerCase();
    const value = { [newLabel]: input };
    setEditMode(false);
    props.onSave(value, props.index);
  }

  function onInputChange(e) {
    const value = e.target.value;
    setInput(e.target.value);
  }

  return (
    <RowWrapper>
      <Icon onBlur={onEdit} onClick={onEdit}>
        <BsFillPencilFill />
      </Icon>
      <span className="label">{props.row.label}: </span>
      {editMode ? (
        <span style={{ display: 'inline-flex' }}>
          <input
            type="text"
            className="edit-input"
            placeholder={props.row.label}
            onChange={onInputChange}
          />
          {editMode && <SaveButton onSave={onSave} />}
        </span>
      ) : (
        <RowValue title={props.row.value}>{props.row.value}</RowValue>
      )}
    </RowWrapper>
  );
}
export default CardRow;

CardRow.defaultProps = {
  row: {},
  onSave: () => {},
};

CardRow.propTypes = {
  row: PropTypes.object.isRequired,
  onSave: PropTypes.func,
};
