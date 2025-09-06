import styled from '@emotion/styled';

const Flex = styled.div(({justifyContent, alignItems, flexDirection, gap, padding, margin}) => {

	const baseStyle = {
		display: 'flex',
		justifyContent: justifyContent,
		alignItems: alignItems,
		gap: typeof gap === 'number' ? `${gap}px` : gap,
	}

	if (flexDirection) {
		baseStyle.flexDirection = flexDirection
	}

	if (padding) {
		baseStyle.padding = padding
	}

	if (margin) {
		baseStyle.margin = margin
	}

	return {...baseStyle}
})

export default Flex
