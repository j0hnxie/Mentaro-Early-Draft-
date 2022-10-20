package main

import (
	"log"

	"github.com/Mentaro/mental_api/routes"
	"github.com/Mentaro/mental_api/sqlconn"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

//entry main function
func main() {

	//load .env
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	sqlconn.InitConn()

	defer sqlconn.Con.Close()

	Router := gin.Default()

	api := Router.Group("/api")

	api.POST("/signup", routes.SignUp)
	api.POST("/login", routes.Login)
	api.GET("/fetchtodoforms", routes.FetchTodoForms)
	api.GET("/getform", routes.GetForm)
	api.GET("/getresponses", routes.GetResponses)
	api.DELETE("/logout", routes.LogOut)
	api.POST("/sendresponse", routes.SendResponse)
	api.GET("/issignedin", routes.IsSignedIn)
	api.POST("/sendjournal", routes.SendJournal)
	api.GET("/getjournal", routes.GetJournal)

	Router.Run(":8080")
}
