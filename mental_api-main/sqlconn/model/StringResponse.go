package model

type StringResponse struct {
	QuestionAnswer string `json:"question_answer" db:"question_answer"`
	DateTime       int `json:"date" db:"date_time"`
}
