package main

import (
	"net/http"
	"fmt"
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
)



//this stops user client from seeing anything on the server. TODO
func handler(w http.ResponseWriter, r *http.Request){
	http.ServeFile(w, r, r.URL.Path[1:])
	fmt.Println(r.URL.Path[1:])
}

func imageHandler(w http.ResponseWriter, r *http.Request){

	fmt.Println("Request to app/navbar/items.json acknowledged.")
	w.Header().Set("Content-Type", "application/json")
	http.ServeFile(w, r, r.URL.Path[1:])
}


func main() {
	http.HandleFunc("/", handler)
	http.HandleFunc("/app/images/pics.json", imageHandler)

	// Create the databse handle, confirm driver is present
	db, _ := sql.Open("mysql", "user:pass@/ang2blog")
	defer db.Close()

	// Connect and check the server version
	var version string
	db.QueryRow("SELECT VERSION()").Scan(&version)
	fmt.Println("Successfully connected to:", version)

	fmt.Println("Listening on 3000")
	http.ListenAndServe(":3000", nil)

}
