package sqlconn

import (
	"fmt"
	"log"
	"os"

	"github.com/jmoiron/sqlx"

	_ "github.com/lib/pq"
)

var Con *sqlx.DB

func InitConn() {
	inf := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable", //format string
		os.Getenv("DB_HOSTNAME"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASS"),
		os.Getenv("DB_DATABASE"),
	)

	var e error

	Con, e = sqlx.Open("postgres", inf)
	if e != nil {
		log.Fatal(e)
	}

	e = Con.Ping()
	if e != nil {
		log.Fatal(e)
	}
}
