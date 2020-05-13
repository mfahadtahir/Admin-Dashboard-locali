import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';

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
        <SidebarLink title="Dashboard" icon="home" route="/pages/dashboard" onClick={this.hideSidebar} />
        <SidebarLink title="Products" icon="cart" route="/pages/products" onClick={this.hideSidebar} />
        <SidebarLink title="Orders" icon="list" route="/pages/orders" onClick={this.hideSidebar} />
      </div>
    );
  }
}

export default SidebarContent;
