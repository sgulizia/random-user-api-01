import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as colors from '../../styles/colors';

const SaveButtonWrapper = styled.button`
width: 100px;
justify-content: center;
background-color: ${colors.white};
color: ${colors.purple};
cursor: pointer;
height: 25px;
`;

const ButtonWrapper = styled.div`
margin-left: 15px;
`;

function SaveButton(props) {
  return (
    <ButtonWrapper>
      <SaveButtonWrapper onClick={() => props.onSave()} type="button">
        Save
      </SaveButtonWrapper>
    </ButtonWrapper>
  );
}

export default SaveButton;

SaveButton.defaultProps = {
  row: {},
  onSave: () => {},
};

SaveButton.propTypes = {
  row: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
};
