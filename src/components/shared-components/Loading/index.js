import React from 'react';
import { Spin } from 'antd';
import PropTypes from 'prop-types'
import { LoadingOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

const Icon = <LoadingOutlined style={{ fontSize: 35 }} spin />

const LoadingWrapper = styled('div')`
	${props => props.cover === 'content' ? `
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	` : '' }

	${props => props.cover === 'page' ? `
		position: fixed;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	` : '' }
`

const Loading = (props) => {
	const { align, cover = 'content' } = props
	return (
		<LoadingWrapper className={`${align ? `text-${align}` : ''}`} cover={cover}>
			<Spin indicator={Icon} />
		</LoadingWrapper>
	)
}

Loading.propTypes = {
	size: PropTypes.string,
	cover: PropTypes.string
}

Loading.defaultProps = {
	align: 'center',
	cover: 'inline'
};

export default Loading