import React from 'react';
import PropTypes from 'prop-types';
import { ButtonCustom } from '../../../components/Button';  // Ensure ButtonCustom is correctly imported or not used
import { injectIntl } from 'react-intl';
import { Tabs } from 'antd';

function SubHeaderFiler({ intl }) {
    const onChange = (key) => {
        console.log(key);
    };
    // Initializing the tabs with valid keys and content
    const initialItems = [
        {
            label: 'Tab 1',
            children: 'Content of Tab 1',
            key: '1',
        },
        {
            label: 'Tab 2',
            children: 'Content of Tab 2',
            key: '2',
        },
        {
            label: 'Tab 3',
            children: 'Content of Tab 3',
            key: '3',
        },
    ];

    // Ensuring Tabs component receives correct items array
    return (
        <>
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Tab 1" key="1">
                    Content of Tab Pane 1
                </Tabs.TabPane>
                <Tabs.TabPane tab="Tab 2" key="2">
                    Content of Tab Pane 2
                </Tabs.TabPane>
                <Tabs.TabPane tab="Tab 3" key="3">
                    Content of Tab Pane 3
                </Tabs.TabPane>
            </Tabs>
        </>
    );
}

SubHeaderFiler.defaultProps = {
    onInventoryClick: () => { },
    onMisClick: () => { },
};

SubHeaderFiler.propTypes = {
    onInventoryClick: PropTypes.func,
    onMisClick: PropTypes.func,
};

export default injectIntl(SubHeaderFiler);
