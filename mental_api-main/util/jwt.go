package util

import (
	"os"

	"github.com/golang-jwt/jwt"
)

func CreateJWT(userid int) (string, error) {
	jwtJson := jwt.MapClaims{}
	jwtJson["authorized"] = true
	jwtJson["user_id"] = userid

	at := jwt.NewWithClaims(jwt.SigningMethodHS256, jwtJson)
	token, e := at.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if e != nil {
		return "", e
	}

	return token, nil
}

func DecodeJWT(jwts string) (jwt.MapClaims, error) {
	jwtJson := jwt.MapClaims{}

	_, e := jwt.ParseWithClaims(jwts, jwtJson, func(token *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("JWT_SECRET")), nil
	})

	return jwtJson, e
}
