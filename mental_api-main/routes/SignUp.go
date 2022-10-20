package routes

import (
	"net/http"
	"strconv"
	"time"

	"github.com/Mentaro/mental_api/sqlconn"
	"github.com/Mentaro/mental_api/util"
	"github.com/gin-gonic/gin"
)

func SignUp(c *gin.Context) {

	/*
		POST

			INPUTS:

			company_id: int
			- company id supplied in the confirmation url

			user_id: int
			- user id also supplied in the confirmation url

			firstname: string
			- first name entered

			lastname: string
			- last name entered

			hash_pass: string
			- sha256 hashed password hashed on the frontend (will also be hashed on the backend)

			OUTPUTS:

			redirect: bool
			- if everything is valid, and the user is ready to be registered, this will be true

			error: string
			- if any error is present, this will be provided

	*/

	c.Request.ParseForm()

	var (
		company_id, _ = strconv.Atoi(c.Request.FormValue("company_id"))
		user_id, _    = strconv.Atoi(c.Request.FormValue("user_id"))
		firstname     = c.Request.FormValue("firstname")
		lastname      = c.Request.FormValue("lastname")
		hash_pass     = c.Request.FormValue("hash_pass")
	)

	//query that inserts user into the database
	_, e1 := sqlconn.Con.Query(
		`
			INSERT INTO users (company_id, user_id, firstname, lastname, hash_password, email) VALUES ($1, $2, $3, $4, $5, 
				(SELECT email FROM unconfirmed_users WHERE user_id = $2)
			)`,
		company_id, user_id, firstname, lastname, hash_pass,
	)

	//query that deletes the user added before from the unconfirmed users table
	_, e2 := sqlconn.Con.Query(
		`
			DELETE FROM unconfirmed_users WHERE user_id = $1
		`, user_id,
	)

	//if there was an error in either of the two queries, then send back an error
	if e1 != nil || e2 != nil {
		c.JSON(http.StatusOK, gin.H{
			"redirect": false,
			"error":    "An error has occured, please confirm with your employer that this is your account",
		})
		return
	}

	//generate  the jwt encrypted string
	jwt, e := util.CreateJWT(user_id)

	//if the jwt generation failed, stop
	if e != nil {
		c.JSON(http.StatusOK, gin.H{
			"redirect": false,
			"error":    "Could not generate token",
		})
	}

	//set the token as an httponly cookie

	http.SetCookie(c.Writer, &http.Cookie{
		Name:     "token",
		Value:    jwt,
		Expires:  time.Now().Add(365 * 24 * time.Hour),
		HttpOnly: true,
		Domain:   "localhost",
		Path:     "/",
		Secure:   false,
	})

	c.JSON(http.StatusOK, gin.H{
		"redirect": true,
	})
}
