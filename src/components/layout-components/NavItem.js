import styled from '@emotion/styled';
import { 
    GRAY_SCALE,
} from 'constants/ThemeConstant'
import { baseTheme, rgba } from 'configs/ThemeConfig'
import { MEDIA_QUERIES } from 'constants/ThemeConstant'

const isDark = (mode) => {
    return mode === 'dark'
}

const NavItem = styled('div')`
    display: flex;
    align-items: center;
    line-height: 1.5;
    cursor: pointer;
    padding: 0 1rem;
    color: ${props => isDark(props.mode) ?  GRAY_SCALE.GRAY : rgba(GRAY_SCALE.WHITE, 0.85) };

    @media ${MEDIA_QUERIES.MOBILE} {
		padding: 0 0.75rem;
	}

    .ant-badge {
        color: ${props => isDark(props.mode) ?  GRAY_SCALE.GRAY : rgba(GRAY_SCALE.WHITE, 0.85) };
    }

    .nav-icon {
        font-size: 1.25rem;
    }

    &:hover,
    &.ant-dropdown-open,
    &.ant-popover-open {
        > * {
            color: ${props => isDark(props.mode) ? baseTheme.colorPrimary : GRAY_SCALE.WHITE};
        }

        .profile-text {
            color: ${props => isDark(props.mode) ? GRAY_SCALE.GRAY : GRAY_SCALE.WHITE};
        }
    }
`

export default NavItem