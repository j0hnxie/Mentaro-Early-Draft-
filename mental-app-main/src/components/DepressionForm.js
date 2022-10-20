import QuestionForm from "./QuestionForm";

const DepressionForm = () => {
  const header =
    "Over the last 2 weeks, how often have you been bothered by the following problems?";

  const options = [
    [
      "Not At All",
      "Several Days",
      "More Than Half The Days",
      "Nearly Every Day",
    ],
    [
      "Not Difficult At All",
      "Somewhat Difficult",
      "Very Difficult",
      "Extremely Difficult",
    ],
  ];
  const questions = [
    "Little interest or pleasure in doing things?",
    "Feeling down, depressed, or hopeless?",
    "Trouble falling or staying asleep, or sleeping too much?",
    "Feeling tired or having little energy?",
    "Poor appetite or overeating?",
    "Feeling bad about yourself - or that you are a failure or have let yourself or your family down?",
    "Trouble concentrating on things, such as reading the newspaper or watching television?",
    "Moving or speaking so slowly that other people could have noticed. Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?",
    "Thoughts that you would be better off dead, or of hurting yourself",
    "If you checked off any problems, how difficult have these problems made it for you at work, home, or with other people?",
  ];

  const QOMap = (idx) => {
    if (idx < 9) return 0;
    else return 1;
  };

  const id = 0;

  const data = { header, options, questions, QOMap, id };
  return <QuestionForm data={data} />;
};

export default DepressionForm;
