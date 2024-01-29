import React, { useState } from 'react';
import styles from './TabMenu.module.css';

function TabMenuItem({ children, isActive = '', onClickEvent }) {
  return (
    <button
      className={`${styles.item} ${isActive ? styles.active : ''}`}
      type="button"
      onClick={onClickEvent}
    >
      {children}
    </button>
  );
}

function TabMenu() {
  const [activeTab, setActiveTab] = useState('details');
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  return (
    <ul className={`${styles['menu-list']}`} role="menubar">
      <li role="presentation">
        <TabMenuItem
          isActive={activeTab === 'details'}
          onClickEvent={() => handleTabClick('details')}
        >
          상세정보
        </TabMenuItem>
      </li>
      <li role="presentation">
        <TabMenuItem
          isActive={activeTab === 'reviews'}
          onClickEvent={() => handleTabClick('reviews')}
        >
          리뷰
        </TabMenuItem>
      </li>
      <li role="presentation">
        <TabMenuItem
          isActive={activeTab === 'qa'}
          onClickEvent={() => handleTabClick('qa')}
        >
          Q&#38;A
        </TabMenuItem>
      </li>
      <li role="presentation">
        <TabMenuItem
          isActive={activeTab === 'return'}
          onClickEvent={() => handleTabClick('return')}
        >
          반품&#47;교환정보
        </TabMenuItem>
      </li>
    </ul>
  );
}

export default TabMenu;
