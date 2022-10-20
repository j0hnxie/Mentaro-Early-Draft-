import QuestionForm from "./QuestionForm";

const DailyForm = () => {
  const header =
    "Fill out your daily form";

  const numbers = []
  for (let i = 0; i < 11; i++){
    numbers.push(i+1)
  }
  numbers.push("12+");

  const options = [
    ["Terrible",
    "Poor",
    "Moderate",
    "Content",
    "Excellent"],numbers
  ];
  const questions = [
    "What choice best describes your mood today?",
    "How may hours of sleep did you get last night?"
  ];
  const QOMap = (idx)=>idx;
  const optionalQuestion =
    "Is there anything that you would like your employer to know?";
  const data = { header, options, questions, optionalQuestion, QOMap };
  return <QuestionForm data={data} />;
};

export default DailyForm;
