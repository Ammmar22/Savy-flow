import { css } from '@emotion/react';

export const codeBoxCss = token => css`
	position: relative;
	display: inline-block;
	width: 100%;
	margin: 0 0 16px;
	border: 1px solid ${token.colorBorderSecondary};
	border-radius: ${token.borderRadiusLG}px;
	background-color: ${token.colorBgContainer};

    .code-box-title {
        font-size:  ${token.fontSizeHeading4}px;
    }
`
export const codeBoxDemoCss = token => css`
	padding: 42px 24px 50px;
	border-bottom: 1px solid ${token.colorBorderSecondary}px;

	iframe {
		border: 0px;
		width: 100%;
	}

	.config-provider {
        .site-config-provider-calendar-wrapper {
            width: 319px;
            border: 1px solid ${token.colorBorderSecondary};
            border-radius: 2px;
        }
        
        .locale-components {
            border-top: 1px solid ${token.colorBorderSecondary};
            padding-top: 16px;
        }
        
        .example {
            margin: 16px 0;
        }
        
        .example > * {
            margin-right: 8px;
        }
        
        .change-locale {
            margin-bottom: 16px;
        }

        .button-demo .ant-btn,
        .button-demo .ant-btn-group {
            margin-right: 8px;
            margin-bottom: 12px;
        }
        .button-demo .ant-btn-group > .ant-btn,
        .button-demo .ant-btn-group > span > .ant-btn {
            margin-right: 0;
            margin-left: 0;
        }

        .head-example {
            display: inline-block;
            width: 42px;
            height: 42px;
            vertical-align: middle;
            background: #eee;
            border-radius: 4px;
        }

        .ant-badge:not(.ant-badge-not-a-wrapper) {
            margin-right: 20px;
        }
        .ant-badge-rtl:not(.ant-badge-not-a-wrapper) {
            margin-right: 0;
            margin-left: 20px;
        }
    }
`

export const codeBoxDescriptionCss = css`
    padding: 16px;
`

export const codeBoxHighlightCss = (token, codeExpand) => css`
    margin-top: 16px;
    display: ${codeExpand ? 'block' : 'none'};

    code {
        margin: 0;
        background: transparent;
        padding: 0;
        border-radius: 0;
        font-size: ${token.fontSize};
        border: 0;
        color: inherit;
    }

    pre {
        margin-bottom: 0px;
    }
`

export const codeBoxIconCss = (token, copied) => css`
    cursor: pointer;
    ${copied ? ('color:' + token.colorSuccess + ';') : ''}
`

export const codeBoxActionCss = (token) => css`
    margin-top: 12px;
    padding-top: 12px;
    text-align: right;
    border-top: 1px dashed ${token.colorBorderSecondary};
    font-size: 18px;
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 10px;
`