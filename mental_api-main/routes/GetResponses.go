package routes

import (
	"net/http"
	"strconv"
	"time"

	"github.com/Mentaro/mental_api/sqlconn"
	"github.com/Mentaro/mental_api/sqlconn/model"
	"github.com/Mentaro/mental_api/util"
	"github.com/gin-gonic/gin"
)

func GetResponses(c *gin.Context) {

	/*
		GET

		INPUTS:

		None

		OUTPUTS:

		data: array
		- Data accumulated for all the forms

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

	var forms []model.Form

	e1 := sqlconn.Con.Select(&forms,
		`SELECT * FROM forms`,
	)

	var now = time.Now()

	var fin = gin.H{}

	for _, v := range forms {

		var responses []model.Response

		e2 := sqlconn.Con.Select(&responses, `SELECT * FROM responses WHERE user_id = $1 AND form_id = $2 AND date_time > $3`, uid, v.FormID,
			time.Now().Add(-1*time.Duration(7*now.Day()*60*60*now.Hour()+60*now.Minute()+now.Second())*time.Second).Unix())

		//sum all of the forms with the same form id, and same time inputted to get the final score for that day
		var summedResps = map[string]int{}

		for _, v_ := range responses {
			summedID := strconv.Itoa(v_.FormID) + "," + strconv.Itoa(v_.DateTime)

			//the summed id doesn't already exist in the map
			if _, exists := summedResps[summedID]; !exists {
				//set it to 0
				summedResps[summedID] = 0

			}

			summedResps[summedID] += v_.QuestionAnswer
		}

		fin[v.FormName] = summedResps

		if e1 != nil || e2 != nil {
			c.JSON(http.StatusOK, gin.H{
				"error": "Could not fetch data",
			})
			return
		}

	}

	c.JSON(http.StatusOK, fin)
}
