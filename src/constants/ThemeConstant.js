export const ROW_GUTTER = 16;
export const SIDE_NAV_WIDTH = 250;
export const SIDE_NAV_COLLAPSED_WIDTH = 80;
export const HEADER_HEIGHT = 70;
export const FOOTER_HEIGHT = 60;
export const TOP_NAV_HEIGHT = 55;
export const SIDE_NAV_LIGHT = 'SIDE_NAV_LIGHT';
export const SIDE_NAV_DARK = 'SIDE_NAV_DARK';
export const NAV_TYPE_SIDE = 'SIDE';
export const NAV_TYPE_TOP = 'TOP';
export const DIR_LTR = 'ltr';
export const DIR_RTL = 'rtl';
export const CONTENT_MAX_WIDTH = 1400;
export const CONTENT_HEIGHT_OFFSET = HEADER_HEIGHT + FOOTER_HEIGHT;
export const HEADER_BG_DEFAULT_COLOR_LIGHT = '#ffffff';
export const HEADER_BG_DEFAULT_COLOR_DARK = '#283142';
export const LAYOUT_CONTENT_GUTTER = 25;
export const LAYOUT_CONTENT_GUTTER_SM = 15;
export const SIDE_NAV_DARK_BG_COLOR = '#001529'

export const BLUE_BASE= '#3e79f7';
export const PURPLE_BASE= '#a461d8';
export const CYAN_BASE= '#04d182';
export const GREEN_BASE= '#21B573';
export const MAGENTA_BASE= '#eb2f96';
export const PINK_BASE= '#eb2f96';
export const RED_BASE= '#de4436';
export const ORANGE_BASE= '#fa8c16';
export const YELLOW_BASE= '#fadb14';
export const VOLCANO_BASE= '#ff6b72';
export const GEEK_BLUE_BASE= '#17bcff';
export const LIME_BASE= '#a0d911';
export const GOLD_BASE= '#ffc542';

export const WHITE = '#ffffff';
export const DARK = '#000000';
export const GRAY_DARK = '#1a3353';
export const GRAY = '#455560';
export const GRAY_LIGHT = '#72849a';
export const GRAY_LIGHTER = '#ededed';
export const GRAY_LIGHTEST = '#f7f7f8';

export const BODY_BACKGROUND = '#fafafb';

export const FONT_SIZE_BASE = 14;

export const TEMPLATE = {
    HEADER_HEIGHT,
    FOOTER_HEIGHT,
    TOP_NAV_HEIGHT,
    CONTENT_HEIGHT_OFFSET,
    SIDE_NAV_WIDTH,
    SIDE_NAV_COLLAPSED_WIDTH,
    SIDE_NAV_DARK_BG_COLOR,
    CONTENT_MAX_WIDTH,
    HEADER_BG_DEFAULT_COLOR_LIGHT,
    HEADER_BG_DEFAULT_COLOR_DARK,
    LAYOUT_CONTENT_GUTTER,
    LAYOUT_CONTENT_GUTTER_SM,
    NAV_TYPE_SIDE,
    NAV_TYPE_TOP,
    SIDE_NAV_LIGHT,
    SIDE_NAV_DARK,
    DIR_LTR,
    DIR_RTL
}

export const THEME_COLOR = {
    BLUE: BLUE_BASE,
    PURPLE: PURPLE_BASE,
    CYAN: CYAN_BASE,
    GREEN: GREEN_BASE,
    MAGENTA: MAGENTA_BASE,
    PINK: PINK_BASE,
    RED: RED_BASE,
    ORANGE: ORANGE_BASE,
    YELLOW: YELLOW_BASE,
    VOLCANO: VOLCANO_BASE,
    GEEK_BLUE: GEEK_BLUE_BASE,
    LIME: LIME_BASE,
    GOLD: GOLD_BASE,
}

export const FONT_WEIGHT = {
    LIGHTER: 'lighter',
    LIGHT: 300,
    NORMAL: 400,
    SEMIBOLD: 500,
    BOLD: 'bold',
    BASE: 400,
    BOLDER: 'bolder'
}

export const FONT_SIZES = {
    BASE: FONT_SIZE_BASE,
    LG: FONT_SIZE_BASE + 2,
    SM: 12
}

export const SPACER = {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '1rem',
    4: '1.5rem',
    5: '3rem',
}

const BREAKPOINT = {
    xs: '480px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1400px',
    xxl: '1600px'
}

export const MEDIA_QUERIES = {
    DESKTOP: `(min-width: ${BREAKPOINT.xl})`,
    LAPTOP: `(max-width: ${BREAKPOINT.xxl})`,
    LAPTOP_ABOVE: `(min-width: ${BREAKPOINT.xxl})`,
    TABLET: `(max-width: ${BREAKPOINT.lg})`,
    MOBILE: `(max-width: ${BREAKPOINT.md})`,
}

export const BORDER = {
    BASE_COLOR: '#e6ebf1'
}

export const GRAY_SCALE = {
    DARK,
    WHITE,
    GRAY_DARK,
    GRAY,
    GRAY_LIGHT,
    GRAY_LIGHTER,
    GRAY_LIGHTEST
}

export const DARK_MODE =  {
    TEXT_COLOR: '#b4bed2',
    HEADING_COLOR: '#d6d7dc',
    BG_COLOR: '#283142',
    BORDER_BASE_COLOR: '#4d5b75',
    HOVER_BG_COLOR: '#364663',
    ACTIVE_BG_COLOR: '#293956',
    DROP_DOWN_SHADOW: '0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 58%), 0 9px 28px 8px rgb(0 0 0 / 15%)'
}
