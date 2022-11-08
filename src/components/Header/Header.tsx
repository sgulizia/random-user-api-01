import * as React from 'react';
import * as colors from '../../styles/colors';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
background-color: ${colors.purple};
color: ${colors.white};
font-size: 40px;
text-align: center;
font-weight: bold;
border-radius: 5px;
`;

function Header() {
  return <HeaderWrapper>Users</HeaderWrapper>;
}
export default Header;
