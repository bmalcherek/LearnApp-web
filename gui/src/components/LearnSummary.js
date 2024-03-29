import React from "react";
import { Typography, Progress, Button, Tooltip } from "antd";
import { Link } from "react-router-dom";

import "../styles/LearnSummary.css";

export default function LearnSummary(props) {
  let great = 0;
  let good = 0;
  let average = 0;
  let bad = 0;
  let veryBad = 0;
  let wrong = 0;
  let total = 0;

  const { questionsStats } = props;

  questionsStats.forEach(element => {
    great += element.great;
    good += element.good;
    average += element.average;
    bad += element.bad;
    veryBad += element.veryBad;
    wrong += element.wrong;
  });

  total = great + good + average + bad + veryBad + wrong;
  const greatPct = Number(((great / total) * 100).toFixed(2));
  const goodPct = Number(((good / total) * 100).toFixed(2));
  const averagePct = Number(((average / total) * 100).toFixed(2));
  const badPct = Number(((bad / total) * 100).toFixed(2));
  const veryBadPct = Number(((veryBad / total) * 100).toFixed(2));
  const wrongPct = Number(((wrong / total) * 100).toFixed(2));

  return (
    <div>
      <Typography.Title type={2} className="summaryText">
        Summary
      </Typography.Title>

      <div className="progressBars">
        <Typography>Great answers</Typography>
        <Tooltip title={`${great} great / ${total} total`}>
          <Progress percent={greatPct} strokeColor="#87d068" />
        </Tooltip>

        <Typography>Good answers</Typography>
        <Tooltip title={`${good} good / ${total} total`}>
          <Progress percent={goodPct} strokeColor="#9FB153" />
        </Tooltip>

        <Typography>Average answers</Typography>
        <Tooltip title={`${average} average / ${total} total`}>
          <Progress percent={averagePct} strokeColor="#B7913E" />
        </Tooltip>

        <Typography>Bad answers</Typography>
        <Tooltip title={`${bad} bad / ${total} total`}>
          <Progress percent={badPct} strokeColor="#CF722A" />
        </Tooltip>

        <Typography>Very Bad answers</Typography>
        <Tooltip title={`${veryBad} very bad / ${total} total`}>
          <Progress percent={veryBadPct} strokeColor="#E75215" />
        </Tooltip>

        <Typography>Wrong answers</Typography>
        <Tooltip title={`${wrong} wrong / ${total} total`}>
          <Progress percent={wrongPct} strokeColor="#FF3300" />
        </Tooltip>
      </div>

      <div className="returnButton">
        <Link to="/my-collections" className="returnButton">
          <Button className="returnButton">Return to My Collections</Button>
        </Link>
      </div>
    </div>
  );
}
