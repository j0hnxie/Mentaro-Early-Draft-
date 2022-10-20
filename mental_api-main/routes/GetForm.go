package routes

import (
	"net/http"
	"strconv"

	"github.com/Mentaro/mental_api/sqlconn"
	"github.com/Mentaro/mental_api/sqlconn/model"
	"github.com/gin-gonic/gin"
)

func GetForm(c *gin.Context) {

	/*
		POST

		INPUTS:

		form_id: int
		- Form ID to fetch data for

		OUTPUTS:

		form_name: string
		-  Name of form

		header: string
		- Header of form

		questions: array
		- Array of objects, each object contains a question (string) and options (array of strings)
	*/

	c.Request.ParseForm()

	var (
		form_id, _ = strconv.Atoi(c.Request.FormValue("form_id"))
	)

	//TODO: make this all a single query join
	//too lazy rn lol

	var fin = gin.H{}

	var form model.Form

	e1 := sqlconn.Con.Get(&form,
		`SELECT * FROM forms WHERE form_id = $1`,
		form_id)

	fin["form_name"] = form.FormName
	fin["form_header"] = form.FormHeader

	var questions []model.Question

	e2 := sqlconn.Con.Select(&questions, `SELECT * FROM questions WHERE form_id = $1`, form_id)

	var qjson []gin.H

	for _, v := range questions {

		var answers []model.Answer

		e3 := sqlconn.Con.Select(&answers, `SELECT * FROM answers WHERE question_id = $1`, v.QuestionID)

		if e3 != nil {
			c.JSON(http.StatusOK, gin.H{
				"error": "Could not pull from database",
			})
			return
		}

		var ajson = make([]string, len(answers))

		for _, v_ := range answers {
			ajson[v_.AnswerNumber-1] = v_.Response
		}

		qjson = append(qjson, gin.H{
			"question": v.QuestionText,
			"options":  ajson,
		})
	}

	fin["questions"] = qjson

	if e1 != nil || e2 != nil {
		c.JSON(http.StatusOK, gin.H{
			"error": "Could not pull from database",
		})
		return
	}

	c.JSON(http.StatusOK, fin)
}
