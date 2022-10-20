package model

type Question struct {
	QuestionID   int    `json:"question_id" db:"question_id"`
	QuestionText string `json:"question_text" db:"question_text"`
	FormID       int    `json:"form_id" db:"form_id"`
}
