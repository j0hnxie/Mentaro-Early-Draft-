package model

type FormCompleted struct {
	UserID     int `json:"user_id" db:"user_id"`
	FormID     int `json:"form_id" db:"form_id"`
	CompleteAt int `json:"complete_at" db:"complete_at"`
}
