import { createSlice } from '@reduxjs/toolkit'
import { THEME_CONFIG } from 'configs/AppConfig'

export const initialState = THEME_CONFIG

export const themeSlice = createSlice({
	name: 'theme',
	initialState,
	reducers: {
        toggleCollapsedNav: (state, action) => {
			state.navCollapsed = action.payload
		},
        onNavStyleChange: (state, action) => {
			state.sideNavTheme = action.payload
		},
        onLocaleChange: (state, action) => {
			state.locale = action.payload
		},
        onNavTypeChange: (state, action) => {
			state.navType = action.payload
		},
        onTopNavColorChange: (state, action) => {
			state.topNavColor = action.payload
		},
        onHeaderNavColorChange: (state, action) => {
			state.headerNavColor = action.payload
		},
        onMobileNavToggle: (state, action) => {
			state.mobileNav = action.payload
		},
        onSwitchTheme: (state, action) => {
			state.currentTheme = action.payload
		},
        onDirectionChange: (state, action) => {
			state.direction = action.payload
		},
		onBlankLayout: (state, action) => {
			state.blankLayout = action.payload
		},
	},
})

export const { 
    toggleCollapsedNav,
    onNavStyleChange,
    onLocaleChange,
    onNavTypeChange,
    onTopNavColorChange,
    onHeaderNavColorChange,
    onMobileNavToggle,
    onSwitchTheme,
    onDirectionChange,
	onBlankLayout
} = themeSlice.actions

export default themeSlice.reducer