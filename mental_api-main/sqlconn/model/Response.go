package model

type Response struct {
	FormID         int `json:"form_id" db:"form_id"`
	QuestionNumber int `json:"question_number" db:"question_number"`
	QuestionAnswer int `json:"question_answer" db:"question_answer"`
	UserID         int `json:"user_id" db:"user_id"`
	DateTime       int `json:"date" db:"date_time"`
}
