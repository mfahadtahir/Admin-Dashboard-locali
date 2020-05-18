import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';

class SidebarContent extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  hideSidebar = () => {
    const { onClick } = this.props;
    onClick();
  };

  render() {
    return (
      <div className="sidebar__content">
        <SidebarLink title="Dashboard" icon="home" route="/dashboard" onClick={this.hideSidebar} />
        <SidebarLink title="Products" icon="cart" route="/products" onClick={this.hideSidebar} />
        <SidebarCategory title="Orders" icon="list" > 
          <SidebarLink title="Upcomming Orders" route="/orders/upcomming" onClick={this.hideSidebar} />
          <SidebarLink title="Past Orders" route="/orders/past" onClick={this.hideSidebar} />
        </SidebarCategory>
      </div>
    );
  }
}

export default SidebarContent;
