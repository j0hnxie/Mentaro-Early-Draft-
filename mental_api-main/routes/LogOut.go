package routes

import (
	"net/http"
	"time"
	"fmt"

	"github.com/gin-gonic/gin"
)

func LogOut(c *gin.Context) {

	fmt.Println("hi")

	cookie := http.Cookie{
		Name:     "token",
		Value:    "",
		Expires:  time.Now(),
		HttpOnly: true,
		Domain:   "localhost",
		Path:     "/",
		Secure:   false,
	}
	http.SetCookie(c.Writer, &cookie)


	fmt.Println("worked")
}