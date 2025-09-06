import styled from '@emotion/styled';

const HeaderWrapper = styled.div(({isNavTop}) => ({
	width: '100%',
	display: 'flex',
	...isNavTop ? {maxWidth: isNavTop, margin: 'auto'} : {}
}))


export default HeaderWrapper