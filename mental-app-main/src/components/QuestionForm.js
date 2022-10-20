import {
  FormControlLabel,
  FormLabel,
  RadioGroup,
  Radio,
  TextField,
  Button,
  Paper,
} from "@material-ui/core";
import React, { useState } from "react";
import { withRouter } from "react-router";
import axios from "axios";

const QuestionForm = ({ data }) => {
  const [response, setResponse] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(response);
    console.log(data.id);

    const params = new URLSearchParams();
    for (const key in response) {
      params.append(key, response[key]);
    }
    params.append("form_id", data.id);

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      withCredentials : true
    }

    axios.post("api/sendresponse", params, config)
     .then((response) => response.data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    // history.push("/UserHomePage");
  };
  return (
    <Paper>
      <Button href="/UserHomePage">Back</Button>

      <h1>{data.header}</h1>
      <form onSubmit={handleSubmit}>
        {data.questions.map((question, idx) => (
          <div key={idx}>
            <FormLabel component="legend">{question}</FormLabel>
            <RadioGroup
              name={question}
              value={response.hasOwnProperty(idx) ? response[idx] : null}
              onChange={(e) =>
                setResponse({ ...response, [idx]: +e.target.value })
              }
              row
            >
              {data.options[data.QOMap(idx)].map((option, optionIdx) => (
                <FormControlLabel
                  key={optionIdx}
                  value={optionIdx}
                  control={<Radio />}
                  label={`${option}`}
                />
              ))}
            </RadioGroup>
          </div>
        ))}

        {data.hasOwnProperty("optinoalQuestion") && (
          <>
            <FormLabel component="legend">{data.optionalQuestion}</FormLabel>
            <TextField
              id="standard-multiline-static"
              multiline
              rows={4}
              value={response.hasOwnProperty("opt") ? response["opt"] : ""}
              onChange={(e) =>
                setResponse({ ...response, opt: e.target.value })
              }
            />
          </>
        )}

        <Button type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
    </Paper>
  );
};

export default withRouter(QuestionForm);
