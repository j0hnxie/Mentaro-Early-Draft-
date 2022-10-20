package model

type User struct {
	UserID    int    `json:"user_id" db:"user_id"`
	Email     string `json:"email" db:"email"`
	FirstName string `json:"firstname" db:"firstname"`
	LastName  string `json:"lastname" db:"lastname"`
	HashPass  string `json:"hash_pass" db:"hash_password"` //ALERT! NEVER SHARE TO CLIENT
	CompanyID int    `json:"company_id" db:"company_id"`
}
