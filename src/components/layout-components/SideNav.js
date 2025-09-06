/** @jsxImportSource @emotion/react */
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { SIDE_NAV_WIDTH, SIDE_NAV_DARK, NAV_TYPE_SIDE } from 'constants/ThemeConstant';
import { Scrollbars } from 'react-custom-scrollbars-2';
import MenuContent from './MenuContent';
import { css } from '@emotion/react';
import { TEMPLATE, GRAY_SCALE, DARK_MODE } from "constants/ThemeConstant";
import { useSelector } from 'react-redux';

const { Sider } = Layout;

export const SideNav = ({navCollapsed, routeInfo, hideGroupTitle, currentTheme }) => {
  const sideNavTheme = useSelector(state => state.theme.sideNavTheme);
  const props = { sideNavTheme, routeInfo , hideGroupTitle }
  return (
    <Sider 
      css={css`
        height: calc(100vh - ${TEMPLATE.HEADER_HEIGHT}px); 
        position: fixed !important;
        top: ${TEMPLATE.HEADER_HEIGHT}px;
        box-shadow: 0 1px 4px -1px rgba(0,0,0,.15);
        z-index: 999;
        direction: ltr;
        ${currentTheme === 'light' && sideNavTheme !== SIDE_NAV_DARK ? `background-color: ${GRAY_SCALE.WHITE} !important;`  : `background-color: ${TEMPLATE.SIDE_NAV_DARK_BG_COLOR} !important;`}
        ${currentTheme === 'dark' && sideNavTheme !== SIDE_NAV_DARK ? `background-color: ${DARK_MODE.BG_COLOR} !important`  : ``}
        ${currentTheme === 'dark' && sideNavTheme === SIDE_NAV_DARK ? `background-color: ${TEMPLATE.SIDE_NAV_DARK_BG_COLOR} !important`  : ``}
      `}
      className={`side-nav ${sideNavTheme === SIDE_NAV_DARK? 'side-nav-dark' : ''}`} 
      width={SIDE_NAV_WIDTH} 
      collapsed={navCollapsed}
    >
      <Scrollbars autoHide>
        <MenuContent 
          type={NAV_TYPE_SIDE}
          {...props}
        />
      </Scrollbars>
    </Sider>
  )
}

const mapStateToProps = ({ theme }) => {
  const { navCollapsed, sideNavTheme, currentTheme } =  theme;
  return { navCollapsed, sideNavTheme, currentTheme }
};

export default connect(mapStateToProps)(SideNav);
