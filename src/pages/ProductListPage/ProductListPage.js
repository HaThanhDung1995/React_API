import React, { Component } from "react";
import ProductList from "./../../components/ProductList/ProductList";
import ProductItem from "./../../components/ProductItem/ProductItem";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  actFetchProductRequest,
  actDeleteProductRequest
} from "./../../actions/Index";
class ProductListPage extends Component {
  showProduct = products => {
    var result = null;
    if (products.length > 0) {
      result = products.map((product, index) => {
        return (
          <ProductItem
            onDelete={this.DeleteProduct}
            key={index}
            product={product}
            index={index}
          />
        );
      });
    }
    return result;
  };
  componentDidMount() {
    this.props.fetchAllProducts();
  }
  DeleteProduct = id => {
    this.props.onDeleteProduct(id);
  };

  render() {
    var { products } = this.props;
    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <Link to="/product/add" className="btn btn-info mb-10">
          Thêm Sản Phẩm
        </Link>
        <ProductList>{this.showProduct(products)}</ProductList>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    products: state.products
  };
};
const mapDisPatchToProps = (dispatch, props) => {
  return {
    fetchAllProducts: () => {
      dispatch(actFetchProductRequest());
    },
    onDeleteProduct: id => {
      dispatch(actDeleteProductRequest(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDisPatchToProps
)(ProductListPage);
