/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import PropTypes from "prop-types";
import { Grid, Drawer, Card } from "antd";
import utils from 'utils'
import { MenuOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { TEMPLATE, DARK_MODE, BORDER } from 'constants/ThemeConstant';
import { useSelector } from 'react-redux';

const { useBreakpoint } = Grid;

const MainContent = styled.div(({hasPageHeader, gutter}) => {

	const baseStyle = {
		minHeight: `calc(100vh - ${TEMPLATE.CONTENT_HEIGHT_OFFSET}px - ${TEMPLATE.LAYOUT_CONTENT_GUTTER}px * 2  - 2px);`,
		width: '100%',
		padding: gutter ? 24: 0
	}

	if (hasPageHeader) {
		baseStyle.minHeight = '75vh'
	}

	return baseStyle
})


const SideContent = props => {
	const { sideContent, sideContentWidth = 250, border } = props

	const currentTheme = useSelector(state => state.theme.currentTheme)

	return (
		<div style={{width: `${sideContentWidth}px`, borderInlineEnd: `1px solid ${currentTheme === 'dark' ? DARK_MODE.BORDER_BASE_COLOR : BORDER.BASE_COLOR }`}}>
			{sideContent}
		</div>
	)
}

const SideContentMobile = props => {
	const { sideContent, visible, onSideContentClose } = props
	return (
		<Drawer
			width={320}
			placement="left"
			closable={false}
			onClose={onSideContentClose}
			open={visible}
			bodyStyle={{paddingLeft: 0, paddingRight: 0}}
		>
			<div className="h-100">
				{sideContent}
			</div>
		</Drawer>
	)
}

export const InnerAppLayout = props => {
	const { mainContent, pageHeader, sideContentGutter = true } = props
	const isMobile = !utils.getBreakPoint(useBreakpoint()).includes('lg')
	const [visible, setVisible] = useState(false);

	const close = (e) => {
		setVisible(false)
	} 

	const openSideContentMobile = () => {
		setVisible(true)
	}

	return (
		<Card className="mb-0" css={css`
			>.ant-card-body {
				display: flex;
				padding: 0px;
			}
		`}>
			{isMobile ? 
				<SideContentMobile 
					visible={visible} 
					onSideContentClose={close}
					{...props}
				/> 
				: 
				<SideContent {...props} />
			}
			<MainContent hasPageHeader={pageHeader} gutter={sideContentGutter}>
				{isMobile ? 
					<div className={`font-size-lg mb-3 ${!sideContentGutter ? 'pt-3 px-3' : ''}`}>
						<MenuOutlined onClick={() => openSideContentMobile()}/>
					</div>
					:
					null
				}
				{mainContent}
			</MainContent>
		</Card>
	)
}

InnerAppLayout.propTypes = {
	sideContent: PropTypes.node,
	mainContent: PropTypes.node,
	pageHeader: PropTypes.bool,
	sideContentWidth: PropTypes.number,
	border: PropTypes.bool,
	sideContentGutter: PropTypes.bool
};

export default InnerAppLayout
