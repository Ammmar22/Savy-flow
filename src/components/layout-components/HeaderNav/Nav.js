import styled from '@emotion/styled';

const Nav = styled.div(({navWidth}) => ({
	display: 'flex',
	justifyContent: 'space-between',
	position: 'relative',
	transition: 'all .2s ease',
	width: `calc(100% - ${navWidth})`
}))

export default Nav