import React, { Component } from "react";
import { List, Avatar } from "antd";
import axios from "axios";

export class QuestionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    const { collectionID } = this.props;
    const token = localStorage.getItem("token");

    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };

    const url = `${process.env.REACT_APP_API_URL}api/questions/${collectionID}`;
    axios.get(url).then(res =>
      this.setState({
        data: res.data
      })
    );
  }

  render() {
    const { data } = this.state;
    const { collectionID } = this.props;

    return (
      <div>
        <List
          itemLayout="horizontal"
          pagination={{
            pageSize: 3
          }}
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={
                  // eslint-disable-next-line react/jsx-wrap-multilines
                  <a href={`/collections/${collectionID}/${item.id}`}>
                    {item.question}
                  </a>
                }
                description={collectionID}
              />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default QuestionList;
