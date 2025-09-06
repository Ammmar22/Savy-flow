import React from "react";
import { Drawer } from "antd";
import { useSelector, useDispatch } from 'react-redux';
import { NAV_TYPE_SIDE } from "constants/ThemeConstant";
import { Scrollbars } from "react-custom-scrollbars-2";
import MenuContent from "./MenuContent";
import { onMobileNavToggle } from 'store/slices/themeSlice';
import Logo from "./Logo";
import Flex from "components/shared-components/Flex";
import { ArrowLeftOutlined } from "@ant-design/icons";

export const MobileNav = ({
	routeInfo,
	hideGroupTitle
}) => {

	const dispatch = useDispatch();
	const currentTheme = useSelector(state => state.theme.currentTheme);
	const mobileNav = useSelector(state => state.theme.mobileNav);

	const menuContentprops = { routeInfo, hideGroupTitle };

	const onClose = () => {
		dispatch(onMobileNavToggle(false));
	};

	return (
		<Drawer
			placement="left"
			closable={false}
			onClose={onClose}
			open={mobileNav}
			bodyStyle={{ padding: 5 }}
			width={300}
		>
			<Flex flexDirection="column" className="h-100">
				<Flex justifyContent="space-between" alignItems="center">
					<Logo logoType={currentTheme === 'dark' ? 'light' : 'dark'} mobileLogo={true} />
					<div className="px-3" onClick={() => onClose()}>
						<ArrowLeftOutlined />
					</div>
				</Flex>
				<div className="h-100">
					<Scrollbars autoHide>
						<MenuContent type={NAV_TYPE_SIDE} {...menuContentprops} />
					</Scrollbars>
				</div>
			</Flex>
		</Drawer>
	);
};

export default MobileNav;
