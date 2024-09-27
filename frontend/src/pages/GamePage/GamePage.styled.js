import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 50vh;
`;

export const SmallContainer = styled.div`
  width: 100%;
  /* height: 100%; */
  height: calc(52vh - 5.2rem);
  overflow-y: auto;
  /* border: 1px solid red; */
`;
