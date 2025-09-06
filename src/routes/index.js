import React from 'react';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { AUTHENTICATED_ENTRY } from 'configs/AppConfig';
import { protectedRoutes, publicRoutes } from 'configs/RoutesConfig';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import AppRoute from './AppRoute';
import QuestionsPage from "../views/app-views/dashboards/default/flow/question";
import Welcome from "../views/app-views/dashboards/default/flow/Welcome";
import BlankLayout from "./BlankLayout";
import CustomAlertModal from "../views/app-views/dashboards/default/flow/CustomAlertModal";

const Routes = () => {
	return (

		<RouterRoutes>
			{/* Preview route - standalone */}
			<Route
				path="/preview/flow/:id"
				element={
					<BlankLayout>
						<Welcome />
					</BlankLayout>
				}
			/>
			<Route
				path="/preview/flow/:id/question"
				element={
					<BlankLayout>
						<QuestionsPage />
					</BlankLayout>
				}
			/>

			<Route
				path="/preview/flow/:id/custom-alert"
				element={
					<BlankLayout>
						<CustomAlertModal />
					</BlankLayout>
				}
			/>

			{/* Protected routes */}
			<Route path="/" element={<ProtectedRoute />}>
				<Route path="/" element={<Navigate replace to={AUTHENTICATED_ENTRY} />} />
				{protectedRoutes.map((route, index) => (
					<Route
						key={route.key + index}
						path={route.path}
						element={<AppRoute routeKey={route.key} component={route.component} {...route.meta} />}
					/>
				))}
				<Route path="*" element={<Navigate to="/" replace />} />
			</Route>

			{/* Public routes */}
			<Route path="/" element={<PublicRoute />}>
				{publicRoutes.map(route => (
					<Route
						key={route.path}
						path={route.path}
						element={<AppRoute routeKey={route.key} component={route.component} {...route.meta} />}
					/>
				))}
			</Route>
		</RouterRoutes>

	)
}

export default Routes