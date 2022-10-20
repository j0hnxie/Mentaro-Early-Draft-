ifeq ($(OS),Windows_NT)
	BINARY = main.exe
	CLEAN_CMD = del
else
	BINARY = main.bin
	CLEAN_CMD = rm -f
endif

default: all

all: deps build

build:
	go build -o $(BINARY) .

run: build
	./$(BINARY)

clean:
	$(CLEAN_CMD) $(BINARY)

deps:
	go get -u github.com/joho/godotenv
	go get -u github.com/gin-gonic/gin
	go get -u github.com/golang-jwt/jwt
	go get -u github.com/lib/pq
	go get -u github.com/jmoiron/sqlx