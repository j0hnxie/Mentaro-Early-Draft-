package routes

import (
	"net/http"

	"github.com/Mentaro/mental_api/util"
	"github.com/gin-gonic/gin"
)

func IsSignedIn(c *gin.Context) {
	signedin := false
	if token, err := c.Request.Cookie("token"); err == nil {
		if _, err := util.DecodeJWT(token.Value); err == nil {
			signedin = true
		}
	}

	c.JSON(http.StatusOK, gin.H{
		"signedin": signedin,
	})
}
