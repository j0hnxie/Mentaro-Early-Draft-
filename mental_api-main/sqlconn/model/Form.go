package model

type Form struct {
	FormID     int    `json:"form_id" db:"form_id"`
	FormName   string `json:"form_name" db:"form_name"`
	FormHeader string `json:"form_header" db:"form_header"`
}
