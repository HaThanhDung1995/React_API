import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  actAddProductRequest,
  actGetProductRequest,
  actUpdateProductRequest
} from "./../../actions/Index";
import { connect } from "react-redux";
class ProductActionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      txtName: "",
      txtPrice: "",
      chkbStatus: ""
    };
  }
  handleChange = e => {
    var target = e.target;
    var name = target.name;
    var value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [name]: value
    });
  };
  onSave = e => {
    e.preventDefault();
    var { history } = this.props;
    var { id, txtName, txtPrice, chkbStatus } = this.state;
    var product = {
      id: id,
      name: txtName,
      price: txtPrice,
      status: chkbStatus
    };
    if (this.state.id) {
      this.props.updateProduct(product);
    } else {
      this.props.addProduct(product);
    }
    history.goBack();
  };
  componentDidMount() {
    var { match } = this.props;
    //var { id } = this.state;
    if (match) {
      var id = match.params.id;
      this.props.editProduct(id);
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.itemEditing) {
      var { itemEditing } = nextProps;
      this.setState({
        id: itemEditing.id,
        txtName: itemEditing.name,
        txtPrice: itemEditing.price,
        chkbStatus: itemEditing.status
      });
    }
  }
  render() {
    var { txtName, txtPrice, chkbStatus } = this.state;
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <form onSubmit={this.onSave}>
          <div className="form-group">
            <label>Tên sản phẩm</label>
            <input
              type="text"
              name="txtName"
              className="form-control"
              value={txtName}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Giá</label>
            <input
              type="number"
              name="txtPrice"
              value={txtPrice}
              className="form-control"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Trạng thái</label>
          </div>

          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                name="chkbStatus"
                value={chkbStatus}
                onChange={this.handleChange}
                checked={chkbStatus}
              />
              Còn hàng
            </label>
          </div>
          <Link className="btn btn-danger mr-10" to="/product-list">
            Trở lại
          </Link>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    itemEditing: state.itemEditting
  };
};
const mapDisPatchToProps = (dispatch, props) => {
  return {
    addProduct: product => {
      dispatch(actAddProductRequest(product));
    },
    updateProduct: product => {
      dispatch(actUpdateProductRequest(product));
    },
    editProduct: id => {
      dispatch(actGetProductRequest(id));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDisPatchToProps
)(ProductActionPage);
