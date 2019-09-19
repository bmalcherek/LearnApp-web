import React, { Component } from "react";
import { Form, Input, Checkbox, Button } from "antd";
import axios from "axios";

export class QuestionEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: "",
      isImage: false,
      imageSrc: "",
      answer: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.createNext = this.createNext.bind(this);
  }

  componentDidMount() {
    const { edit, match } = this.props;

    if (edit) {
      const collID = match.params.collectionID;
      const questID = match.params.questionID;
      const token = localStorage.getItem("token");
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`
      };

      const url = `${process.env.REACT_APP_API_URL}api/questions/${collID}/${questID}`;
      axios.get(url).then(res =>
        this.setState({
          question: res.data.question,
          isImage: res.data.is_image,
          imageSrc: res.data.image_src,
          answer: res.data.answer
        })
      );
    }
  }

  onChange(event) {
    const { target } = event;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;

    this.setState({
      [name]: value
    });
  }

  onSubmit(event) {
    const { createNext } = this.state;
    const { match, edit, history } = this.props;

    // event.preventDefault();
    const question = event.target.elements.question.value;
    const isImage = event.target.elements.isImage.checked;
    const imageSrc = event.target.elements.imageSrc.value;
    const answer = event.target.elements.answer.value;
    const collID = match.params.collectionID;

    const q = {
      question,
      is_image: isImage,
      image_src: imageSrc,
      answer,
      collection: collID
    };

    const token = localStorage.getItem("token");
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };
    if (edit) {
      const questID = match.params.questionID;
      const url = `${process.env.REACT_APP_API_URL}api/questions/${collID}/${questID}`;
      axios.put(url, q);
    } else {
      const url = `${process.env.REACT_APP_API_URL}api/questions/${collID}/`;
      axios
        .post(url, q)
        .then(res => console.log(res))
        .catch(error => console.log(error));
    }

    if (createNext) {
      history.push(`/collections/${collID}/create-new-question`);
    } else {
      history.push(`/collections/${collID}`);
    }
  }

  createNext() {
    this.setState({
      createNext: true
    });
  }

  render() {
    const { question, isImage, imageSrc, answer } = this.state;
    const { edit } = this.props;

    return (
      <div>
        <Form onSubmit={this.onSubmit} id="question">
          <Form.Item label="Question" required="true">
            <Input
              name="question"
              placeholder="Question"
              value={question}
              onChange={this.onChange}
            />
          </Form.Item>

          <Form.Item label="Is image?">
            <Checkbox name="isImage" value={isImage} onChange={this.onChange} />
          </Form.Item>

          <Form.Item label="Image source: ">
            <Input
              name="imageSrc"
              placeholder="Source"
              value={imageSrc}
              onChange={this.onChange}
            />
          </Form.Item>

          <Form.Item label="Answer">
            <Input
              name="answer"
              placeholder="Answer"
              value={answer}
              onChange={this.onChange}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            {!edit ? (
              <Button
                name="createNext"
                form="question"
                htmlType="submit"
                onClick={this.createNext}
                style={{ borderLeft: "10px" }}
              >
                Save and create next
              </Button>
            ) : null}
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default QuestionEditForm;
