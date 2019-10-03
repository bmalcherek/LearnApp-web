/* eslint-disable quote-props */
import React, { Component } from "react";
import { Button, Typography, Progress, Tooltip } from "antd";
import axios from "axios";

import LearnSummary from "./LearnSummary";
import "../styles/LearnView.css";
// import SubMenu from 'antd/lib/menu/SubMenu';

export class LearnView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      questionsStats: [],
      currentQuestion: 0,
      loaded: false,
      answered: false,
      finished: false
    };
    this.showAnswer = this.showAnswer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.nextQuestion = this.nextQuestion.bind(this);
    this.addOriginalIndex = this.addOriginalIndex.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { collectionID } = match.params;
    const token = localStorage.getItem("token");

    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };

    const url = `${process.env.REACT_APP_API_URL}api/my-questions/${collectionID}/get-questions-to-learn/`;
    axios.get(url).then(res => this.addOriginalIndex(res.data));
  }

  addOriginalIndex(res) {
    const oldQuestions = res;
    const newQuestions = [];
    const stats = [];
    oldQuestions.forEach((element, index) => {
      // eslint-disable-next-line no-param-reassign
      element.originalIndex = index;
      newQuestions.push(element);
      stats.push({
        great: 0,
        good: 0,
        average: 0,
        bad: 0,
        veryBad: 0,
        wrong: 0,
        sum: 0
      });
    });

    this.setState({
      questions: newQuestions,
      questionsStats: stats,
      loaded: true
    });
  }

  showAnswer() {
    this.setState({
      answered: true
    });
  }

  nextQuestion() {
    const { currentQuestion, questions } = this.state;
    if (currentQuestion + 1 <= questions.length - 1) {
      this.setState(prevState => ({
        currentQuestion: prevState.currentQuestion + 1
      }));
    } else {
      this.setState({
        finished: true
      });
    }
  }

  handleSubmit(event) {
    const { questions, currentQuestion, questionsStats } = this.state;
    const { match } = this.params;

    const { name } = event.target;
    const { originalIndex } = questions[currentQuestion];
    const newStats = questionsStats;
    const { collectionID } = match.params;
    const questionIndex = questions[originalIndex].id;
    const token = localStorage.getItem("token");
    let q;
    let wrongAnswer = false;

    if (name === "great") {
      newStats[originalIndex].great += 1;
      q = 5;
      this.nextQuestion();
    } else if (name === "good") {
      newStats[originalIndex].good += 1;
      q = 4;
      this.nextQuestion();
    } else if (name === "average") {
      newStats[originalIndex].average += 1;
      this.setState(prevState => ({
        questions: [
          ...prevState.questions,
          prevState.questions[prevState.currentQuestion]
        ]
      }));
      q = 3;
      wrongAnswer = true;
    } else if (name === "bad") {
      newStats[originalIndex].bad += 1;
      this.setState(prevState => ({
        questions: [
          ...prevState.questions,
          prevState.questions[prevState.currentQuestion]
        ]
      }));
      q = 2;
      wrongAnswer = true;
    } else if (name === "veryBad") {
      newStats[originalIndex].veryBad += 1;
      this.setState(prevState => ({
        questions: [
          ...prevState.questions,
          prevState.questions[prevState.currentQuestion]
        ]
      }));
      q = 1;
      wrongAnswer = true;
    } else if (name === "wrong") {
      newStats[originalIndex].wrong += 1;
      this.setState(prevState => ({
        questions: [
          ...prevState.questions,
          prevState.questions[prevState.currentQuestion]
        ]
      }));
      q = 0;
      wrongAnswer = true;
    }
    newStats[originalIndex].sum += 1;

    const data = {
      q
    };

    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`
    };

    const url = `${process.env.REACT_APP_API_URL}api/my-questions/${collectionID}/${questionIndex}/`;
    axios.put(url, data);

    this.setState({
      answered: false,
      questionsStats: newStats
    });

    if (wrongAnswer) {
      this.setState(prevState => ({
        currentQuestion: prevState.currentQuestion + 1
      }));
    }
  }

  render() {
    const {
      loaded,
      finished,
      questions,
      currentQuestion,
      answered,
      questionsStats
    } = this.state;

    let question = null;
    let questionText = null;
    if (loaded && !finished) {
      question = questions[currentQuestion];
      questionText = (
        <Typography.Title level={2} className="question">
          {question.question}
        </Typography.Title>
      );
    }

    let answer;
    if (answered && !finished) {
      answer = (
        <div style={{ textAlign: "center" }}>
          <Typography.Title level={3}>{question.answer}</Typography.Title>
        </div>
      );
    } else {
      answer = null;
    }

    let buttons = null;
    if (!answered && !finished) {
      buttons = (
        <div style={{ textAlign: "center" }}>
          <Button onClick={this.showAnswer}>Show Answer</Button>
        </div>
      );
    } else if (!finished) {
      buttons = (
        <div
          id="answerButtons"
          style={{
            textAlign: "center"
          }}
        >
          <Button name="great" onClick={this.handleSubmit}>
            Great
          </Button>
          <Button name="good" onClick={this.handleSubmit}>
            Good
          </Button>
          <Button name="average" onClick={this.handleSubmit}>
            Average
          </Button>
          <Button name="bad" onClick={this.handleSubmit}>
            Bad
          </Button>
          <Button name="veryBad" onClick={this.handleSubmit}>
            Very Bad
          </Button>
          <Button name="wrong" onClick={this.handleSubmit}>
            Wrong!
          </Button>
        </div>
      );
    }

    let learnSummary = null;
    let finishPct = 0;
    let title = null;
    if (finished) {
      learnSummary = (
        <LearnSummary successPercent={100} questionsStats={questionsStats} />
      );
      finishPct = 100;
      title = `${questions.length} done / ${questions.length} total`;
    } else {
      finishPct = Number(
        ((currentQuestion / questions.length) * 100).toFixed(2)
      );
      title = `${currentQuestion} done / ${questions.length} total`;
    }

    return (
      <div>
        <Tooltip title={title}>
          <Progress
            strokeColor={{
              "0%": "#108ee9",
              "100%": "#87d068"
            }}
            percent={finishPct}
          />
        </Tooltip>
        {questionText}
        {answer}
        {buttons}
        {learnSummary}
      </div>
    );
  }
}

export default LearnView;
