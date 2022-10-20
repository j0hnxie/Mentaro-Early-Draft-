package model

type Answer struct {
	QuestionID   int    `json:"question_id" db:"question_id"`
	AnswerNumber int    `json:"answer_number" db:"answer_number"`
	Response     string `json:"response" db:"response"`
}
