/** @jsxImportSource @emotion/react */
import React from 'react'
import { APP_NAME } from 'configs/AppConfig';
import { css } from '@emotion/react';
import { TEMPLATE, MEDIA_QUERIES, DARK_MODE, BORDER } from 'constants/ThemeConstant'
import { useSelector } from 'react-redux';

export default function Footer() {

	const currentTheme = useSelector(state => state.theme.currentTheme)

	return (
		<footer css={css`
			height: ${TEMPLATE.FOOTER_HEIGHT}px;
			display: flex;
			margin: 0 ${TEMPLATE.LAYOUT_CONTENT_GUTTER}px;
			align-items: center;
			border-top: 1px solid ${currentTheme === 'dark' ? DARK_MODE.BORDER_BASE_COLOR : BORDER.BASE_COLOR };
			justify-content: space-between;
		
			@media ${MEDIA_QUERIES.MOBILE} {
				justify-content: center;
       			flex-direction: column;
			}
		`}>
			<span>Copyright  &copy;  {`${new Date().getFullYear()}`} <span className="font-weight-semibold">{`${APP_NAME}`}</span> All rights reserved.</span>
			<div>
				<a className="text-gray" href="/#" onClick={e => e.preventDefault()}>Term & Conditions</a>
				<span className="mx-2 text-muted"> | </span>
				<a className="text-gray" href="/#" onClick={e => e.preventDefault()}>Privacy & Policy</a>
			</div>
		</footer>
	)
}

