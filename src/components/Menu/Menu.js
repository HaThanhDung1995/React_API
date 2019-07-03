import React, { Component } from "react";
import { Route, Link } from "react-router-dom";

const menus = [
  {
    name: "Trang chủ",
    to: "/",
    exact: true
  },
  {
    name: "Quản lý sản phẩm",
    to: "/product-list",
    exact: false
  }
];
const MenuLink = ({ label, to, activeOnlyWhenExact }) => {
  return (
    <Route
      path={to}
      exact={activeOnlyWhenExact}
      children={({ match }) => {
        var active = match ? "active" : "";
        return (
          <li className={active}>
            <Link to={to}>{label}</Link>
          </li>
        );
      }}
    />
  );
};
class Menu extends Component {
  showMenus=(menus)=>{
    var result =null
    if(menus.length >0){
      result= menus.map((menu,index)=>{
        return (<MenuLink label={menu.name} key={index} to={menu.to} activeOnlyWhenExact={menu.exact}></MenuLink>)
      })
    }
    return result;
  }
  render() {
    return (
      <div className="navbar navbar-default">
          {/* eslint-disable-next-line */}
         <a className="navbar-brand">Call API</a>  
        <ul className="nav navbar-nav">
          {this.showMenus(menus)}
          
        </ul>
      </div>
    );
  }
}

export default Menu;
