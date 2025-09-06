/** @jsxImportSource @emotion/react */
import { useState, useRef } from 'react';
import { 
	DashboardOutlined,
	AppstoreOutlined,
	AntDesignOutlined,
	FileTextOutlined,
	SearchOutlined
} from '@ant-design/icons';
import { Link } from "react-router-dom";
import { AutoComplete, Input } from 'antd';
import IntlMessage from 'components/util-components/IntlMessage';
import navigationConfig from "configs/NavigationConfig";
import { BODY_BACKGROUND, GRAY_SCALE, DARK_MODE } from 'constants/ThemeConstant'
import Flex from 'components/shared-components/Flex';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const SearchResultIcon = styled.div(() => ({
	fontSize: '1.5rem',
	marginRight: '1rem'
}));

const SearchResultTitle = styled.div(({mode}) => ({
	color: mode === 'light' ? DARK_MODE.HEADING_COLOR : GRAY_SCALE.GRAY_DARK,
	fontWeight: '500'
}));


function getOptionList (navigationTree, optionTree) {
	optionTree = optionTree ? optionTree : [];
	for ( const navItem of navigationTree ) {
		if(navItem.submenu.length === 0) {
			optionTree.push(navItem)
		}
		if(navItem.submenu.length > 0) {
			getOptionList(navItem.submenu, optionTree);
		}
	}
	return optionTree 
}

const optionList = getOptionList(navigationConfig)

const getCategoryIcon = category => {
	switch (category) {
		case 'dashboards':
			return <DashboardOutlined className="text-success"/>;
		case 'apps':
			return <AppstoreOutlined className="text-danger"/>;
		case 'components':
			return <AntDesignOutlined className="text-primary"/>;
		case 'extra':
			return <FileTextOutlined className="text-warning"/>;
		default:
			return null;
	}
}

const searchResult = (mode) => optionList.map((item) => {
	const category = item.key.split('-')[0]
	return {
		value: item.path,
		label: (
			<Link to={item.path}>
				<Flex alignItems="center" padding="7px 12px">
					<SearchResultIcon>
						{getCategoryIcon(category)}
					</SearchResultIcon>
					<div>
						<SearchResultTitle mode={mode}>
							<IntlMessage id={item.title} />
						</SearchResultTitle>
						<div className="font-size-sm text-muted">{category} </div>
					</div>
				</Flex>
			</Link>
		),
	};
});

const SearchInput = props => {
	const { active, close, isMobile, mode } = props
	const [value, setValue] = useState('');
	const [options, setOptions] = useState([])
	const inputRef = useRef(null);

	const onSelect = () => {
		setValue('')
		setOptions([])
		if(close) {
			close()
		}
  };

	const onSearch = searchText => {
		setValue(searchText)
		setOptions(!searchText ? [] : searchResult(mode))
	};
	
	const autofocus = () => {
		inputRef.current.focus();
	}

	if(active) {
		autofocus()
	}

	return (
		<AutoComplete
			ref={inputRef} 
			css={css`
				${!isMobile ? `
					min-width: 300px;
					width: 100%;
			
					.ant-input-affix-wrapper {
						background-color: ${mode === 'light' ? '#1b2531' : BODY_BACKGROUND};
			
						.ant-input {
							background-color: transparent;
						}
			
						.ant-input-prefix {
							color: ${GRAY_SCALE.GRAY_LIGHT};
						}
					}
				` : ''}
			`}
			popupClassName="nav-search-dropdown"
			options={options}
			onSelect={onSelect}
			onSearch={onSearch}
			value={value}
			filterOption={(inputValue, option) => 
				option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
			}
		>
			<Input placeholder="Search..."  prefix={<SearchOutlined className="mr-0" />} />
		</AutoComplete>
	)
}

export default SearchInput
