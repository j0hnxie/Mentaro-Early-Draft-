package routes

import (
	"fmt"
	"net/http"
	"time"

	"github.com/Mentaro/mental_api/sqlconn"
	"github.com/Mentaro/mental_api/util"
	"github.com/gin-gonic/gin"
)

func SendResponse(c *gin.Context) {
	/*
		POST

			INPUTS:

			form_id: string
			- form id

			question_id: int
			- multiple question IDs, each with value of the option selected

			OUTPUTS:

			success: bool
			- If login is successful
	*/

	var user_id int
	if token, err := c.Request.Cookie("token"); err == nil {
		val, _ := util.DecodeJWT(token.Value)
		user_id = int(val["user_id"].(float64))
	}
	fmt.Println(user_id)
	date_time := (time.Now().Unix())

	c.Request.ParseForm()
	
	form_id := c.Request.FormValue("form_id")

	for key, elm := range c.Request.PostForm {
		fmt.Println(key, elm[0])
		if key == "form_id" {
			continue
		}
		_, e := sqlconn.Con.Query(`INSERT INTO responses (form_id, question_number, question_answer, user_id, date_time) VALUES ($1, $2, $3, $4, $5)`,
			form_id, key, elm[0], user_id, date_time)
		if e != nil {
			fmt.Println(e)
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"success": true,
	})
	return
}
