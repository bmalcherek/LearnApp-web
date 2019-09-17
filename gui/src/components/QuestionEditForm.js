import React, { Component } from 'react';
import { Form, Input, Checkbox, Button } from 'antd';
import axios from 'axios';

export class QuestionEditForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            isImage: false,
            imageSrc: '',
            answer: '',
            collectionID: props.collectionID,
            submitted: false,
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        if (this.props.edit) {
            const collID = this.props.match.params.collectionID;
            const questID = this.props.match.params.questionID;
            const token = localStorage.getItem('token');
            axios.defaults.headers = {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            };

            const url = process.env.REACT_APP_API_URL + `api/questions/${collID}/${questID}`;
            axios.get(url)
                .then(res => this.setState({
                    question: res.data.question,
                    isImage: res.data.is_image,
                    imageSrc: res.data.image_src,
                    answer: res.data.answer,
                }));
        }
    }

    onChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    }

    onSubmit(event) {
        // event.preventDefault();
        const question = event.target.elements.question.value;
        const isImage = event.target.elements.isImage.checked;
        const imageSrc = event.target.elements.imageSrc.value;
        const answer = event.target.elements.answer.value;
        const collID = this.props.match.params.collectionID;
        console.log(this.state);

        const q = {
            question,
            is_image: isImage,
            image_src: imageSrc,
            answer,
            collection: collID,
        };

        const token = localStorage.getItem('token');
        axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Token ${token}`,
        };
        if (this.props.edit) {
            const questID = this.props.match.params.questionID;
            const url = process.env.REACT_APP_API_URL + `api/questions/${collID}/${questID}`;
            axios.put(url, q);
        } else {
            const url = process.env.REACT_APP_API_URL + `api/questions/${collID}/`;
            axios.post(url, q)
                .then(res => console.log(res))
                .catch(error => console.log(error));
        }
        
        if (this.state.createNext) {
            this.props.history.push(`/collections/${collID}/create-new-question`);
        } else {
            this.props.history.push(`/collections/${collID}`);
        }
    }

    createNext() {
        this.setState({
            'createNext':true,
        });
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.onSubmit} id="question">
                    <Form.Item label="Question" required="true">
                        <Input name="question" placeholder="Question" value={this.state.question} onChange={this.onChange} />
                    </Form.Item>

                    <Form.Item label="Is image?">
                        <Checkbox name="isImage" value={this.state.isImage} onChange={this.onChange} />
                    </Form.Item>

                    <Form.Item label="Image source: ">
                        <Input name="imageSrc" placeholder="Source" value={this.state.imageSrc} onChange={this.onChange} />
                    </Form.Item>

                    <Form.Item label="Answer">
                        <Input name="answer" placeholder="Answer" value={this.state.answer} onChange={this.onChange} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        {!this.props.edit ? 
                            (<Button
                                name="createNext"
                                form="question"
                                htmlType="submit"
                                onClick={this.createNext.bind(this)}
                                style={{borderLeft: "10px"}}>
                                Save and create next
                            </Button>) 
                            :
                            null}
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default QuestionEditForm;
