package routes

import (
	"net/http"
	"time"
	"fmt"

	"github.com/Mentaro/mental_api/sqlconn"
	"github.com/Mentaro/mental_api/sqlconn/model"
	"github.com/Mentaro/mental_api/util"
	"github.com/gin-gonic/gin"
)

func GetJournal(c *gin.Context) {

	/*
		GET

		INPUTS:

		None

		OUTPUTS:

		data: array
		- Data from journal

		error: string
		- Any error given to the client
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

	//fetch all forms first

	var now = time.Now()

	// var fin = gin.H{}

	var responses []model.StringResponse

	e2 := sqlconn.Con.Select(&responses, `SELECT question_answer, date_time FROM string_responses WHERE user_id = $1 AND date_time > $2`, uid, now.AddDate(-1, 0, 0).Unix())

	fmt.Println(now.AddDate(-1, 0, 0))

	fmt.Println(e2)

	if e2 != nil {
		c.JSON(http.StatusOK, gin.H{
			"error": "Could not fetch data",
			"message" : e2,
		})
		return
	}

	c.JSON(http.StatusOK, responses)
}
