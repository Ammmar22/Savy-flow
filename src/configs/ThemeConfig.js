import { 
    THEME_COLOR, 
    DARK_MODE,
    GRAY_SCALE,
    BORDER,
    BODY_BACKGROUND
} from 'constants/ThemeConstant'

export function rgba(hex, opacity = 1) {
    if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      throw new Error('Invalid Hex');
    }
  
    const decimal = parseInt(hex.substring(1), 16);
  
    const r = (decimal >> 16) & 255;
    const g = (decimal >> 8) & 255;
    const b = decimal & 255;
  
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export const baseTheme = {
    borderRadius: 10,
    colorPrimary: THEME_COLOR.BLUE,
    colorSuccess: THEME_COLOR.CYAN,
    colorWarning: THEME_COLOR.GOLD,
    colorError: THEME_COLOR.VOLCANO,
    colorInfo: THEME_COLOR.BLUE,
    colorText: GRAY_SCALE.GRAY,
    colorBorder: BORDER.BASE_COLOR,
    colorBgBody: BODY_BACKGROUND,
    controlHeight: 40,
    controlHeightLG: 48,
    controlHeightSM: 36,
    fontFamily: `'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji'`,
    fontSizeHeading2: 22,
    fontSizeHeading4: 17
}

const getBaseComponentThemeConfig = (
    {
        Button = {},
        Menu = {}, 
        Card = {},
        Table = {},
        Select = {},
        DatePicker = {},
        Layout = {},
        Input = {},
        Dropdown = {},
        Calendar = {}
    } = {}
) => {
    return {
        Button: {
            ...Button
        },
        Dropdown: {
            controlPaddingHorizontal: 20,
            controlHeight: 37,
            borderRadiusLG: 10,
            paddingXXS: '4px 0px',
            ...Dropdown
        },
        Calendar: {
            ...Calendar
        },
        Checkbox: {
            lineWidth: 2,
            borderRadiusSM: 4
        },
        Card: {
            colorTextHeading: GRAY_SCALE.GRAY_DARK,
            paddingLG: 20,
            ...Card
        },
        Layout: {
            colorBgBody: BODY_BACKGROUND,
            colorBgHeader: GRAY_SCALE.WHITE,
            ...Layout
        },
        Breadcrumb: {
            colorTextDescription: GRAY_SCALE.GRAY_LIGHT,
            colorText: baseTheme.colorPrimary,
            colorBgTextHover: 'transparent'
        },
        Menu: {
            colorItemBg: 'transparent',
            colorActiveBarHeight: 0,
            colorActiveBarWidth: 3,
            colorItemTextSelectedHorizontal: baseTheme.colorPrimary,
            colorItemTextHover: baseTheme.colorPrimary,
            colorItemTextSelected: baseTheme.colorPrimary,
            colorItemBgSelected: rgba(baseTheme.colorPrimary, 0.1),
            colorItemBgHover: 'transparent',
            radiusItem: 0,
            colorSubItemBg: 'transparent',
            itemMarginInline: 0,
            controlHeightLG: 40,
            controlHeightSM: 22,
            ...Menu
        },
        Input: {
            ...Input
        },
        Pagination: {
            paginationItemSize: 30,
            borderRadius: '50%',
            colorBgContainer: baseTheme.colorPrimary,
            colorPrimary:  GRAY_SCALE.WHITE,
            colorPrimaryHover: GRAY_SCALE.WHITE,
        },
        Steps: {
            wireframe: true,
            controlHeight: 32,
            waitIconColor: GRAY_SCALE.GRAY_LIGHT
        },
        DatePicker: {
            controlHeight: 40,
            controlHeightSM: 26,
            borderRadiusSM: 6,
            lineWidthBold: 0,
            ...DatePicker
        },
        Radio: {
            fontSizeLG: 18
        },
        Slider: {
            colorPrimaryBorder: rgba(baseTheme.colorPrimary, 0.8),
            colorPrimaryBorderHover: baseTheme.colorPrimary
        },
        Select: {
            paddingXXS: '4px 0px',
            controlHeight: 40,
            controlHeightSM: 30,
            controlItemBgActive: rgba(baseTheme.colorPrimary, 0.1),
            ...Select
        },
        TreeSelect: {
            controlHeightSM: 24
        },
        Tooltip: {
            colorBgDefault: rgba(GRAY_SCALE.DARK, 0.75),
            controlHeight: 32
        },
        Timeline: {
            lineType: 'dashed'
        },
        Tag: {
            lineHeight: 2.1
        },
        Table: {
            colorText: GRAY_SCALE.GRAY,
            tableHeaderBg: 'transparent',
            ...Table
        }
    }
}

export const lightTheme = {
    token: {
        ...baseTheme,
        colorTextBase: GRAY_SCALE.GRAY,
    },
    components: getBaseComponentThemeConfig()
}



export const darkTheme = {
    token: {
        ...baseTheme,
        colorTextBase: DARK_MODE.TEXT_COLOR,
        colorBgBase: DARK_MODE.BG_COLOR,
        colorBorder: DARK_MODE.BORDER_BASE_COLOR,
        colorText: DARK_MODE.TEXT_COLOR,
    },
    components: getBaseComponentThemeConfig({
        Button: {
            controlOutline: 'transparent',
            colorBorder: DARK_MODE.BORDER_BASE_COLOR,
            colorText: DARK_MODE.TEXT_COLOR,
        },
        Card: {
            colorTextHeading: DARK_MODE.HEADING_COLOR,
        },
        Layout: {
            colorBgBody: '#1b2531',
            colorBgHeader: DARK_MODE.BG_COLOR
        },
        Menu: {
            colorItemBgSelected: 'transparent',
            colorItemTextSelectedHorizontal: GRAY_SCALE.WHITE,
            colorItemTextHover: GRAY_SCALE.WHITE,
            colorItemTextSelected: GRAY_SCALE.WHITE,
            colorItemText: DARK_MODE.TEXT_COLOR,
            colorActiveBarWidth: 0,
            boxShadowSecondary: DARK_MODE.DROP_DOWN_SHADOW
        },
        Dropdown: {
            boxShadowSecondary: DARK_MODE.DROP_DOWN_SHADOW
        },
        Calendar: {
            controlItemBgActive: '#303a4e'
        },
        Select: {
            controlOutline: 'transparent',
            controlItemBgActive: DARK_MODE.ACTIVE_BG_COLOR,
            controlItemBgHover: DARK_MODE.HOVER_BG_COLOR,
            boxShadowSecondary: DARK_MODE.DROP_DOWN_SHADOW
        },
        Input: {
            controlOutline: 'transparent',
        },
        DatePicker: {
            controlOutline: 'transparent',
            boxShadowSecondary: DARK_MODE.DROP_DOWN_SHADOW,
            controlItemBgActive: DARK_MODE.ACTIVE_BG_COLOR,
            controlItemBgHover: DARK_MODE.HOVER_BG_COLOR,
        },
        Table: {
            colorText: DARK_MODE.TEXT_COLOR,
            colorTextHeading: DARK_MODE.HEADING_COLOR
        },
    })
}