import React, { Component } from "react";
import { Card, Button, Popconfirm } from "antd";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

export class QuestionDetail extends Component {
  constructor() {
    super();
    this.state = {
      question: [],
      deleted: false
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { collectionID, questionID } = match.params;

    const token = localStorage.getItem("token");
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };

    const url = `${process.env.REACT_APP_API_URL}api/questions/${collectionID}/${questionID}`;
    axios
      .get(url)
      .then(res =>
        this.setState({
          question: res.data
        })
      )
      .catch(err => {
        console.log(err);
      });
  }

  handleDelete() {
    const { match, history } = this.props;
    const { collectionID, questionID } = match.params;
    const token = localStorage.getItem("token");
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };

    const url = `${process.env.REACT_APP_API_URL}api/questions/${collectionID}/${questionID}`;
    axios.delete(url);
    this.setState({
      deleted: true
    });
    history.push("/");
  }

  render() {
    const { deleted, question } = this.state;
    const { match } = this.props;

    let redirect;
    if (deleted) {
      redirect = <Redirect to={`/collections/${match.params.collectionID}`} />;
    } else {
      redirect = null;
    }

    const { Meta } = Card;
    let card;
    if (question.is_image) {
      card = (
        <Card
          style={{ width: 300 }}
          cover={<img alt="example" src={question.image_src} />}
        >
          <Meta title={question.question} description={question.answer} />
        </Card>
      );
    } else {
      card = (
        <Card title={question.question}>
          <p>{question.answer}</p>
        </Card>
      );
    }

    return (
      <div>
        <Link to={`${match.params.questionID}/edit-question`}>
          <Button>Edit Question</Button>
        </Link>
        <Popconfirm
          title="Are you sure delete this question?"
          onConfirm={this.handleDelete}
        >
          <Button type="danger">Delete Question</Button>
        </Popconfirm>
        {card}
        {/* <img alt="" src="https://images.newschoolers.com/images/17/00/76/80/14/768014.jpg" /> */}
        {redirect}
      </div>
    );
  }
}

export default QuestionDetail;
