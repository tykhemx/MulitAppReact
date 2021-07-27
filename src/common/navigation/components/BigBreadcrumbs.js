import React from "react";

export default class BigBreadcrumbs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: this.props.items || [],
      icon: this.props.icon || "fa fa-fw fa-home"
    };
  }

  onNavigationChange(data) {
    let item = data.item;
    if (item.route) {
      this.setState({
        icon: "",
        items: []
      });
      this.addCrumb(item);
      this.forceUpdate();
    }
  }

  addCrumb(item) {
    this.state.items.unshift(item.title);
    if (!this.state.icon && item.icon) this.setState({ icon: item.icon });
    if (item.parent) this.addCrumb(item.parent);
  }

  render() {
    const [first, ...tail] = this.state.items;

    return (
      <div className={this.props.className + " big-breadcrumbs"}>
        <h1 className="page-title txt-color-blueDark">
          <i className={this.state.icon} />
          {" " + first}
          {tail.map((item, idx) => {
            return (
              <span key={"big-breadcrumb-" + idx}>
                <span className="page-title-separator">&gt;</span>
                {item}
              </span>
            );
          })}
        </h1>
      </div>
    );
  }
}
