import styled from 'styled-components';

export const GridList = styled.ul`
	display: grid;
	grid-template-columns: repeat(3, 256px);
	gap: 20px;
	list-style-type: none;
	padding: 0;
	margin: 0;
	justify-content: center;
`;

export const Main = styled.main`
margin: 0 auto;
max-width: 1024px;
`
export const Center = styled.div`
display: flex; 
justify-content: center;
`