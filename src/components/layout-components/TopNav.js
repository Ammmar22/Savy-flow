import React from 'react'
import { connect } from 'react-redux';
import { NAV_TYPE_TOP } from 'constants/ThemeConstant';
import utils from 'utils'
import MenuContent from './MenuContent'
import styled from '@emotion/styled';
import { TEMPLATE, WHITE, GRAY } from 'constants/ThemeConstant';

const TopNvContent = styled('div')`
	height: ${TEMPLATE.HEADER_HEIGHT}px;
	background-color: ${props => props.backgroundColor ? props.backgroundColor : '#001529'};
	position: fixed;
	top: ${TEMPLATE.HEADER_HEIGHT}px;
	width: 100%;
	z-index: @zindex-modal;
	box-shadow: 0 0.75rem 1.5rem rgba(18,38,63,.03);

	.top-nav-wrapper {
		max-width: ${TEMPLATE.CONTENT_MAX_WIDTH}px;
		margin-left: auto;
		margin-right: auto;

		.ant-menu-horizontal {
			line-height: ${TEMPLATE.HEADER_HEIGHT}px;
			border-bottom: 0;
		}
	}

	${props => props.mode === 'light' ? `
		.ant-menu {
			color: ${WHITE};

			.ant-menu-item:hover:not(.ant-menu-item-selected):not(.ant-menu-submenu-selected), 
			.ant-menu-submenu-title:hover:not(.ant-menu-item-selected):not(.ant-menu-submenu-selected),
			.ant-menu-submenu-selected >.ant-menu-submenu-title {
				color: rgba(255, 255, 255, 0.75)
			}
		}
    ` : '' }

	${props => props.mode === 'dark' ? `
		.ant-menu {
			color: ${GRAY};

			.ant-menu-item:hover:not(.ant-menu-item-selected):not(.ant-menu-submenu-selected), 
			.ant-menu-submenu-title:hover:not(.ant-menu-item-selected):not(.ant-menu-submenu-selected),
			.ant-menu-submenu-selected >.ant-menu-submenu-title {
				color: rgba(0, 0, 0, 0.75)
			}
		}
    ` : '' }
`

export const TopNav = ({topNavColor }) => {
	const props = { topNavColor }
	return (
		<TopNvContent mode={utils.getColorContrast(topNavColor)} backgroundColor={topNavColor}>
			<div className="top-nav-wrapper">
				<MenuContent
					type={NAV_TYPE_TOP} 
					{...props}
				/>
			</div>
		</TopNvContent>
	)
}

const mapStateToProps = ({ theme }) => {
  const { topNavColor } =  theme;
  return { topNavColor }
};

export default connect(mapStateToProps)(TopNav);
