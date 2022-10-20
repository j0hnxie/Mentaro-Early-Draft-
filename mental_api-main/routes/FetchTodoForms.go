package routes

import (
	"net/http"
	"time"

	"github.com/Mentaro/mental_api/sqlconn"
	"github.com/Mentaro/mental_api/sqlconn/model"
	"github.com/Mentaro/mental_api/util"
	"github.com/gin-gonic/gin"
)

func FetchTodoForms(c *gin.Context) {

	/*
		GET

			INPUTS:

			None

			OUTPUTS:

			forms: array
			- An array of form names and

			error: string
			- Any error given

	*/

	//fetch token cookie
	tok, e := c.Request.Cookie("token")

	//if token doesn't exist or some other issue happens, then return an error
	if e != nil {
		c.JSON(http.StatusOK, gin.H{
			"error": "Could not fetch user token",
		})
		return
	}

	tokvals, e := util.DecodeJWT(tok.Value)

	if e != nil {
		c.JSON(http.StatusOK, gin.H{
			"error": "Invalid token",
		})
		return
	}

	uid := tokvals["user_id"]

	var cforms []model.FormCompleted

	var now = time.Now()

	var e1, e2 error

	e1 = sqlconn.Con.Select(&cforms, `SELECT * FROM forms_completed WHERE user_id = $1 AND complete_at > $2`, uid,
		time.Now().Add(-1*time.Duration(60*60*now.Hour()+60*now.Minute()+now.Second())*time.Second).Unix(),
	)

	var allforms []model.Form

	e2 = sqlconn.Con.Select(&allforms, `SELECT * FROM forms`)

	if e1 != nil || e2 != nil {
		c.JSON(http.StatusOK, gin.H{
			"error": "Could not query database, please try again",
		})
		return
	}

	var todoforms []model.Form

	for _, v := range allforms {
		for _, v_ := range cforms {
			if v.FormID == v_.FormID {
				goto skip
			}
		}

		todoforms = append(todoforms, v)

	skip:
	}

	c.JSON(http.StatusOK, gin.H{
		"forms": todoforms,
	})

}
