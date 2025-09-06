import React from 'react';
import styled from '@emotion/styled';

const AuthContainer = styled.div(() => ({
	height: '100vh'
}))

export const AuthLayout = ({ children }) => {
	
	return (
		<AuthContainer>
			{children}
		</AuthContainer>
	)
}

export default AuthLayout
