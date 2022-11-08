import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import CardRow from './CardRow';
import * as colors from '../../styles/colors';

const CardWrapper = styled.div`
background-color: ${colors.purple};
color: ${colors.white};
border-radius: 5px;
padding: 20px;

.label {
  font-weight: bold;
}
`;

const ImageWrapper = styled.div`
text-align: center;
padding-bottom: 10px;
`;

function Card(props) {
  function onSave() {}

  const rows = [
    { label: 'First', value: props.userInfo.name.first },
    { label: 'Last', value: props.userInfo.name.last },
    { label: 'Phone', value: props.userInfo.phone },
    { label: 'Email', value: props.userInfo.email },
  ];

  return (
    <CardWrapper index={props.index}>
      <ImageWrapper className="row">
        <img src={props.userInfo.picture.large} />
      </ImageWrapper>
      {rows.map((row, key) => (
        <CardRow
          onSave={(value, index) => props.onSave(value, index)}
          index={props.index}
          key={key}
          row={row}
        />
      ))}
    </CardWrapper>
  );
}
export default Card;

Card.defaultProps = {
  userInfo: {},
};

Card.propTypes = {
  userInfo: PropTypes.object.isRequired,
};
