package routes

import (
	"fmt"
	"net/http"
	"time"

	"github.com/Mentaro/mental_api/sqlconn"
	"github.com/Mentaro/mental_api/util"
	"github.com/gin-gonic/gin"
)

func SendJournal(c *gin.Context) {
	var user_id int

	if token, err := c.Request.Cookie("token"); err == nil {
		val, _ := util.DecodeJWT(token.Value)
		user_id = int(val["user_id"].(float64))
	}

	fmt.Println(user_id)
	
	date_time := (time.Now().Unix())

	c.Request.ParseForm()

	var (
		form_id     = c.Request.FormValue("form_id")
		question_answer = c.Request.FormValue("question_answer")
		question_number = c.Request.FormValue("question_number")
	)

	_, e := sqlconn.Con.Query(`INSERT INTO string_responses (form_id, question_number, question_answer, user_id, date_time) VALUES ($1, $2, $3, $4, $5)`,
		form_id, question_number, question_answer, user_id, date_time)

	if e != nil {
		c.JSON(http.StatusOK, gin.H{
			"error" : e,
			"success": false,
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
	})
	return
}