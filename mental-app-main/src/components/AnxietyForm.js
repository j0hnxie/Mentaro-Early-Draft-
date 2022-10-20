import QuestionForm from "./QuestionForm";

const AnxietyForm = () => {
  const header =
    "Over the last 2 weeks, how often have you been bothered by the following problems?";

  const options = [
    ["Not At All",
    "Several Days",
    "More Than Half The Days",
    "Nearly Every Day",]
  ];
  const questions = [
    "Feeling nervous, anxious, or on edge?",
    "Not being able to stop or control worrying?",
    "Worrying too much about different things?",
    "Trouble relaxing?",
    "Being so restless that it is hard to sit still?",
    "Becoming easily annoyed or irritable?",
    "Feeling afraid, as if something awful might happen?",
  ];
  const QOMap = ()=>{return 0};
  const optionalQuestion =
    "Is there anything that you would like your employer to know?";
  const data = { header, options, questions, optionalQuestion, QOMap };
  return <QuestionForm data={data} />;
};

export default AnxietyForm;
