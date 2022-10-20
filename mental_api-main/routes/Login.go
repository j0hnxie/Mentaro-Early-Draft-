package routes

import (
	"fmt"
	"net/http"
	"time"

	"github.com/Mentaro/mental_api/sqlconn"
	"github.com/Mentaro/mental_api/sqlconn/model"
	"github.com/Mentaro/mental_api/util"
	"github.com/gin-gonic/gin"
)

func Login(c *gin.Context) {

	/*
		POST

			INPUTS:

			email: string
			- User email

			hash_pass: string
			- SHA256 hashed password (will be hashed again on server)

			OUTPUTS:

			success: bool
			- If login is successful

			error: string
			- Any error message to display to user
	*/

	c.Request.ParseForm()

	var (
		email     = c.Request.FormValue("email")
		hash_pass = c.Request.FormValue("hash_pass")
	)

	var u model.User

	// fmt.Println(email, hash_pass)

	e := sqlconn.Con.Get(&u, `SELECT user_id FROM users WHERE email = $1 AND hash_password = $2`, email, hash_pass)

	fmt.Println(e)

	if e != nil {
		c.JSON(http.StatusOK, gin.H{
			"error":   "Invalid user, please try again",
			"success": false,
		})
		return
	}

	jwt, e := util.CreateJWT(u.UserID)

	if e != nil {
		c.JSON(http.StatusOK, gin.H{
			"error":   "Could not generate JWT",
			"success": false,
		})
		return
	}

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
		"success": true,
	})
}
