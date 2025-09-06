import styled from '@emotion/styled';
import { TEMPLATE } from 'constants/ThemeConstant';

const Header = styled.div(({headerNavColor, isDarkTheme}) => ({
	position: 'fixed',
	width: '100%',
	left: 0,
	zIndex: 1000,
	display: 'flex',
	flex: '0 0 auto',
	height: TEMPLATE.HEADER_HEIGHT,
	lineHeight: `${TEMPLATE.HEADER_HEIGHT}px`,
	backgroundColor: headerNavColor,
	boxShadow: isDarkTheme ? '0 1px 8px -1px rgb(0 0 0 / 75%)' : '0 1px 4px -1px rgb(0 0 0 / 15%)'
}))


export default Header